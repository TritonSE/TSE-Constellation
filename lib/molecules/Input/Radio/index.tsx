import { useEffect, useState } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../common';
import styles from './styles.module.css';

export interface RadioProps extends CommonInputProps {
  id: string;
  label: string;
  checked?: boolean;
  errorText?: string;
  disabled?: boolean;

  onChange?: (newChecked: boolean) => unknown;
}

export function Radio(props: RadioProps) {
  const { id, label, checked, errorText, caption, disabled, name, onChange } =
    props;

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

  return (
    <div className={styles.optionRow}>
      <div
        className={styles.checkboxContainer}
        style={{
          border: `2px solid ${
            hovering ? theme.colors.secondary_highlight_1 : 'transparent'
          }`
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
            // ...(internalChecked
            //   ? { backgroundColor: theme.colors.primary_dark }
            //   : {})
          }}
          onChange={(e) => {
            onChange?.(e.target.checked);
            setInternalChecked(e.target.checked);
          }}
          disabled={disabled}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        />
        {/* <label
          htmlFor={id}
          className={styles.checkmarkIcon}
          style={internalChecked ? {} : { display: 'none' }}
        >
          <CheckmarkIcon />
        </label> */}
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
