import { CommonInputProps } from '../common';
import styles from './styles.module.css';
import { useTheme } from '../../../assets/ThemeProvider';
import CheckboxCheckedIcon from '../../../assets/icons/checkbox_checked.svg?react';
import CheckboxIndeterminantIcon from '../../../assets/icons/checkbox_indeterminant.svg?react';
import { ChangeEvent, useEffect, useState } from 'react';
import { RowInput } from '../common/RowInput';

export interface CheckboxProps extends CommonInputProps {
  /**
   * ID for the checkbox input element. Must be unique in the document.
   * Required in order to match the label with the input element.
   */
  id: string;

  /**
   * Whether the checkbox should be checked. If this prop is not provided, the
   * component will maintain and update its internal checked state.
   */
  checked?: boolean;

  /**
   * Whether to display an indeterminant icon when the checkbox is checked
   * (a minus sign instead of a checkmark).
   */
  indeterminant?: boolean;

  /**
   * Callback that fires when the checkbox's checked state is changed.
   * @param newChecked whether the checkbox is checked after the change.
   */
  onChange?: (newChecked: boolean) => unknown;
}

/**
 * A checkbox input element, displays a single checkbox with a label. Can be
 * either controlled (via the checked prop) or uncontrolled.
 */
export function Checkbox(props: CheckboxProps) {
  const {
    id,
    label,
    checked,
    errorText,
    caption,
    disabled,
    name,
    indeterminant,
    onChange
  } = props;

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

  // Color for main checkbox and border
  const checkboxColor = disabled
    ? theme.colors.disabled
    : errorText
    ? theme.colors.error
    : theme.colors.primary_dark;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            type="checkbox"
            checked={internalChecked}
            className={styles.checkbox}
            style={{
              border: `3px solid ${checkboxColor}`
            }}
            onChange={handleInputChange}
            disabled={disabled}
          />
          <label
            htmlFor={id}
            className={styles.checkmarkIcon}
            style={internalChecked ? {} : { display: 'none' }}
          >
            {indeterminant ? (
              <CheckboxIndeterminantIcon
                width={24}
                height={24}
                style={{ fill: checkboxColor }}
              />
            ) : (
              <CheckboxCheckedIcon
                width={24}
                height={24}
                style={{ fill: checkboxColor }}
              />
            )}
          </label>
        </div>
      }
      label={label}
      errorText={errorText}
      caption={caption}
    />
  );
}
