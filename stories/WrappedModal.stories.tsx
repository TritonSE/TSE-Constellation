import type { Meta, StoryObj } from "@storybook/react";

import { Button, Icon } from "../lib/main";
import { WrappedModal } from "./wrappedComponents/WrappedModal";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/WrappedModal",
  component: WrappedModal,
  args: {}
} satisfies Meta<typeof WrappedModal>;

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
    primaryActionComponent: <Button>Primary Action</Button>,
    secondaryActionComponent: (
      <Button variant="secondary">Secondary Action</Button>
    ),
    withDividers: true
  }
};

/**
 * A modal with an icon
 */
export const IconModal: Story = {
  args: {
    icon: <Icon name="ic_lock" />,
    title: "Title",
    content: "content placeholder",
    primaryActionComponent: <Button>Primary Action</Button>,
    secondaryActionComponent: (
      <Button variant="secondary">Secondary Action</Button>
    ),
    withDividers: true
  }
};

/**
 * A modal with no actions
 */
export const NoActionsModal: Story = {
  args: {
    title: "Title",
    content: "content placeholder",
    withDividers: true
  }
};

/**
 * A modal with no dividers
 */
export const NoDividersModal: Story = {
  args: {
    title: "Title",
    content: "content placeholder",
    withDividers: false
  }
};
