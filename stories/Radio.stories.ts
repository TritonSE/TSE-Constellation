import { Radio } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Radio",
  component: Radio,
  args: {},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default radio
 */
export const Default: Story = {
  args: { id: "radio-1", label: "Radio Example" },
};
