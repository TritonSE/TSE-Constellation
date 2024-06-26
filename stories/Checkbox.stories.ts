import { Checkbox } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Checkbox",
  component: Checkbox,
  args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default checkbox
 */
export const Default: Story = {
  args: { id: "checkbox-1", label: "Checkbox Example" },
};
