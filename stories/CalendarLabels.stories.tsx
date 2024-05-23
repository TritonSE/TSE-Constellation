import React from "react";

import { CalendarLabels } from "../lib/main";
import { SchedulerCalendar } from "../lib/organisms/Scheduler";

import type { Meta, StoryObj } from "@storybook/react";

const CALENDARS: SchedulerCalendar[] = [
  { name: "Calendar 1", enabled: false },
  { name: "Calendar 2", enabled: false },
  { name: "Calendar 3", enabled: false },
  { name: "Calendar 4", enabled: false },
  { name: "Calendar 5", enabled: false },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/CalendarLabels",
  component: CalendarLabels,
  render: (args) => {
    const [calendars, setCalendars] = React.useState(args.calendars);

    args.calendars = calendars;
    args.setCalendars = setCalendars;

    return <CalendarLabels {...args} />;
  },
  args: {
    calendars: CALENDARS,
    setCalendars: () => {
      //
    },
  },
} satisfies Meta<typeof CalendarLabels>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default CalendarLabels component
 */
export const Default: Story = {};

/**
 * Set a custom title using the `title` prop.
 */
export const CustomTitle: Story = {
  args: {
    title: "Cool Calendars",
  },
};
