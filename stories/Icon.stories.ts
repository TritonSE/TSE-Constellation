import { Icon } from "../lib/atoms/Icon";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Atoms/Icon",
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: { control: "number" },
    foregroundColor: { control: "color" },
    backgroundColor: { control: "color" },
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
 * Success icon
 */
export const Success: Story = {
  args: {
    name: "ic_success",
    foregroundColor: "green",
    backgroundColor: "black",
  },
};

/**
 * Icon with custom fill color
 */
export const Error: Story = {
  args: {
    name: "ic_error",
    foregroundColor: "white",
    backgroundColor: "red",
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
