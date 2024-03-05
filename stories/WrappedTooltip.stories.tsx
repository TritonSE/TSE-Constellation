import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from '../lib/main';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface WrappedTooltipProps {
  contents: string;
  left: number;
  top: number;
}

/**
 * A component that wraps the Tooltip component for easier Storybook visual testing.
 * Displays a button with a tooltip anchored to that button, and enables user to customize
 * position of that button to test different Tooltip positions.
 */
const WrappedTooltip = (props: WrappedTooltipProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Render as a Portal so we can customize button position
  return createPortal(
    <>
      <button
        style={{ position: 'fixed', left: props.left, top: props.top }}
        ref={buttonRef}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        Click me to toggle tooltip!
      </button>
      <Tooltip
        contents={props.contents}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorElement={buttonRef.current!}
      />
    </>,
    document.body
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Molecules/WrappedTooltip',
  component: WrappedTooltip
} satisfies Meta<typeof WrappedTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * A default wrapped tooltip
 */
export const Default: Story = {
  args: {
    contents: "I'm a tooltip!",
    left: 0,
    top: 0
  }
};
