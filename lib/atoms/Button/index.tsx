import classNames from "classnames/bind";
import styles from "./styles.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Which variant of the button to use?
   */
  variant?: "default" | "secondary" | "tag";
  /**
   * Should it be small?
   */
  small?: boolean;
  /**
   * Should it indicate that it is destructive?
   */
  destructive?: boolean;
  /**
   * Should it be disabled?
   */
  disabled?: boolean;
  /**
   * Button label text/content
   */
  children?: React.ReactNode;
}

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

/**
 * A Button component with different variants.
 */
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
