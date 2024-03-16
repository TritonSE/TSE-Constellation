import { ReactNode } from "react";

import { useTheme } from "../../../../assets/ThemeProvider";

import styles from "./styles.module.css";

export type RowInputProps = {
  /**
   * Whether to display the input itself at the beginning of the row, instead of the end.
   */
  inputFirst: boolean;

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
 * A helper component for displaying an input component in a row,
 * with the input itself on one side and the label and caption on the other.
 */
export function RowInput(props: RowInputProps) {
  const { inputFirst, inputElement, label, errorText, caption } = props;

  const theme = useTheme();

  return (
    <div className={styles.row}>
      {inputFirst ? inputElement : null}
      <div className={styles.textContainer}>
        <p className={styles.label}>{label}</p>
        <p
          className={styles.caption}
          style={{
            color: errorText ? theme.colors.error : theme.colors.gray_5,
          }}
        >
          {errorText ?? caption}
        </p>
      </div>
      {inputFirst ? null : inputElement}
    </div>
  );
}
