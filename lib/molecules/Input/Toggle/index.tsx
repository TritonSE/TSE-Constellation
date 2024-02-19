import { ChangeEvent, useEffect, useState } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../common';
import styles from './styles.module.css';

export interface ToggleProps extends CommonInputProps {
  /**
   * Whether the toggle should be compact (smaller)
   */
  compact?: boolean;

  /**
   * Whether the input is currently toggled on. If this prop is not provided,
   * the component will maintain its internal state for whether it is toggled.
   */
  checked?: boolean;

  /**
   * Callback fired when the input is toggled on/off
   * @param newChecked Whether the input is now checked
   */
  onChange?: (newChecked: boolean) => unknown;
}

/**
 * A toggle input element, displays a switch that can be toggled on and off.
 * Can be either controlled (via the checked prop) or uncontrolled.
 */
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
    document.documentElement.style.setProperty(
      '--highlight-color',
      theme.colors.secondary_highlight_1
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e.target.checked);
  };

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
          onChange={handleInputChange}
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
