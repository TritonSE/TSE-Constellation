import classNames from "classnames/bind";
import { useState } from "react";

import { Icon } from "../../../atoms/Icon";
import useDevice from "../../../internal/hooks/useDevice";
import { Page } from "../common";

import styles from "./styles.module.css";

export type SideNavigationProps = {
  /**
   * The source URI for the logo image to display at the top of the navigation.
   */
  logoSrc: string;
  /**
   * The list of navigation items to display in the side navigation. A string
   * represents a section header, while a Page object represents a link.
   */
  navItems: (Page | string)[];
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

const NavItems = ({ items, open }: { items: (Page | string)[]; open: boolean }) => (
  <div className={styles.items}>
    {items.map((item, index) => {
      if (typeof item === "string") {
        return (
          <div key={index} className={cx(styles.sectionHeader)}>
            {item}
          </div>
        );
      }

      return (
        <div
          key={index}
          className={cx(styles.itemRow, { [styles.centered]: !open })}
          onClick={item.onClick}
        >
          <Icon name={item.icon} />
          {open && <span>{item.label}</span>}
        </div>
      );
    })}
  </div>
);

const DesktopSideNavigation = (props: SideNavigationProps) => {
  const { logoSrc, navItems, className, style } = props;
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={cx(className, styles.navContainer)} style={style}>
      <div className={styles.hat}>
        <div className={styles.toggle} onClick={toggle}>
          <Icon
            name={open ? "ic_menu_expanded_left" : "ic_menu"}
            size={32}
            fill="black"
            stroke="black"
          />
        </div>
        {open && <img src={logoSrc} alt="logo" className={styles.logo} />}
      </div>
      <NavItems items={navItems} open={open} />
    </div>
  );
};

const MobileSideNavigation = (props: SideNavigationProps) => {
  const { logoSrc, navItems, className, style } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobile}>
      <div className={styles.topNav}>
        <div></div>
        <div>
          <img src={logoSrc} alt="logo" className={styles.logo} />
        </div>
        <div
          className={styles.toggle}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon name="ic_menu" size={32} fill="black" stroke="black" />
        </div>
      </div>

      {open && (
        <>
          <div className={styles.overlay}></div>
          <div className={cx(className, styles.navContainer)} style={style}>
            <div className={styles.hat}>
              <div
                className={styles.toggle}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Icon name="ic_menu_expanded_left" size={32} fill="black" stroke="black" />
              </div>
            </div>
            <NavItems items={navItems} open={open} />
          </div>
        </>
      )}
    </div>
  );
};

/**
 * A side navigation component. On mobile viewports, the component appears as a
 * hamburger menu on the right when toggled.
 */
export function SideNavigation(props: SideNavigationProps) {
  const { isMobile } = useDevice();

  if (isMobile) {
    return <MobileSideNavigation {...props} />;
  }

  return <DesktopSideNavigation {...props} />;
}
