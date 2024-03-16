import { Middleware, Placement, autoUpdate, useFloating } from "@floating-ui/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export type AnchorProps = {
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
  placement?: Placement;

  /**
   * Optional middleware function(s) to apply to floating styles
   */
  middleware?: (Middleware | null | undefined | false)[];

  /**
   * Optional callback fired when chosen position changes
   */
  onChangeChosenPlacement?: (chosenPlacement: Placement) => unknown;

  /**
   * Children to be displayed inside the floating anchor.
   */
  children: React.ReactNode;
};

/**
 * Internal component that anchors its children to float above the DOM near a
 * certain element. For example, can be used to display a popover below a button,
 * or a tooltip  above a text field.
 */
export function Anchor(props: AnchorProps) {
  const {
    open,
    onClose,
    anchorElement,
    placement: desiredPlacement,
    middleware,
    onChangeChosenPlacement,
    children,
  } = props;

  const {
    refs,
    elements,
    floatingStyles,
    placement: chosenPlacement,
    update,
  } = useFloating({
    elements: {
      reference: anchorElement,
    },
    open,
    placement: desiredPlacement,
    middleware,
  });

  // Notify consumer via onChangeChosenPlacement whenever chosenPlacement changes
  useEffect(() => {
    onChangeChosenPlacement?.(chosenPlacement);
  }, [chosenPlacement, onChangeChosenPlacement]);

  useEffect(() => {
    if (open && elements.reference && elements.floating) {
      return autoUpdate(elements.reference, elements.floating, update);
    }
  }, [open, elements, update]);

  return open
    ? // Use a React portal to render our children at the document root
      createPortal(
        <div style={{ width: "100vw", height: "100vh" }} onClick={onClose}>
          <div style={floatingStyles} ref={refs.setFloating}>
            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
}
