import { ChangeEvent, useEffect, useState } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../common';
import styles from './styles.module.css';
import { RowInput } from '../common/RowInput';

export interface RadioProps extends CommonInputProps {
  /**
   * ID for the radio input element. Must be unique in the document.
   * Required in order to match the label with the input element.
   */
  id: string;

  /**
   * Whether the radio circle should be checked. If this prop is not provided, the
   * component will maintain and update its internal checked state.
   */
  checked?: boolean;

  /**
   * Callback that fires when the radio inputs's checked state is changed.
   * @param newChecked whether the radio input is checked after the change.
   */
  onChange?: (newChecked: boolean) => unknown;
}

/**
 * A radio input element, displays a single radio circle with a label. Can be
 * either controlled (via the checked prop) or uncontrolled.
 */
export function Radio(props: RadioProps) {
  const { id, label, checked, errorText, caption, disabled, name, onChange } =
    props;

  const theme = useTheme();

  // Internal state for whether checkbox is checked
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  // Update our internal state when "checked" prop changes
  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

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

    if (checked === undefined) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e.target.checked);
  };

  return (
    <RowInput
      inputFirst
      inputElement={
        <div
          className={styles.checkboxContainer}
          style={{
            border: `2px solid transparent`
          }}
        >
          <input
            id={id}
            name={name}
            type="radio"
            checked={internalChecked}
            className={styles.checkbox}
            style={{
              border: `3px solid ${
                errorText ? theme.colors.error : theme.colors.primary_dark
              }`
            }}
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
      }
      label={label}
      errorText={errorText}
      caption={caption}
    />
  );
}
