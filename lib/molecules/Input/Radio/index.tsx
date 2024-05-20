import { useEffect, useRef } from "react";

import { useTheme } from "../../../assets/ThemeProvider";
import { useInputControls } from "../../../internal/hooks/useInputControls";
import { CommonInputProps } from "../common";
import { RowInput } from "../common/RowInput";

import styles from "./styles.module.css";

export type RadioProps = {
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
} & CommonInputProps;

/**
 * A radio input element, displays a single radio circle with a label. Can be
 * either controlled (via the checked prop) or uncontrolled.
 */
export function Radio(props: RadioProps) {
  const { id, label, checked, errorText, caption, disabled, name, onChange } = props;

  const theme = useTheme();

  const { internalValue: internalChecked, handleChange } = useInputControls({
    value: checked,
    disabled,
    onChange,
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Color for main checkbox and border
  const checkboxColor = disabled
    ? theme.colors.disabled
    : errorText
      ? theme.colors.error
      : theme.colors.primary_dark;

  // Update CSS var when checkbox color changes
  useEffect(() => {
    inputRef.current?.style.setProperty("--tse-constellation-checkbox-color", checkboxColor);
  }, [inputRef.current, checkboxColor]);

  return (
    <RowInput
      inputFirst
      inputElement={
        <div
          className={styles.checkboxContainer}
          style={{
            border: `2px solid transparent`,
          }}
        >
          <input
            id={id}
            name={name}
            type="radio"
            checked={internalChecked}
            className={styles.checkbox}
            style={{
              border: `3px solid ${checkboxColor}`,
            }}
            onChange={(e) => {
              handleChange(e.target.checked);
            }}
            disabled={disabled}
            ref={inputRef}
          />
        </div>
      }
      label={label}
      errorText={errorText}
      caption={caption}
    />
  );
}
