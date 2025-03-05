import classNames from "classnames/bind";

import { useTheme } from "../../main";
import { Icon, IconName } from "../Icon";

import styles from "./styles.module.css";

export type ButtonProps = {
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
  /**
   * Icon to display at the left of the button
   */
  leadingIcon?: IconName;
  /**
   * Icon to display at the right of the button
   */
  trailingIcon?: IconName;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

/**
 * A Button component with different variants.
 */
export function Button(props: ButtonProps) {
  const {
    className,
    variant,
    disabled,
    small,
    destructive,
    children,
    leadingIcon,
    trailingIcon,
    ...restProps
  } = props;

  const theme = useTheme();

  return (
    <button
      className={cx(className, "button", variant, {
        disabled,
        destructive,
        small,
      })}
      {...restProps}
    >
      <div className={styles.row}>
        {leadingIcon ? <Icon name={leadingIcon} fill={theme.colors.white} /> : null}
        {children}
        {trailingIcon ? <Icon name={trailingIcon} fill={theme.colors.white} /> : null}
      </div>
    </button>
  );
}
