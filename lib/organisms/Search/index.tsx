import { CSSProperties, ReactNode, useState } from "react";

import { useInputControls } from "../../internal/hooks/useInputControls";
import { Icon, useTheme } from "../../main";

import styles from "./styles.module.css";

export type SearchProps = {
  /**
   * Placeholder text to display inside the search field if nothing has been typed.
   */
  placeholder?: string;

  /**
   * The current value of the input field (i.e. what the user has typed into it).
   * If this prop is not provided, the component will maintain an internal state for the value.
   */
  value?: string;

  /**
   * Callback fired when the text entered in the field changes
   * @param newValue the new value of the entered text
   */
  onChange?: (newValue: string) => unknown;

  /**
   * The search icon to display on the left side of the component. Defaults to a magnifying glass.
   */
  searchIcon?: ReactNode;

  /**
   * The icon to display on the right side of the component, if any.
   */
  endIcon?: ReactNode;

  /**
   * Whether the search bar is disabled (cannot be interacted with)
   */
  disabled?: boolean;

  /**
   * Optional CSS class to apply to root element
   */
  className?: string;

  /**
   * Optional CSS styles to apply to root element
   */
  styles?: CSSProperties;
};

/**
 * A Search input component that enables users to type a search query
 */
export function Search(props: SearchProps) {
  const { placeholder, value, onChange, endIcon, disabled, className } = props;
  const { colors } = useTheme();

  // Track whether the user is currently focusing (clicking) on the input
  const [focused, setFocused] = useState(false);
  const searchIcon =
    props.searchIcon === undefined ? (
      // Default search icon
      <Icon
        name="ic_search"
        size={20}
        foregroundColor={disabled ? colors.disabled : focused ? colors.gray_6 : colors.gray_4}
      />
    ) : (
      props.searchIcon
    );

  const { internalValue, handleChange } = useInputControls({
    value,
    disabled,
    onChange,
  });

  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      style={{
        border: `1px solid ${disabled ? colors.disabled : "rgba(0, 0, 0, 0.4)"}`,
        ...(props.styles ?? {}),
      }}
    >
      {searchIcon}
      <input
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
        value={internalValue}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      {endIcon}
    </div>
  );
}
