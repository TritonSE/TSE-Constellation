/**
 * Props common to all input components
 */
export interface CommonInputProps {
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

  /**
   * Whether the input is disabled (cannot be interacted with)
   */
  disabled?: boolean;

  /**
   * Name to be applied to the input field, useful for forms
   */
  name?: string;
}
