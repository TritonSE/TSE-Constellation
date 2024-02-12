import type { Meta, StoryObj } from '@storybook/react';

import { RadioInput } from '../../lib/main';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/RadioInput',
  component: RadioInput,
  args: {}
} satisfies Meta<typeof RadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default radio input
 */
export const Default: Story = {
  args: { id: 'radio-1', label: 'Radio Example' }
};
