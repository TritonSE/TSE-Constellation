import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from '../../lib/main';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  args: {}
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default dropdown input
 */
export const Default: Story = {
  args: {
    label: 'Dropdown Example',
    placeholder: 'Placeholder',
    options: [
      { label: 'Option 1', value: 'Value 1' },
      { label: 'Option 2', value: 'Value 2' },
      { label: 'Option 3', value: 'Value 3' }
    ]
  }
};
