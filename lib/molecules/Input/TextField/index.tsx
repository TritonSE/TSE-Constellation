import { useTheme } from "../../../assets/ThemeProvider";
import { CommonInputProps } from "../common";
import styles from "./styles.module.css";
import { ColumnInput } from "../common/ColumnInput";
import { useInputControls } from "../../../internal/hooks/useInputControls";
import { HTMLInputTypeAttribute } from "react";

export interface TextFieldProps extends CommonInputProps {
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
}

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
          onChange={(e) => handleChange(e.target.value)}
        />
      }
      label={label}
      errorText={errorText}
      caption={caption}
    />
  );
}
