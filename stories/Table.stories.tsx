import type { Meta, StoryObj } from "@storybook/react";

import { Button, Table, TextField } from "../lib/main";
import { CONSTELLATIONS, Constellation } from "./constellation-data";
import { TableProps } from "../lib/organisms/Table";
import { RowSelectionState } from "@tanstack/react-table";
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Table",
  component: Table,
  args: {
    data: CONSTELLATIONS,
    columns: [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Abbr.",
        accessorKey: "abbreviation",
      },
      {
        header: "# of Stars",
        accessorKey: "stars",
      },
      {
        header: "Shape",
        accessorKey: "shape",
      },
      {
        header: "Brightest Star",
        accessorKey: "brightest_star",
      },
    ],
    getRowId: (row) => (row as Constellation).name,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * The default table without specifying any additional props.
 */
export const Default: Story = {
  args: {},
};

/**
 * A barebones table with no extra features enabled. Set the `enableGlobalFiltering`, `enablePagination`, `enableRowSelection`, and `enableSorting` props to `false`.
 */
export const BarebonesTable: Story = {
  args: {
    enableGlobalFiltering: false,
    enablePagination: false,
    enableRowSelection: false,
    enableSorting: false,
  },
};

/**
 * You can render a custom component (an input field for example) for table
 * cells by passing a `cell` field to the column. This field takes a function
 * that takes a `CellContext` object and returns a React element.
 * Within the `CellContext` object, you can access the cell's value with the `getValue` method.
 * See [here](https://tanstack.com/table/v8/docs/guide/column-defs#cell-formatting) for more info.
 */
export const CustomCellRendering: Story = {
  args: {
    columns: [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ cell: { getValue } }) => (
          <TextField value={getValue() as string} />
        ),
      },
      {
        header: "Abbr.",
        accessorKey: "abbreviation",
      },
      {
        header: "# of Stars",
        accessorKey: "stars",
      },
      {
        header: "Shape",
        accessorKey: "shape",
      },
      {
        header: "Brightest Star",
        accessorKey: "brightest_star",
      },
    ],
  },
};

/**
 * Similarly, you can use the `cell` property to render a dedicated column for row actions.
 */
export const ActionsColumn: Story = {
  args: {
    columns: [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Abbr.",
        accessorKey: "abbreviation",
      },
      {
        header: "# of Stars",
        accessorKey: "stars",
      },
      {
        header: "Shape",
        accessorKey: "shape",
      },
      {
        header: "Brightest Star",
        accessorKey: "brightest_star",
      },
      {
        id: "actions",
        header: "",
        cell: () => <Button small>Click me!</Button>,
      },
    ],
  },
};

/**
 * You can render a custom component to the right of the search bar using the
 * `actionElement` prop.
 */
export const ActionElement: Story = {
  args: {
    actionElement: <Button small>Click me!</Button>,
  },
};

/**
 * Disable column sorting disabled by setting the `enableSorting` prop to `false`.
 *
 */
export const DisableColumnSorting: Story = {
  args: {
    enableSorting: false,
  },
};

/**
 * Disable pagination by setting the `enablePagination` prop to `false`.
 */
export const DisablePagination: Story = {
  args: {
    enablePagination: false,
  },
};

/**
 * Disable global filtering by setting the `enableGlobalFiltering` prop to `false`.
 * This will hide the search field.
 */
export const DisableGlobalFiltering: Story = {
  args: {
    enableGlobalFiltering: false,
  },
};

/**
 * You can set an initial value for the global filter with the `initialGlobalFilter` prop.
 */
export const InitialGlobalFilterState: Story = {
  args: {
    initialGlobalFilter: "Orion",
  },
};

const RowSelectionStory = (args: TableProps<unknown>) => {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  return (
    <>
      <Table
        {...args}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />

      <div>
        <h2>Selected Rows</h2>
        <ul>
          {Object.keys(rowSelection).map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

/**
 * Enable row selection by setting the `enableRowSelection` prop to `true`.
 * Specify the `rowSelection` and `onRowSelectionChange` props to manage the selected rows.
 * `rowSelection` is an object where the keys are the row IDs and the values are `true` if the row is selected.
 * `onRowSelectionChange` is a callback that is called with the new `rowSelection` object when the row selections change.
 *
 * See [here](https://tanstack.com/table/v8/docs/guide/row-selection) for more info.
 */
export const RowSelection: Story = {
  render: RowSelectionStory,
  args: {
    enableRowSelection: true,
  },
};

/**
 * You can restrict row selection to a single row by setting the `enableMultiRowSelection` prop to `false`.
 */
export const SingleRowSelection: Story = {
  render: RowSelectionStory,
  args: {
    enableRowSelection: true,
    enableMultiRowSelection: false,
  },
};
