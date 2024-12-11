import classNames from "classnames/bind";
import { ReactNode } from "react";

import { Icon } from "../../../atoms/Icon";
import { useDevice } from "../../../main";
import { NavigationProps, Page } from "../common";

import styles from "./styles.module.css";

export type TopNavigationProps = {
  /**
   * The list of navigation items to display in the top navigation, represented
   * as an object with keys: label, path, and icon.
   */
  navItems: Page[];
  /**
   * Optional action element to display at the right-most end of the navigation.
   */
  actionElement?: ReactNode;
} & NavigationProps;

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

/**
 * A navigation component that appears at the top of the page on browser viewports
 * and as a bottom tab bar on mobile viewports.
 */
export function TopNavigation(props: TopNavigationProps) {
  const { logoSrc, navItems, actionElement, renderLink, className, style } = props;
  const { isDesktop, isMobile } = useDevice();

  return (
    <div className={cx(className, styles.container)} style={style}>
      {isDesktop && logoSrc && <img src={logoSrc} alt="logo" className={styles.logo} />}
      {isDesktop && actionElement === undefined && <div className={styles.spacer}></div>}
      <div className={styles.items}>
        {navItems.map((item) =>
          renderLink(
            item.path,
            styles.itemRow,
            <>
              {isMobile && <Icon name={item.icon} />}
              <span>{item.label}</span>
              {isDesktop && <div className={styles.underline}></div>}
            </>,
            item.label,
          ),
        )}
      </div>
      {isDesktop && actionElement !== undefined && <div className={styles.spacer}></div>}
      {isDesktop && actionElement && <div className={styles.actionElement}>{actionElement} </div>}
    </div>
  );
}
