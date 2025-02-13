import classNames from "classnames/bind";
import { Key, ReactNode, useState } from "react";

import { Icon } from "../../../atoms/Icon";
import { useDevice } from "../../../main";
import { NavigationProps, Page } from "../common";

import styles from "./styles.module.css";

export type SideNavigationProps = {
  /**
   * The list of navigation items to display in the side navigation. A string
   * represents a section header, while a Page object represents a link.
   */
  navItems: (Page | string)[];
} & NavigationProps;

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

const NavItems = ({
  renderLink,
  items,
  open,
}: {
  renderLink: (
    path: string | undefined,
    className: string,
    children: ReactNode,
    key: Key,
  ) => ReactNode;
  items: (Page | string)[];
  open: boolean;
}) => (
  <div className={styles.items}>
    {items.map((item, index) => {
      if (typeof item === "string") {
        return (
          <div key={index} className={cx(styles.sectionHeader)}>
            {item}
          </div>
        );
      }

      return renderLink(
        item.path,
        cx(styles.itemRow, { [styles.centered]: !open }),
        <>
          <Icon name={item.icon} />
          {open && <span>{item.label}</span>}
        </>,
        item.label,
      );
    })}
  </div>
);

const DesktopSideNavigation = (props: SideNavigationProps) => {
  const { logoSrc, logoComponent, navItems, renderLink, className, style } = props;
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
        {open && (logoComponent ?? <img src={logoSrc} alt="logo" className={styles.logo} />)}
      </div>
      <NavItems renderLink={renderLink} items={navItems} open={open} />
    </div>
  );
};

const MobileSideNavigation = (props: SideNavigationProps) => {
  const { logoSrc, logoComponent, navItems, renderLink, className, style } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobile}>
      <div className={styles.topNav}>
        <div></div>
        <div>{logoComponent ?? <img src={logoSrc} alt="logo" className={styles.logo} />}</div>
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
            <NavItems renderLink={renderLink} items={navItems} open={open} />
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
