import { Button } from "../lib/main";

import { WrappedDialog } from "./wrappedComponents/WrappedDialog";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/WrappedDialog",
  component: WrappedDialog,
  args: {},
} satisfies Meta<typeof WrappedDialog>;

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
    variant: "success",
    styleVersion: "styled",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Done</Button>,
  },
};

/**
 * A success minimal dialog
 */
export const SuccessMinimal: Story = {
  args: {
    title: "Mission Complete",
    content: "Some content message...",
    variant: "success",
    styleVersion: "minimal",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Done</Button>,
  },
};

/**
 * A success styled dialog
 */
export const SuccessStyled: Story = {
  args: {
    title: "Mission Complete",
    content: "Some content message...",
    variant: "success",
    styleVersion: "styled",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Done</Button>,
  },
};

/**
 * A success dramatic dialog
 */
export const SuccessDramatic: Story = {
  args: {
    title: "Mission Complete",
    content: "Some content message...",
    variant: "success",
    styleVersion: "dramatic",
    actionComponent: <Button style={{ width: "100%", textWrap: "nowrap" }}>Done</Button>,
  },
};

/**
 * A success inline dialog
 */
export const SuccessInline: Story = {
  args: {
    title: "Mission Complete",
    content: "Auto action after X seconds",
    variant: "success",
    styleVersion: "inline",
  },
};

/**
 * An error minimal dialog
 */
export const ErrorMinimal: Story = {
  args: {
    title: "Error Name",
    content: "Error message...",
    variant: "error",
    styleVersion: "minimal",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Try Again</Button>,
    cancelComponent: (
      <Button variant="secondary" style={{ textWrap: "nowrap" }}>
        Cancel
      </Button>
    ),
  },
};

/**
 * An error styled dialog
 */
export const ErrorStyled: Story = {
  args: {
    title: "Error Name",
    content: "Error message...",
    variant: "error",
    styleVersion: "styled",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Try Again</Button>,
    cancelComponent: (
      <Button variant="secondary" style={{ textWrap: "nowrap" }}>
        Cancel
      </Button>
    ),
  },
};

/**
 * An error dramatic dialog
 */
export const ErrorDramatic: Story = {
  args: {
    title: "Error Name",
    content: "Error message...",
    variant: "error",
    styleVersion: "dramatic",
    actionComponent: <Button style={{ width: "100%", textWrap: "nowrap" }}>Try Again</Button>,
    cancelComponent: (
      <Button variant="secondary" style={{ width: "100%", textWrap: "nowrap" }}>
        Cancel
      </Button>
    ),
  },
};

/**
 * A success inline dialog
 */
export const ErrorInline: Story = {
  args: {
    title: "Error Name",
    content: "Error message...",
    variant: "error",
    styleVersion: "inline",
  },
};

/**
 * An info minimal dialog
 */
export const InfoMinimal: Story = {
  args: {
    title: "Attempting Action?",
    content: "Some content message...Are you sure?",
    variant: "info",
    styleVersion: "minimal",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Yes, Continue</Button>,
    cancelComponent: (
      <Button variant="secondary" style={{ textWrap: "nowrap" }}>
        No, Cancel
      </Button>
    ),
  },
};

/**
 * An info styled dialog
 */
export const InfoStyled: Story = {
  args: {
    title: "Attempting Action?",
    content: "Some content message...Are you sure?",
    variant: "info",
    styleVersion: "styled",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Yes, Continue</Button>,
    cancelComponent: (
      <Button variant="secondary" style={{ textWrap: "nowrap" }}>
        No, Cancel
      </Button>
    ),
  },
};

/**
 * An info dramatic dialog
 */
export const InfoDramatic: Story = {
  args: {
    title: "Attempting Action?",
    content: "Some content message...Are you sure?",
    variant: "info",
    styleVersion: "dramatic",
    actionComponent: <Button style={{ width: "100%", textWrap: "nowrap" }}>Yes, Continue</Button>,
    cancelComponent: (
      <Button variant="secondary" style={{ width: "100%", textWrap: "nowrap" }}>
        No, Cancel
      </Button>
    ),
  },
};

/**
 * An info inline dialog
 */
export const InfoInline: Story = {
  args: {
    title: "Reminder...",
    content: "Some content message...",
    variant: "info",
    styleVersion: "inline",
    actionComponent: <Button style={{ textWrap: "nowrap" }}>Action</Button>,
  },
};
