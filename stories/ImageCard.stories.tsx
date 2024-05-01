import { ImageCard } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/ImageCard",
  component: ImageCard,
  args: {
    style: { border: "1px dashed black" },
  },
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * An image card with a large image
 */
export const LargeImage: Story = {
  args: {
    image: <img src="/constellation.png" alt="Constellation" width={267} height={150} />,
  },
};

/**
 * An image card with a small image
 */
export const SmallImage: Story = {
  args: {
    image: <img src="/constellation.png" alt="Constellation" width={89} height={50} />,
  },
};
