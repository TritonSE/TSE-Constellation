import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../lib/atoms/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default button
 */
export const Default: Story = {};

/**
 * A disabled button
 */
export const Disabled: Story = {
  args: { disabled: true },
};

/**
 * A small button
 */
export const Small: Story = {
  args: { small: true },
};

/**
 * Secondary button variant
 */
export const Secondary: Story = {
  args: { variant: "secondary" },
};

/**
 * A destructive button
 */
export const Destructive: Story = {
  args: { destructive: true },
};

/**
 * Tag variant
 */
export const Tag: Story = {
  args: { variant: "tag" },
};
