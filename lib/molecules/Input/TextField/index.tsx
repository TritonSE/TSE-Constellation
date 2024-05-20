import { HTMLInputTypeAttribute, useEffect, useRef } from "react";

import { useTheme } from "../../../assets/ThemeProvider";
import { useInputControls } from "../../../internal/hooks/useInputControls";
import { CommonInputProps } from "../common";
import { ColumnInput } from "../common/ColumnInput";

import styles from "./styles.module.css";

export type TextFieldProps = {
  /**
   * Placeholder text to display inside the text field if nothing has been typed.
   */
  placeholder?: string;

  /**
   * The current value of the input field (i.e. what the user has typed into it).
   * If this prop is not provided, the component will maintain an internal state for the value.
   */
  value?: string;

  /**
   * Callback fired when the text entered in the field changes
   * @param newValue the new value of the entered text
   */
  onChange?: (newValue: string) => unknown;

  /**
   * The type of the input (e.g. "text", "password", "email", etc.)
   */
  type?: HTMLInputTypeAttribute;
} & CommonInputProps;

/**
 * A text input element. Can be either controlled (via the value prop) or uncontrolled.
 */
export function TextField(props: TextFieldProps) {
  const {
    label,
    errorText,
    caption,
    disabled,
    name,
    placeholder,
    value,
    onChange,
    type = "text",
  } = props;

  const theme = useTheme();

  const { internalValue, handleChange } = useInputControls({
    value,
    disabled,
    onChange,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Set the border color to highlight normally, or red if there is an error
    inputRef.current?.style.setProperty(
      "--tse-constellation-text-field-border-color",
      errorText ? theme.colors.error : theme.colors.secondary_highlight_1,
    );
  }, [inputRef.current, errorText]);

  return (
    <ColumnInput
      inputElement={
        <input
          type={type}
          name={name}
          className={styles.input}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            border: `1px solid ${theme.colors.gray_2}`,
          }}
          value={internalValue}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          ref={inputRef}
        />
      }
      label={label}
      errorText={errorText}
      caption={caption}
    />
  );
}
