import { Key, MouseEvent, useMemo, useRef, useState } from "react";

import { useTheme } from "../../../assets/ThemeProvider";
import { Anchor } from "../../../internal/components/Anchor";
import { useInputControls } from "../../../internal/hooks/useInputControls";
import { Icon } from "../../../main";
import { CommonInputProps } from "../common";
import { ColumnInput } from "../common/ColumnInput";

import styles from "./styles.module.css";

/**
 * A single option in the list of options provided to the Dropdown component
 */
export type DropdownOption<T> = {
  label: string;
  value?: T;
};

export type DropdownProps<T> = {
  /**
   * Placeholder text, to be displayed inside the input if no option is selected.
   */
  placeholder?: string;

  /**
   * Array of options to display. Each must have a label that will be displayed,
   * and optionally, a value (the label will be used as a value if no value is provided.
   */
  options: DropdownOption<T>[];

  /**
   * The current value of the input field (i.e. value of the selected option). If
   * this prop is not provided, the component will maintain an internal state
   * for the selected value.
   */
  value?: T;

  /**
   * Callback fired when the selected option changes (i.e. the user selects an option)
   * @param newValue the value of the option the user selected
   */
  onChange?: (newValue: T) => unknown;
} & CommonInputProps;

/**
 * A dropdown input element that enables the user to select an option from
 * a dropdown menu of options. Can be either controlled (via the value prop) or uncontrolled.
 */
export function Dropdown<T>(props: DropdownProps<T>) {
  const { label, placeholder, errorText, caption, disabled, name, options, value, onChange } =
    props;

  const theme = useTheme();

  // Gets the value for the given option, using its value attribute if exists, else label
  const getOptionValue = (option: DropdownOption<T>) => option.value ?? option.label;

  const { internalValue: selectedOption, handleChange } = useInputControls({
    value,
    defaultValue: getOptionValue(options[0]) as T,
    disabled,
    onChange,
  });

  const [expanded, setExpanded] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /**
   * The label to be displayed inside the input. Use the label of the selected
   * option, if one exists, else the placeholder text.
   */
  const selectedLabel = useMemo(
    () => options.find((option) => getOptionValue(option) === selectedOption)?.label ?? placeholder,
    [selectedOption, placeholder, options],
  );

  // Callback fired when the dropdown component itself is clicked
  const handleInputClick = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    // Stop event propagation so it doesn't trigger Anchor component closing
    e.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };

  // Callback fired when an option is clicked
  const handleOptionClick = (option: DropdownOption<T>) => {
    handleChange(getOptionValue(option) as T);

    setExpanded(false);
  };

  return (
    <>
      <ColumnInput
        inputElement={
          <div
            className={styles.inputBox}
            style={
              disabled
                ? {
                    // Disabled styles copied from browser defaults for disabled input element
                    border: "1px solid rgba(118, 118, 118, 0.3)",
                    backgroundColor: "rgba(239, 239, 239, 0.3)",
                    color: "rgb(84, 84, 84)",
                  }
                : {
                    border: `1px solid ${theme.colors.gray_2}`,
                  }
            }
            onClick={handleInputClick}
            ref={dropdownRef}
            tabIndex={0}
          >
            <p
              className={styles.text}
              style={selectedLabel === placeholder ? { color: theme.colors.gray_3 } : {}}
            >
              {selectedLabel}
            </p>
            <Icon
              name={expanded ? "ic_caretfill_up" : "ic_caretfill_down"}
              fill={theme.colors.gray_2}
              stroke="none"
              size={14}
            />
          </div>
        }
        label={label}
        errorText={errorText}
        caption={caption}
      />

      <Anchor
        open={expanded}
        onClose={() => {
          setExpanded(false);
        }}
        anchorElement={dropdownRef.current!}
        placement="bottom"
      >
        <div className={styles.listContainer}>
          <ul
            className={styles.list}
            style={{
              border: `1px solid ${theme.colors.gray_2}`,
              borderTopWidth: 0,
            }}
          >
            {options.map((option) => (
              <li
                key={getOptionValue(option) as Key}
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                <div className={styles.optionContainer}>
                  <p
                    className={styles.text}
                    style={
                      // Selected option should have gold text in options menu
                      getOptionValue(option) === selectedOption
                        ? { color: theme.colors.secondary_highlight_1 }
                        : {}
                    }
                  >
                    {option.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Anchor>
      {/** Display a hidden input element with the current value of the input.
       * This enables developers to access the value of this field in a form
       * by setting the "name" property. This is a bit hacky, but is necessary
       * since the dropdown itself is not an input element.
       */}
      <input
        name={name}
        type="hidden"
        value={selectedOption as React.InputHTMLAttributes<HTMLInputElement>["value"]}
      />
    </>
  );
}
