import { Button, Modal } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Modal",
  component: Modal,
  args: {},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default modal
 */
export const Default: Story = {
  args: {
    title: "Title",
    content: "content placeholder",
    isOpen: true,
    primaryActionComponent: <Button>Primary Action</Button>,
    secondaryActionComponent: <Button variant="secondary">Secondary Action</Button>,
    withDividers: true,
  },
};
