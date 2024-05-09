import { Footer } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Footer",
  component: Footer,
  args: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default footer
 */
export const Default: Story = {};

/**
 * A dark background footer
 */
export const Dark: Story = {
  args: { mainColor: "#FCF6E5", backgroundColor: "rgba(0, 0, 0, 0.50)" },
};

/**
 * A light background footer
 */
export const Light: Story = {
  args: { mainColor: "#0C2B35", backgroundColor: "white" },
};
