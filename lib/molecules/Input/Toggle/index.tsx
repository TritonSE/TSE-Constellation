import { useEffect } from "react";

import { useTheme } from "../../../assets/ThemeProvider";
import { useInputControls } from "../../../internal/hooks/useInputControls";
import { CommonInputProps } from "../common";
import { RowInput } from "../common/RowInput";

import styles from "./styles.module.css";

export type ToggleProps = {
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
} & CommonInputProps;

/**
 * A toggle input element, displays a switch that can be toggled on and off.
 * Can be either controlled (via the checked prop) or uncontrolled.
 */
export function Toggle(props: ToggleProps) {
  const { label, errorText, caption, disabled, name, compact, checked, onChange } = props;

  const theme = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--tse-constellation-slider-color",
      disabled ? theme.colors.disabled : theme.colors.primary_dark,
    );
    document.documentElement.style.setProperty(
      "--tse-constellation-slider-circle-size",
      compact ? "16px" : "24px",
    );
  }, [compact, theme, disabled]);

  const { internalValue: internalChecked, handleChange } = useInputControls({
    value: checked,
    disabled,
    onChange,
  });

  return (
    <RowInput
      inputFirst={false}
      inputElement={
        <label
          className={`${styles.switch} ${compact ? styles.compactSwitch : styles.defaultSwitch}`}
        >
          <input
            name={name}
            type="checkbox"
            checked={internalChecked}
            onChange={(e) => {
              handleChange(e.target.checked);
            }}
            disabled={disabled}
          />
          <span
            className={`${styles.slider} ${compact ? styles.compactSlider : styles.defaultSlider}`}
          ></span>
        </label>
      }
      label={label}
      errorText={errorText}
      caption={caption}
    />
  );
}
