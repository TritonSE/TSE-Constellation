import { Button, ProfileCard } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/ProfileCard",
  component: ProfileCard,
  args: {
    style: { border: "1px dashed black" },
  },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A profile card with an action
 */
export const WithAction: Story = {
  args: {
    images: [<img key={0} src="./bulb.png" alt="TSE Lightbulb" width={80} height={80} />],
    name: "Name",
    content: "@id, title, etc",
    action: <Button>Action</Button>,
  },
};

/**
 * A profile card with content
 */
export const WithContent: Story = {
  args: {
    images: [<img key={0} src="./bulb.png" alt="TSE Lightbulb" width={40} height={40} />],
    name: "Name",
    content: "@id, title, etc",
  },
};

/**
 * A profile card with a name
 */
export const WithName: Story = {
  args: {
    images: [<img key={0} src="./bulb.png" alt="TSE Lightbulb" width={40} height={40} />],
    name: "Name",
  },
};

/**
 * A profile card with multiple images
 */
export const MultipleImages: Story = {
  args: {
    images: [
      <img key={0} src="./bulb.png" alt="TSE Lightbulb" width={40} height={40} />,
      <img key={1} src="./bulb.png" alt="TSE Lightbulb" width={40} height={40} />,
      <img key={2} src="./bulb.png" alt="TSE Lightbulb" width={40} height={40} />,
    ],
  },
};
