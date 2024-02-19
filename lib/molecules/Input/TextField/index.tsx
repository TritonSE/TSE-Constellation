import { ChangeEvent, useEffect, useState } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../common';
import styles from './styles.module.css';
import { ColumnInput } from '../common/ColumnInput';

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
    onChange
  } = props;

  const theme = useTheme();

  const [internalValue, setInternalValue] = useState(value ?? '');

  // Update our internal value when the provided value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // Update our highlight color when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--highlight-color',
      theme.colors.secondary_highlight_1
    );
  }, [theme]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }

    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e.target.value);
  };

  return (
    <ColumnInput
      inputElement={
        <input
          name={name}
          className={styles.input}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            border: `1px solid ${theme.colors.gray_2}`
          }}
          value={internalValue}
          onChange={handleInputChange}
        />
      }
      label={label}
      errorText={errorText}
      caption={caption}
    />
  );
}
