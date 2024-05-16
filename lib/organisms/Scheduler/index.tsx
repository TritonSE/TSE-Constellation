import { Scheduler as SimpleScheduler } from "@cubedoodl/react-simple-scheduler";

import "./styles.css";

export enum EventRepetition {
  None = 0,
  Daily = 1,
  Weekly = 2,
  Biweekly = 3,
  Monthly = 4,
  Annually = 5,
  Weekday = 6,
}

export type DateRange = {
  from: Date;
  to: Date;
};

export type SchedulerCalendar = {
  name: string;
  enabled: boolean | (() => boolean);
};

export type SchedulerEvent = {
  calendar: SchedulerCalendar | SchedulerCalendar[];
  is_current: boolean;
  style?: React.CSSProperties | ((evt: SchedulerEvent) => React.CSSProperties);
} & DateRange;

export type SchedulerExistingEvent = {
  name: string;
  repeat: EventRepetition;
  original?: SchedulerEvent;
} & SchedulerEvent;

export type SchedulerStyles = {
  container: React.CSSProperties;
  head: React.CSSProperties;
  body: React.CSSProperties;
};

export type SchedulerProps = {
  /**
   * The array of events to be drawn on the scheduler.
   */
  events: SchedulerExistingEvent[];
  /**
   * The currently-selected date.
   *
   * This can be selected using the `Calendar` component.
   */
  selected: Date;
  /**
   * Callback to set the selected date.
   */
  setSelected: (val: Date) => void;
  /**
   * The function called when the user requests a new event be created.
   */
  onRequestAdd: (evt: SchedulerEvent) => void;
  /**
   * The function called when the user clicks on an existing event.
   */
  onRequestEdit: (evt: SchedulerEvent | undefined) => void;
  /**
   * Whether click-and-drag event creation is enabled.
   */
  editable?: boolean;
  /**
   * The style objects to be passed to the calendar's elements.
   *
   * See [here](https://github.com/Cubified/react-simple-scheduler?tab=readme-ov-file#style-1) for more information.
   */
  style?: SchedulerStyles | null;
};

/**
 * A calendar component (weekly view) that allows users view, add, and edit events.
 * This component is great for scheduling and planning events. This can be used with
 * the `Calendar` component to provide a full scheduling experience.
 *
 * This component is essentially a wrapper around the `Scheduler` component from
 * Andrew's amazing `react-simple-scheduler` package. For complete usage information,
 * see the full documentation [here](https://github.com/Cubified/react-simple-scheduler).
 */
export function Scheduler(props: SchedulerProps) {
  // Wrapping inside a function needed for storybook to recognize this as a component
  return <SimpleScheduler {...props} />;
}
