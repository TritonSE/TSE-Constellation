import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";
import { createPortal } from "react-dom";

interface BaseModalProps {
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
}

/**
 * Internal, primitive base modal component used by user-facing modal components
 * (e.g. Modal and Dialog). Handles the display and open/close logic for the modal container.
 */
export function BaseModal(props: BaseModalProps) {
  const { isOpen, onClose, children, rootClass, rootStyle } = props;

  return isOpen
    ? createPortal(
        <div className={styles.wrapper} onClick={onClose}>
          <div
            className={`${styles.root} ${rootClass}`}
            style={rootStyle}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}
