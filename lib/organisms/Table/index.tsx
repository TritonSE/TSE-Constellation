/**
 * Note to the future from the past:
 *
 * If you would like to implement row pinning or row drag and drop,
 * see the following resources:
 *  - https://tanstack.com/table/v8/docs/guide/row-pinning
 *  - https://tanstack.com/table/v8/docs/framework/react/examples/row-dnd
 */

import {
  ColumnDef,
  Row,
  RowSelectionState,
  Table as TTable,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";

import { useTheme } from "../../assets/ThemeProvider";
import { Checkbox, Icon, TextField } from "../../main";
import { TextFieldProps } from "../../molecules/Input/TextField";

import styles from "./styles.module.css";

export type TableProps<TData> = {
  /**
   * Columns definitions for the table. Refer to [this](https://tanstack.com/table/v8/docs/api/core/column-def) for all options.
   */
  columns: ColumnDef<TData>[];
  /**
   * Array of objects representing the data to show in the table.
   * Each object should have keys corresponding to the `accessorKey` defined in the `columns` prop.
   */
  data: TData[];
  /**
   * A function that returns a unique identifier for each row in the table.
   * If not provided, the table will use the index of the row in the data array as the row id.
   */
  getRowId?: (row: TData) => string;
  /**
   * Whether to enable pagination for the table.
   */
  enablePagination?: boolean;
  /**
   * Whether to enable column sorting for the table.
   */
  enableSorting?: boolean;
  /**
   * Whether to enable row selection for the table.
   */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /**
   * Whether to enable multi-row selection for the table.
   */
  enableMultiRowSelection?: boolean;
  /**
   * The current row selection state. See [this](https://tanstack.com/table/v8/docs/guide/row-selection#manage-row-selection-state) to learn more.
   */
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void;
  /**
   * Whether to enable global filtering for the table.
   */
  enableGlobalFiltering?: boolean;
  /**
   * The initial value for the global filter.
   */
  initialGlobalFilter?: string;
  /**
   * Optional props to pass to the search `TextField` component.
   */
  searchFieldProps?: TextFieldProps;
  /**
   * Optional prop controlling whether page-altering state changes should reset pagination (i.e. return to page 1)
   */
  autoResetPageIndex?: boolean;
  /**
   * An optional custom component to render to the right of the search bar.
   */
  actionElement?: React.ReactNode;
  /**
   * Optional styles to apply to the table container.
   */
  style?: React.CSSProperties;
  /**
   * Optional class name to apply to the table container.
   */
  className?: string;
} & Omit<TableOptions<TData>, "getCoreRowModel">; // omit 'getCoreRowModel' because we handle it internally

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

/**
 * A component to display data in a tabular format. This table component is
 * built using the [`@tanstack/react-table`](https://tanstack.com/table/latest/docs/introduction)
 * headless UI library. Generally, all options supported by `@tanstack/react-table` features
 * can be used with this component by passing them as props.
 *
 *
 * This table officially supports the following features:
 *  - Custom cell rendering
 *  - Column sorting
 *  - Pagination
 *  - Global filtering
 *  - Row selection
 *
 * For it's most basic usage, provide an array of objects as the `data` prop
 * and an array of objects with `accessorKey` and `header` properties as the
 * `columns` prop. See the example below.
 */
export function Table<T>({
  columns,
  data,
  initialGlobalFilter,
  enableSorting = true,
  enableGlobalFiltering = true,
  enableRowSelection = false,
  enableMultiRowSelection = true,
  rowSelection = {},
  onRowSelectionChange,
  enablePagination = true,
  actionElement,
  searchFieldProps = { placeholder: "Search..." },
  autoResetPageIndex = false,
  style,
  className,
  ...otherProps
}: TableProps<T>) {
  const { colors } = useTheme();

  // Memoize the data and columns to prevent unnecessary re-renders
  const memoizedData = React.useMemo(() => data, [data]);

  const memoizedColumns = React.useMemo(() => {
    if (enableRowSelection) {
      // add a checkbox column to the beginning of the columns if row selection is enabled
      return [
        {
          id: "select-col",
          enableSorting: false, // disables sorting for this column
          header: ({ table }: { table: TTable<T> }) =>
            enableMultiRowSelection ? (
              <Checkbox
                id="select-all-checkbox"
                checked={table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()}
                indeterminate={table.getIsSomePageRowsSelected()}
                onChange={table.toggleAllPageRowsSelected}
              />
            ) : null,
          cell: ({ row }) => (
            <Checkbox
              id={row.id}
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.toggleSelected}
            />
          ),
        },
        ...columns,
      ];
    } else {
      return columns;
    }
  }, [enableRowSelection, columns, enableMultiRowSelection]);

  const table = useReactTable({
    state: {
      rowSelection,
    },
    data: memoizedData,
    columns: memoizedColumns,
    enableSorting,
    enableRowSelection,
    enableMultiRowSelection,
    autoResetPageIndex,
    onRowSelectionChange,
    manualPagination: !enablePagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...otherProps,
  });

  const [paginationDisplayValue, setPaginationDisplayValue] = React.useState<string>();

  // Handle changes to the initialGlobalFilter prop
  React.useEffect(() => {
    if (initialGlobalFilter) table.setGlobalFilter(initialGlobalFilter);
  }, [initialGlobalFilter, table]);

  const pageIndex = table.getState().pagination.pageIndex;

  // Update the pagination display value when the page index changes
  React.useMemo(() => {
    setPaginationDisplayValue(String(pageIndex + 1));
  }, [pageIndex]);

  return (
    <div className={cx(styles.container, className)} style={style}>
      {/* Table Hat - holds search field and user-defined action element */}
      {enableGlobalFiltering || actionElement ? (
        <div className={styles.hat}>
          {enableGlobalFiltering && (
            <TextField
              value={table.getState().globalFilter as string}
              onChange={table.setGlobalFilter}
              {...searchFieldProps}
            />
          )}
          {actionElement}
        </div>
      ) : null}
      {/* Table */}
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            // Table Header Row
            <tr key={headerGroup.id} className={styles.headerRow}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    className={cx(styles.headerCell, {
                      [styles.sortable]: header.column.getCanSort(),
                    })}
                    onClick={() => {
                      header.column.toggleSorting();
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {/* Column Sort Handle */}
                    {header.column.getCanSort() && (
                      <div className={styles.sortToggleContainer}>
                        <Icon
                          name="ic_caretfill_up"
                          fill={
                            header.column.getIsSorted() === "asc"
                              ? colors.primary_dark
                              : colors.disabled
                          }
                          stroke="transparent"
                          size={8}
                        />
                        <Icon
                          name="ic_caretfill_down"
                          fill={
                            header.column.getIsSorted() === "desc"
                              ? colors.primary_dark
                              : colors.disabled
                          }
                          stroke="transparent"
                          size={8}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Table Body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.dataRow}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Container */}
      {enablePagination && (
        <div className={styles.paginationContainer}>
          <div
            onClick={table.previousPage}
            className={cx(styles.paginationButton, {
              [styles.disabled]: !table.getCanPreviousPage(),
            })}
          >
            <Icon
              name="ic_caretleft"
              fill={table.getCanPreviousPage() ? colors.primary_dark : colors.gray_3}
              stroke="transparent"
            />
          </div>
          <span>page</span>
          <TextField
            type="number"
            value={String(paginationDisplayValue)}
            onChange={(value) => {
              setPaginationDisplayValue(value);
              if (value) table.setPageIndex(value ? Number(value) - 1 : 0);
            }}
          />
          <span>of</span>
          <span>{table.getPageCount().toLocaleString()}</span>
          <div
            onClick={table.nextPage}
            className={cx(styles.paginationButton, {
              [styles.disabled]: !table.getCanNextPage(),
            })}
          >
            <Icon
              name="ic_caretright"
              fill={table.getCanNextPage() ? colors.primary_dark : colors.gray_3}
              stroke="transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
}
