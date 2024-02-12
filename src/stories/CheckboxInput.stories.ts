import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxInput } from '../../lib/main';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/CheckboxInput',
  component: CheckboxInput,
  args: {}
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default checkbox
 */
export const Default: Story = {
  args: { id: 'checkbox-1', label: 'Checkbox Example' }
};
