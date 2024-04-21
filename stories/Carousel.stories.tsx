import { Carousel } from "../lib/main";
import { CarouselCard } from "../lib/organisms/Carousel/CarouselCard";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/Carousel",
  component: Carousel,
  args: {},
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default carousel
 */
export const Default: Story = {
  args: {
    carouselCards: [
      <CarouselCard
        key={0}
        imageComponent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="98"
            viewBox="0 0 98 98"
            fill="none"
          >
            <circle cx="49" cy="49" r="49" fill="#D9D9D9" />
          </svg>
        }
        title="Image Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        backgroundStyle={{ height: 244 }}
      />,
      <CarouselCard
        key={1}
        imageComponent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="109"
            height="103"
            viewBox="0 0 109 103"
            fill="none"
          >
            <path
              d="M54.5 0L67.185 39.0405L108.235 39.0405L75.0248 63.1689L87.7099 102.209L54.5 78.0811L21.2901 102.209L33.9752 63.1689L0.765308 39.0405L41.815 39.0405L54.5 0Z"
              fill="#D9D9D9"
            />
          </svg>
        }
        title="Image Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        backgroundStyle={{ height: 244 }}
      />,
      <CarouselCard
        key={2}
        imageComponent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="93"
            height="107"
            viewBox="0 0 93 107"
            fill="none"
          >
            <path
              d="M46.5 0L92.8324 26.75V80.25L46.5 107L0.167641 80.25V26.75L46.5 0Z"
              fill="#D9D9D9"
            />
          </svg>
        }
        title="Image Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        backgroundStyle={{ height: 244 }}
      />,
      <CarouselCard
        key={3}
        imageComponent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="104"
            height="90"
            viewBox="0 0 104 90"
            fill="none"
          >
            <path d="M52 0L103.962 90H0.038475L52 0Z" fill="#D9D9D9" />
          </svg>
        }
        title="Image Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        backgroundStyle={{ height: 244 }}
      />,
    ],
  },
};

/**
 * A small carousel
 */
export const Small: Story = {
  args: {
    carouselCards: [
      <CarouselCard
        key={0}
        imageComponent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="98"
            height="98"
            viewBox="0 0 98 98"
            fill="none"
          >
            <circle cx="49" cy="49" r="49" fill="#D9D9D9" />
          </svg>
        }
        title="Image Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        backgroundStyle={{ height: 244 }}
      />,
      <CarouselCard
        key={1}
        imageComponent={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="109"
            height="103"
            viewBox="0 0 109 103"
            fill="none"
          >
            <path
              d="M54.5 0L67.185 39.0405L108.235 39.0405L75.0248 63.1689L87.7099 102.209L54.5 78.0811L21.2901 102.209L33.9752 63.1689L0.765308 39.0405L41.815 39.0405L54.5 0Z"
              fill="#D9D9D9"
            />
          </svg>
        }
        title="Image Title"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        backgroundStyle={{ height: 244 }}
      />,
    ],
  },
};
