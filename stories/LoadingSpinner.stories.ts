import type { Meta, StoryObj } from "@storybook/react";

import { LoadingSpinner } from "../lib/atoms/LoadingSpinner";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/LoadingSpinner",
  component: LoadingSpinner,
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default loading spinner
 */
export const Default: Story = {};

/**
 * A small loading spinner
 */
export const Small: Story = {
  args: { size: 12 },
};

/**
 * A humongous loading spinner
 */
export const Large: Story = {
  args: { size: 100 },
};
