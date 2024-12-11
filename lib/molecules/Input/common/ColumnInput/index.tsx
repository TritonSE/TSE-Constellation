import { ReactNode } from "react";

import { useTheme } from "../../../../assets/ThemeProvider";

import styles from "./styles.module.css";

export type ColumnInputProps = {
  /**
   * Element to display the input itself to be slotted in
   */
  inputElement: ReactNode;

  /** The following 3 props are copied from CommonInputProps. */

  /**
   * Label to display for the input
   */
  label?: string;

  /**
   * Error text to display, if there is an error. An error state will be
   * displayed if this prop is set to a truthy value.
   */
  errorText?: string;

  /**
   * Caption text (small hint/sub-text)
   */
  caption?: string;
};

/**
 * A helper component for displaying an input component in a column,
 * with a label, then the input component itself, then a caption.
 */
export function ColumnInput(props: ColumnInputProps) {
  const { inputElement, label, errorText, caption } = props;

  const theme = useTheme();

  return (
    <div className={styles.root}>
      <label className={styles.label}>{label}</label>
      {inputElement}
      {(errorText ?? caption) === undefined ? null : (
        <p className={styles.caption} style={errorText ? { color: theme.colors.error } : {}}>
          {errorText ?? caption}
        </p>
      )}
    </div>
  );
}
