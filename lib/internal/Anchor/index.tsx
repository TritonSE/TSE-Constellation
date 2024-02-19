import { Placement, autoUpdate, useFloating } from '@floating-ui/react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface AnchorProps {
  /**
   * Whether the anchor is currently open (should be displayed).
   */
  open: boolean;

  /**
   * Callback fired when the anchor is closed due to user clicking somewhere else.
   */
  onClose: () => unknown;

  /**
   * Element that this component should be anchored to (i.e. have its position track).
   */
  anchorElement: HTMLElement;

  /**
   * Placement for anchor; specifies which of the 4 sides of the anchorElement
   * it should be anchored to, and its alignment along that side.
   */
  placement: Placement;

  /**
   * Children to be displayed inside the floating anchor.
   */
  children: React.ReactNode;
}

/**
 * Internal component that anchors its children to float above the DOM near a
 * certain element. For example, can be used to display a popover below a button,
 * or a tooltip  above a text field.
 */
export function Anchor(props: AnchorProps) {
  const { open, onClose, anchorElement, placement, children } = props;

  const { refs, elements, floatingStyles, update } = useFloating({
    elements: {
      reference: anchorElement
    },
    open,
    placement
  });

  const handleDocumentClick = (e: MouseEvent) => {
    // When the user clicks on something that's not our anchor, close the anchor
    if (
      open &&
      refs.floating.current &&
      !refs.floating.current.contains(e.target as Node)
    ) {
      // Stop event propagation in case it would trigger us re-opening (e.g. clicking an "open" button)
      e.stopPropagation();
      onClose();
    }
  };

  // Click listeners to handle user clicking somewhere else, which should close the anchor.
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, {
      passive: true
    });
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [open, refs.floating.current]);

  useEffect(() => {
    if (open && elements.reference && elements.floating) {
      return autoUpdate(elements.reference, elements.floating, update);
    }
  }, [open, elements, update]);

  return open
    ? // Use a React portal to render our children at the document root
      createPortal(
        <div style={floatingStyles} ref={refs.setFloating}>
          {children}
        </div>,
        document.body
      )
    : null;
}
