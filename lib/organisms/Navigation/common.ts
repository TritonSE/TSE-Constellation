import { IconName } from "../../atoms/Icon";

export type Page = {
  /**
   * The label to display for the link.
   */
  label: string;
  /**
   * A function to call when the link is clicked. e.g. If using react-router-dom,
   * `() => navigate('/path')` or if using NextJS `() => router.push('/path')`, etc.
   */
  onClick: () => void;
  /**
   * The name of the icon to display with the link.
   */
  icon: IconName;
};
