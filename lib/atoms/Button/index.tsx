/**
 * A Button component with different variants
 */

import classNames from "classnames/bind";
import styles from "./styles.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Button variant
  variant?: "default" | "secondary" | "tag";
  // Small button?
  small?: boolean;
  // Descriptive button?
  destructive?: boolean;
  // Disabled button?
  disabled?: boolean;
}

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

export function Button(props: ButtonProps) {
  const { className, variant, disabled, small, destructive, ...restProps } =
    props;

  return (
    <button
      className={cx(className, "button", variant, {
        disabled,
        destructive,
        small,
      })}
      {...restProps}
    />
  );
}
