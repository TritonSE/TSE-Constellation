import { ReactNode, useState } from "react";

import { Modal } from "../../lib/main";

export type WrappedModalProps = {
  /**
   * Icon to be displayed at top left (optional)
   */
  icon?: ReactNode;

  /**
   * Title for the modal (text displayed at the top)
   */
  title: string;

  /**
   * Content to display inside the modal body. Can either be text or custom React component(s)
   */
  content: string | ReactNode;

  /**
   * Component to display as primary action
   */
  primaryActionComponent?: ReactNode;

  /**
   * Component to display as secondary action
   */
  secondaryActionComponent?: ReactNode;

  /**
   * Whether to display dividers between the modal sections
   */
  withDividers: boolean;
};

/**
 * A wrapper around the Modal component that displays a button that can
 * be used to open the Modal, and closes it when necessary.
 */
export function WrappedModal(props: WrappedModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open
      </button>
      <Modal
        {...props}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
}
