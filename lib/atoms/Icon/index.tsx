import { useCallback, useEffect, useRef } from "react";
import { CSSProperties, useState } from "react";
import { useTheme } from "../../assets/ThemeProvider";
import styles from "./styles.module.css";

// Names of all available icons
export const IconNames = [
  "ic_arrowback",
  "ic_arrowdown",
  "ic_arrowforward",
  "ic_arrowup",
  "ic_caretdown",
  "ic_caretleft",
  "ic_caretright",
  "ic_caretup",
  "ic_return",
  "ic_switch",
  "ic_caretfill_up",
  "ic_caretfill_left",
  "ic_caretfill_down",
  "ic_caretfill_right",
  "ic_add",
  "ic_close",
  "ic_close_large",
  "ic_download",
  "ic_upload",
  "ic_share",
  "ic_link",
  "ic_search",
  "ic_email",
  "ic_newtab",
  "ic_cart",
  "ic_menu",
  "ic_pending",
  "ic_list",
  "ic_minimize",
  "ic_more",
  "ic_notification",
  "ic_notification_alert",
  "ic_menu_thick",
  "ic_menu_expanded_left",
  "ic_menu_expanded_right",
  "ic_simpleerror",
  "ic_simplehelp",
  "ic_simpleinfo",
  "ic_simplesuccess",
  "ic_error",
  "ic_help",
  "ic_info",
  "ic_success",
  "ic_edit",
  "ic_invite",
  "ic_camera",
  "ic_location",
  "ic_message",
  "ic_print",
  "ic_settings",
  "ic_lock",
  "ic_star",
  "ic_play",
  "ic_maximize",
  "ic_hide",
  "ic_show",
  "ic_gift",
] as const;

// Extract type representing one of the available icon names
export type IconName = (typeof IconNames)[number];

export interface IconProps {
  /**
   * Name of the icon to use, should be one of the available strings in IconName
   */
  name: IconName;

  /**
   * Size of the icon (both width and height), in pixels. Defaults to 24
   */
  size?: number;

  /**
   * Stroke color, i.e. color of lines/paths within the SVG.
   * Defaults to theme primary dark color
   */
  stroke?: string;

  /**
   * Fill color, i.e. color of shapes like rectangles or circles within the SVG.
   * Defaults to theme primary light color
   */
  fill?: string;

  /**
   * Optional className to apply to SVG element
   */
  className?: string;

  /**
   * Optional CSS styles to apply to SVG element
   */
  style?: CSSProperties;
}

/**
 * An icon component used to display one of the standard TSE icons.
 * Renders the icon as an SVG React component.
 */
export function Icon(props: IconProps) {
  const { name, size, stroke, fill, className, style } = props;
  const { colors } = useTheme();

  // Ref to icon SVG imported as a React component
  // https://medium.com/@erickhoury/react-dynamically-importing-svgs-and-render-as-react-component-b764b6475896
  const importedIconRef = useRef<React.ComponentType<
    Partial<IconProps>
  > | null>(null);

  // Use a meaningless state to force component to update
  // https://blog.logrocket.com/how-when-to-force-react-component-re-render/
  const [, updateState] = useState<{}>({});
  const forceUpdate = useCallback(() => updateState({}), []);

  // Whether we have loaded the SVG component yet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Import icon from dynamic path based on provided icon name. We need
    // to do this here instead of at the top of file because path is dynamic.
    import(`../../assets/icons/${name}.svg?react`)
      .then((moduleObj) => {
        importedIconRef.current = moduleObj.default;
        // Force component to re-render after icon changes
        forceUpdate();
      })
      // Allow import errors to propogate rather than catching them
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) {
    return null;
  }

  // Extract component from ref
  const { current } = importedIconRef;
  const ImportedIcon = current!;

  return (
    <ImportedIcon
      className={`${className ?? ""} ${styles.icon}`}
      stroke={stroke ?? colors.primary_dark}
      fill={fill ?? colors.primary_light}
      {...(size === undefined ? {} : { width: size, height: size })}
      style={style}
    />
  );
}
