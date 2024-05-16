import { Icon, Search } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Search",
  component: Search,
  args: {},
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default search input
 */
export const Default: Story = {
  args: { placeholder: "Search" },
};

/**
 * A search input with an icon at the end
 */
export const EndIcon: Story = {
  args: {
    placeholder: "Search",
    endIcon: <Icon name="ic_camera" size={20} />,
  },
};
