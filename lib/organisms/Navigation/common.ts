import { CSSProperties, Key, ReactNode } from "react";

import { IconName } from "../../atoms/Icon";

export type Page = {
  /**
   * The label to display for the link.
   */
  label: string;
  /**
   * The path to navigate to when the link is clicked.
   */
  path: string;
  /**
   * The name of the icon to display with the link.
   */
  icon: IconName;
};

export type NavigationProps = {
  /**
   * The source URI for the logo image to display at the top of the navigation.
   */
  logoSrc: string;
  /**
   * Function to render a link component. This is useful if you
   * are using a routing library (e.g. react-router-dom or NextJS) or you want
   * to render a custom link component.
   *
   * The function should take in four arguments:
   *
   * - `path`: The path to navigate to when the link is clicked.
   * - `className`: The class name to apply to the link component.
   * - `children`: The children to render inside the link component.
   * - `key`: A unique key for each link to render, since every element in a list
   *          needs a key in React.
   *
   * The function should return a ReactNode representing the link component.
   *
   * For example, if using NextJS, you can pass in a function like this:
   *
   * ```tsx
   * (path, className, children, key) => <Link key={key} href={path} className={className}>{children}</Link>
   * ```
   *
   * If you are using react-router-dom, you can pass in a function like this:
   *
   * ```tsx
   * (path, className, children, key) => <Link key={key} to={path} className={className}>{children}</Link>
   * ```
   *
   * If you want to render a custom link component, you can pass in a function like this:
   *
   * ```tsx
   * (path, className, children, key) => <a key={key} href={path} className={className}>{children}</a>
   * ```
   */
  renderLink: (
    path: string | undefined,
    className: string,
    children: ReactNode,
    key: Key,
  ) => ReactNode;
  /**
   * Optional class name to apply to the container element.
   */
  className?: string;
  /**
   * Optional CSS styles to apply to the container element.
   */
  style?: CSSProperties;
};
