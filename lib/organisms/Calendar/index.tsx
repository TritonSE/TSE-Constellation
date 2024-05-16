import { Calendar as SimpleCalendar } from "@cubedoodl/react-simple-scheduler";

import "./styles.css";

export type CalendarStyles = {
  container: React.CSSProperties;
  head: React.CSSProperties;
  body: React.CSSProperties;
};

export type CalendarProps = {
  /**
   * The currently-selected date (as a Date object)
   */
  selected: Date;
  /**
   * Callback to set the selected date
   */
  setSelected: (val: Date) => void;
  /**
   * The style objects to be passed to the calendar's elements.
   *
   * See [here](https://github.com/Cubified/react-simple-scheduler?tab=readme-ov-file#style) for more information.
   */
  style?: CalendarStyles;
};

/**
 * A calendar (monthly view) component that allows users to select a date.
 *
 * This component is essentially a wrapper around the `Calendar` component from
 * Andrew's amazing `react-simple-scheduler` package. For complete usage information,
 * see the full documentation [here](https://github.com/Cubified/react-simple-scheduler).
 */
export function Calendar(props: CalendarProps) {
  // Wrapping inside a function needed for storybook to recognize this as a component
  return <SimpleCalendar {...props} />;
}
