import { useEffect, useState } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../common';
import styles from './styles.module.css';

export interface ToggleProps extends CommonInputProps {
  // Whether it should be a compact input
  compact?: boolean;

  // Whether the input is toggled on
  checked?: boolean;

  // Callback fired when input is toggled between off and on
  onChange: (newChecked: boolean) => unknown;
}

export function Toggle(props: ToggleProps) {
  const {
    label,
    errorText,
    caption,
    disabled,
    name,
    compact,
    checked,
    onChange
  } = props;

  const theme = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--slider-color',
      disabled ? theme.colors.disabled : theme.colors.primary_dark
    );
    document.documentElement.style.setProperty(
      '--slider-circle-size',
      compact ? '16px' : '24px'
    );
  }, [compact, theme, disabled]);

  // Internal state for whether checkbox is checked
  const [internalChecked, setInternalChecked] = useState(checked ?? false);

  // Update our internal state when "checked" prop changes
  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  return (
    <div className={styles.toggleRow}>
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
      <label
        className={`${styles.switch} ${
          compact ? styles.compactSwitch : styles.defaultSwitch
        }`}
      >
        <input
          name={name}
          type="checkbox"
          checked={internalChecked}
          onChange={(e) => {
            onChange?.(e.target.checked);
            setInternalChecked(e.target.checked);
          }}
          disabled={disabled}
        />
        <span
          className={`${styles.slider} ${
            compact ? styles.compactSlider : styles.defaultSlider
          }`}
        ></span>
      </label>
    </div>
  );
}
