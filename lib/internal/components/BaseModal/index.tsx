import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./styles.module.css";

type BaseModalProps = {
  /**
   * Whether the modal is currently open
   */
  isOpen: boolean;

  /**
   * Callback fired when the modal closes (by the user clicking away from the modal)
   */
  onClose: () => unknown;

  /**
   * Children to render inside the base modal
   */
  children: ReactNode;

  /**
   * CSS class to apply to root element inside modal
   */
  rootClass?: string;

  /**
   * Styles to apply to root element inside modal
   */
  rootStyle?: CSSProperties;
};

/**
 * Internal, primitive base modal component used by user-facing modal components
 * (e.g. Modal and Dialog). Handles the display and open/close logic for the modal container.
 */
export function BaseModal(props: BaseModalProps) {
  const { isOpen, onClose, children, rootClass, rootStyle } = props;
  const [startedClickOutside, setStartedClickOutside] = useState(false);

  useEffect(() => {
    // Disable scrolling when modal is open
    document.documentElement.style.setProperty("overflow", isOpen ? "hidden" : "unset");
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div
          className={styles.wrapper}
          onMouseDown={() => {
            setStartedClickOutside(true);
          }}
          onMouseUp={() => {
            if (startedClickOutside) {
              // Close the modal only if we started AND ended the click gesture outside the modal
              onClose();
              setStartedClickOutside(false);
            }
          }}
        >
          <div
            className={`${styles.root} ${rootClass ?? ""}`}
            style={rootStyle}
            onMouseDown={(e) => {
              setStartedClickOutside(false);
              e.stopPropagation();
            }}
            onMouseUp={(e) => {
              setStartedClickOutside(false);
              e.stopPropagation();
            }}
            onMouseEnter={() => {
              setStartedClickOutside(false);
            }}
          >
            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
}
