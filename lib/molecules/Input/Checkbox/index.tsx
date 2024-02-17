import { CommonInputProps } from '../CommonInput';
import styles from './styles.module.css';
import { useTheme } from '../../../assets/ThemeProvider';
import CheckboxCheckedIcon from '../../../assets/icons/checkbox_checked.svg?react';
import CheckboxIndeterminantIcon from '../../../assets/icons/checkbox_indeterminant.svg?react';
import { useEffect, useState } from 'react';

export interface CheckboxProps extends CommonInputProps {
  id: string;
  label: string;
  checked?: boolean;
  errorText?: string;
  disabled?: boolean;
  indeterminant?: boolean;

  onChange?: (newChecked: boolean) => unknown;
}

export function Checkbox(props: CheckboxProps) {
  const {
    id,
    label,
    checked,
    errorText,
    caption,
    disabled,
    indeterminant,
    onChange
  } = props;

  const theme = useTheme();

  // Internal state for whether checkbox is checked
  const [internalChecked, setInternalChecked] = useState(checked ?? false);
  const [hovering, setHovering] = useState(false);

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

  return (
    <div className={styles.optionRow}>
      <div
        className={styles.checkboxContainer}
        style={{
          border: `2px solid ${
            hovering ? theme.colors.secondary_highlight_1 : 'transparent'
          }`
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={internalChecked}
          className={styles.checkbox}
          style={{
            border: `3px solid ${checkboxColor}`
          }}
          onChange={(e) => {
            onChange?.(e.target.checked);
            setInternalChecked(e.target.checked);
          }}
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
      <div className={styles.optionTextContainer}>
        <p className={styles.optionLabel}>{label}</p>
        <p
          className={styles.optionHint}
          style={{
            color: errorText ? theme.colors.error : theme.colors.gray_5
          }}
        >
          {errorText ?? caption}
        </p>
      </div>
    </div>
  );
}
