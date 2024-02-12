import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from '../../lib/main';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/TextInput',
  component: TextInput,
  args: {}
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default text input
 */
export const Default: Story = {
  args: { label: 'Text Input Example' }
};
