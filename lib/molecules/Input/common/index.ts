export interface CommonInputProps {
  // Label to display for the input
  label?: string;

  // Error text to display, if there is an error
  errorText?: string;

  // Caption text (small hint/sub-text)
  caption?: string;

  // Whether the input is disabled
  disabled?: boolean;

  // Name to be applied to the input field, useful for forms
  name?: string;
}
