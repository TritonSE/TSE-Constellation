import type { Meta, StoryObj } from "@storybook/react";

import { Button, Dialog } from "../lib/main";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Dialog",
  component: Dialog,
  args: {}
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default dialog
 */
export const Default: Story = {
  args: {
    title: "Title",
    content: "content placeholder",
    isOpen: true,
    variant: "success",
    styleVersion: "styled",
    actionComponent: <Button>Done</Button>
  }
};
