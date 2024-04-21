import { CarouselCard } from "../lib/organisms/Carousel/CarouselCard";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/CarouselCard",
  component: CarouselCard,
  args: {},
} satisfies Meta<typeof CarouselCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default carousel card
 */
export const Default: Story = {
  args: {
    imageComponent: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="98"
        height="98"
        viewBox="0 0 98 98"
        fill="none"
      >
        <circle cx="49" cy="49" r="49" fill="#D9D9D9" />
      </svg>
    ),
    title: "Image Title",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundStyle: { height: 244 },
  },
};
