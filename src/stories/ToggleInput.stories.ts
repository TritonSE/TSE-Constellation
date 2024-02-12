import type { Meta, StoryObj } from '@storybook/react';

import { ToggleInput } from '../../lib/main';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/ToggleInput',
  component: ToggleInput,
  args: {}
} satisfies Meta<typeof ToggleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default toggle input
 */
export const Default: Story = {
  args: { label: 'Toggle Input Example' }
};
