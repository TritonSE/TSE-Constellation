import { Icon } from "../lib/atoms/Icon";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Icon",
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: { control: "number" },
    stroke: { control: "color" },
    fill: { control: "color" },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * Default icon with no additional props
 */
export const Default: Story = {
  args: {
    name: "ic_notification",
  },
};

/**
 * Icon with custom size
 */
export const Size: Story = {
  args: {
    name: "ic_pending",
    size: 100,
  },
};

/**
 * Icon with custom stroke color
 */
export const Stroke: Story = {
  args: {
    name: "ic_return",
    stroke: "red",
  },
};

/**
 * Icon with custom fill color
 */
export const Fill: Story = {
  args: {
    name: "ic_pending",
    fill: "green",
  },
};

/**
 * Icon with custom styles
 */
export const CustomStyle: Story = {
  args: {
    name: "ic_gift",
    style: { width: 120, height: 120, marginTop: 50 },
  },
};
