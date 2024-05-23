import classNames from "classnames";
import { CSSProperties } from "react";

import { Checkbox } from "../../main";

import styles from "./styles.module.css";

import type { SchedulerCalendar } from "@cubedoodl/react-simple-scheduler";

export type CalendarLabelProps = {
  /**
   * The array of calendars to display represented as `SchedulerCalendar` objects.
   */
  calendars: SchedulerCalendar[];
  /**
   * Callback to call to set `calendars` to a new value when a checkbox is toggled.
   */
  setCalendars: (calendars: SchedulerCalendar[]) => void;
  /**
   * Optional custom title to display above the list of calendars
   */
  title?: string;
  /**
   * Optional CSS class to apply to root of card
   */
  className?: string;
  /**
   * Optional CSS styles to apply to root of card
   */
  style?: CSSProperties;
};

const cx = classNames.bind(styles);

/**
 * A component that displays a list of calendars with checkboxes
 * to toggle their visibility. This component can be combined with the `Scheduler`
 * component to allow users to toggle the visibility of different calendars.
 */
export function CalendarLabels({
  title = "View Calendars",
  calendars,
  setCalendars,
}: CalendarLabelProps) {
  const toggleEnabled = (idx: number) => {
    const newCalendars = [...calendars];
    newCalendars[idx] = {
      ...newCalendars[idx],
      enabled: !newCalendars[idx].enabled,
    };
    setCalendars(newCalendars);
  };

  return (
    <div className={cx(styles.calendarLabelsContainer)}>
      <div className={cx(styles.title)}>{title}</div>
      {calendars.map((calendar, idx) => (
        <div key={idx} className={cx(styles.calendarLabelRow)}>
          <Checkbox
            id={calendar.name}
            checked={typeof calendar.enabled === "boolean" ? calendar.enabled : calendar.enabled()}
            onChange={() => {
              toggleEnabled(idx);
            }}
            label={calendar.name}
          />
        </div>
      ))}
    </div>
  );
}
