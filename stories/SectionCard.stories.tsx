import { Checkbox, SectionCard } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/SectionCard",
  component: SectionCard,
  args: {
    title: "Title",
    content: "content placeholder",
    style: { border: "1px dashed black" },
  },
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A section card with no sections
 */
export const NoSections: Story = { args: { sections: [] } };

/**
 * A section card with sections with checkboxes
 */
export const CheckboxSections: Story = {
  args: {
    sections: [
      {
        title: "Section title",
        content: "content placeholder",
        checkbox: <Checkbox id="checkbox-1" />,
      },
      {
        title: "Section title",
        content: "content placeholder",
        checkbox: <Checkbox id="checkbox-2" />,
      },
      {
        title: "Section title",
        content: "content placeholder",
        checkbox: <Checkbox id="checkbox-3" />,
      },
    ],
  },
};

/**
 * A section card with sections with no checkboxes
 */
export const NonCheckboxSections: Story = {
  args: {
    sections: [
      { title: "Section title", content: "content placeholder" },
      { title: "Section title", content: "content placeholder" },
      { title: "Section title", content: "content placeholder" },
    ],
  },
};
