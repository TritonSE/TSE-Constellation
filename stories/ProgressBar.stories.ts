import { ProgressBar } from "../lib/atoms/ProgressBar";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * An in-progress progress bar
 */
export const InProgress: Story = {
  args: { progress: 64 },
};

/**
 * A short progress bar
 */
export const Short: Story = {
  args: { progress: 34, width: 200 },
};
