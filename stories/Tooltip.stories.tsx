import { Tooltip } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Molecules/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default tooltip
 */
export const Default: Story = {
  args: {
    contents: "I'm a tooltip!",
    anchorElement: null,
    open: false,
    onClose: () => {
      /* Placeholder function */
    },
  },
};
