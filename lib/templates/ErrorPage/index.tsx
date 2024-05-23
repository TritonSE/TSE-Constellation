import classNames from "classnames";

import { Icon, IconName } from "../../atoms/Icon";
import { useDevice, useTheme } from "../../main";

import styles from "./styles.module.css";

export type ErrorPageProps = {
  /**
   * Optional navbar to display at the top of the page.
   */
  navbar?: JSX.Element;
  /**
   * Optional icon to display on the error page.
   */
  icon?: IconName;
  /**
   * Optional custom icon to display on the error page
   * (or if you want to use a different component entirely).
   */
  customIcon?: JSX.Element;
  /**
   * The header text to display on the error page.
   */
  errorHeader: string;
  /**
   * The error message text to display on the error page.
   */
  errorMessage?: string;
  /**
   * The error code to display on the error page.
   */
  errorCode?: string;
  /**
   * Optional footer to display at the bottom of the page.
   */
  footer?: JSX.Element;
};

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

/**
 * An error page template that displays an error icon, header, message, and optional error code.
 *
 * This template models common error situations that a user may encounter during their interaction with an application.
 * 
 */
export function ErrorPage({
  navbar,
  icon,
  customIcon,
  errorHeader,
  errorMessage,
  errorCode,
  footer,
}: ErrorPageProps) {
  const theme = useTheme();
  const { isTablet, isMobile } = useDevice();

  return (
    <div className={cx(styles.errorPage)}>
      <div>{navbar && !isTablet && navbar}</div>
      <div className={cx(styles.content)}>
        {icon ? (
          <Icon
            name={icon}
            size={120}
            fill={theme.colors.primary_dark}
            stroke={theme.colors.primary_dark}
          />
        ) : (
          customIcon
        )}
        <h1 className={cx(styles.errorHeader)}>{errorHeader}</h1>
        {errorMessage && <div className={cx(styles.errorMessage)}>{errorMessage}</div>}
        {errorCode && <div className={cx(styles.errorCode)}>Error Code: {errorCode}</div>}
      </div>
      <div>{footer && !isMobile && footer}</div>
    </div>
  );
}
