import { LoadingSpinner } from "../lib/atoms/LoadingSpinner";
import { Accordion, Button, Icon, TextField } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Accordion",
  component: Accordion,
  args: {
    items: [
      {
        header: "What is a star?",
        content: "A star is a luminous sphere of plasma held together by its own gravity.",
      },
      {
        header: "How are stars formed?",
        content: "Stars are formed from the collapse of giant molecular clouds of gas and dust.",
      },
      {
        header: "What is a constellation?",
        content: "A constellation is a group of stars that form a recognizable pattern.",
      },
    ],
  },
} as Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * The default Accordion component.
 */
export const Default: Story = {};

/**
 * The Accordion component with custom React components for `header` and `content`.
 */
export const CustomComponents: Story = {
  args: {
    style: { width: "800px" },
    items: [
      {
        header: <Button>What is a star?</Button>,
        content: (
          <div>
            <p>It probably looks like this:</p>
            <Icon name="ic_star" size={100} fill="yellow" />
          </div>
        ),
      },
      {
        header: "How are stars formed?",
        content: (
          <div>
            <p>Answer here:</p>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <TextField placeholder="blah blah.." />
            </div>
          </div>
        ),
      },
      {
        header: "What is a constellation?",
        content: (
          <div>
            <LoadingSpinner /> Thinking...
          </div>
        ),
      },
    ],
  },
};

/**
 * The Accordion component with hidden expand/collapse all controls.
 */
export const HiddenControls: Story = {
  args: {
    hideControls: true,
  },
};
