import classNames from "classnames/bind";

import { Icon } from "../../../atoms/Icon";
import useDevice from "../../../internal/hooks/useDevice";
import { Page } from "../common";

import styles from "./styles.module.css";

export type TopNavigationProps = {
  /**
   * The source URI for the logo image to display at the top of the navigation.
   */
  logoSrc: string;
  /**
   * The list of navigation items to display in the top navigation, represented
   * as an object with keys: label, onClick, and icon.
   */
  navItems: Page[];
  /**
   * Optional action element to display at the right-most end of the navigation.
   */
  actionElement?: React.ReactNode;
  /**
   * Optional class name to apply to the container element.
   */
  className?: string;
  /**
   * Optional CSS styles to apply to the container element.
   */
  style?: React.CSSProperties;
};

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

/**
 * A navigation component that appears at the top of the page on browser viewports
 * and as a bottom tab bar on mobile viewports.
 */
export function TopNavigation(props: TopNavigationProps) {
  const { logoSrc, navItems, actionElement, className, style } = props;
  const { isDesktop, isMobile } = useDevice();

  return (
    <div className={cx(className, styles.container)} style={style}>
      {isDesktop && logoSrc && <img src={logoSrc} alt="logo" className={styles.logo} />}
      {isDesktop && actionElement === undefined && <div className={styles.spacer}></div>}
      <div className={styles.items}>
        {navItems.map((item, index) => (
          <div
            key={index}
            className={cx(styles.itemRow, { [styles.centered]: !open })}
            onClick={item.onClick}
          >
            {isMobile && <Icon name={item.icon} />}
            <span>{item.label}</span>
            {isDesktop && <div className={styles.underline}></div>}
          </div>
        ))}
      </div>
      {isDesktop && actionElement !== undefined && <div className={styles.spacer}></div>}
      {isDesktop && actionElement && <div className={styles.actionElement}>{actionElement} </div>}
    </div>
  );
}