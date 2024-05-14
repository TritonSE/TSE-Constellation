import { useState } from "react";

import { Calendar } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Calendar",
  component: Calendar,
  render: (_) => {
    const [selected, setSelected] = useState(new Date());

    return <Calendar selected={selected} setSelected={setSelected} />;
  },
  args: {
    selected: new Date(),
    setSelected: () => {
      //
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default Calendar
 */
export const Default: Story = {};
