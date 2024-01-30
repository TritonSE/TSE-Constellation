/**
 * An icon component used to display one of the standard TSE icons.
 * Renders the icon as an SVG React component.
 */

import { useEffect, useRef } from 'react';
import { CSSProperties, useState } from 'react';
import { useTheme } from '../../assets/ThemeProvider';
import styles from './styles.module.css';

// Names of all available icons
export const IconNames = [
  'ic_arrowback',
  'ic_arrowdown',
  'ic_arrowforward',
  'ic_arrowup',
  'ic_caretdown',
  'ic_caretleft',
  'ic_caretright',
  'ic_caretup',
  'ic_return',
  'ic_switch',
  'ic_caretfill_up',
  'ic_caretfill_left',
  'ic_caretfill_down',
  'ic_caretfill_right',
  'ic_add',
  'ic_close',
  'ic_close_large',
  'ic_download',
  'ic_upload',
  'ic_share',
  'ic_link',
  'ic_search',
  'ic_email',
  'ic_newtab',
  'ic_cart',
  'ic_menu',
  'ic_pending',
  'ic_list',
  'ic_minimize',
  'ic_more',
  'ic_notification',
  'ic_notification_alert',
  'ic_menu_thick',
  'ic_menu_expanded_left',
  'ic_menu_expanded_right',
  'ic_simpleerror',
  'ic_simplehelp',
  'ic_simpleinfo',
  'ic_simplesuccess',
  'ic_error',
  'ic_help',
  'ic_info',
  'ic_success',
  'ic_edit',
  'ic_invite',
  'ic_camera',
  'ic_location',
  'ic_message',
  'ic_print',
  'ic_settings',
  'ic_lock',
  'ic_star',
  'ic_play',
  'ic_maximize',
  'ic_hide',
  'ic_show',
  'ic_gift',
] as const;

// Extract type representing one of the available icon names
export type IconName = (typeof IconNames)[number];

export interface IconProps {
  // Name of the icon to use, should be one of the available strings in IconName
  name: IconName;

  // Width of the icon, in pixels (defaults to SVG asset's width)
  width?: number;

  // Height of the icon, in pixels (defaults to SVG asset's height)
  height?: number;

  // Stroke color, i.e. color of lines/paths within the SVG.
  // Defaults to theme primary dark color
  stroke?: string;

  // Fill color, i.e. color of shapes like rectangles or circles within the SVG.
  // Defaults to theme primary light color
  fill?: string;

  // Optional className to apply to SVG element
  className?: string;

  // Optional CSS styles to apply to SVG element
  style?: CSSProperties;
}

export function Icon(props: IconProps) {
  const { name, width, height, stroke, fill, className, style } = props;
  const { colors } = useTheme();

  // Ref to icon SVG imported as a React component
  // https://medium.com/@erickhoury/react-dynamically-importing-svgs-and-render-as-react-component-b764b6475896
  const importedIconRef = useRef<React.ComponentType<
    Partial<IconProps>
  > | null>(null);

  // Whether we have loaded the SVG component yet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Import icon from dynamic path based on provided icon name. We need
    // to do this here instead of at the top of file because path is dynamic.
    import(`../../assets/icons/${name}.svg?react`)
      .then((moduleObj) => {
        importedIconRef.current = moduleObj.default;
      })
      // Allow import errors to propogate rather than catching them
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  // Extract component from ref
  const { current } = importedIconRef;
  const ImportedIcon = current!;

  // Props for width and height. If they are not provided to this component, we must NOT
  // use them (using undefined doesn't work) so we don't override SVG file width & height
  const dimensionProps: {
    width?: number;
    height?: number;
  } = {};
  if (width !== undefined) {
    dimensionProps.width = width;
  }
  if (width !== undefined) {
    dimensionProps.height = height;
  }

  return (
    <ImportedIcon
      className={`${className ?? ''} ${styles.icon}`}
      stroke={stroke ?? colors.primary_dark}
      fill={fill ?? colors.primary_light}
      {...dimensionProps}
      style={style}
    />
  );
}
