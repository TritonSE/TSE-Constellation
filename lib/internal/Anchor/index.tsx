import { Placement, autoUpdate, useFloating } from '@floating-ui/react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface AnchorProps {
  open: boolean;
  onClose: () => unknown;
  anchorElement: HTMLElement;
  placement: Placement;
  children: React.ReactNode;
}

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
    ? createPortal(
        <div style={floatingStyles} ref={refs.setFloating}>
          {children}
        </div>,
        document.body
      )
    : null;
}
