import { Calendar as SimpleCalendar } from "@tritonse/react-simple-scheduler";

import "./styles.css";

import type { CalendarProps } from "@tritonse/react-simple-scheduler";

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
