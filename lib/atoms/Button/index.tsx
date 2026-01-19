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
  /**
   * Fill color for the leading icon
   */
  leadingIconFill?: string;
  /**
   * Fill color for the trailing icon
   */
  trailingIconFill?: string;
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
    leadingIconFill,
    trailingIconFill,
    ...restProps
  } = props;

  const theme = useTheme();

  return (
    <button
      className={cx(
        "button",
        variant,
        {
          disabled,
          destructive,
          small,
        },
        className,
      )}
      {...restProps}
    >
      <div className={styles.row}>
        {leadingIcon ? (
          <Icon name={leadingIcon} fill={leadingIconFill ?? theme.colors.white} />
        ) : null}
        {children}
        {trailingIcon ? (
          <Icon name={trailingIcon} fill={trailingIconFill ?? theme.colors.white} />
        ) : null}
      </div>
    </button>
  );
}
