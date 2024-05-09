import { RatingCard } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/RatingCard",
  component: RatingCard,
  args: {
    style: { border: "1px dashed black", minWidth: 150 },
  },
} satisfies Meta<typeof RatingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A rating card with four stars
 */
export const FourStars: Story = {
  args: {
    numStars: 4,
    ratingText: "4(200)",
  },
};

/**
 * A rating card with one star
 */
export const OneStar: Story = {
  args: {
    numStars: 1,
    ratingText: "4",
  },
};
