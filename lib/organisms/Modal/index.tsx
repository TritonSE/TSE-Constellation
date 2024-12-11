import { ReactNode } from "react";

import { useTheme } from "../../assets/ThemeProvider";
import { BaseModal } from "../../internal/components/BaseModal";
import { Icon } from "../../main";

import styles from "./styles.module.css";

export type ModalProps = {
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
   * Whether the modal is currently open
   */
  isOpen: boolean;

  /**
   * Callback fired when the modal closes (by the user clicking the close button or
   * clicking away from the modal)
   */
  onClose: () => unknown;

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
 * A modal component that displays a pop-up message and, optionally,
 * one or two actions the user can take.
 */
export function Modal(props: ModalProps) {
  const {
    icon,
    title,
    content,
    isOpen,
    onClose,
    primaryActionComponent,
    secondaryActionComponent,
    withDividers,
  } = props;
  const { colors } = useTheme();

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} rootClass={styles.root}>
      <div className={styles.titleRow}>
        {icon ?? null}
        <h2 className={styles.title}>{title}</h2>
        <button className={styles.closeButton} onClick={onClose}>
          <Icon name="ic_close_large" fill={colors.gray_3} stroke={colors.gray_3} />
        </button>
      </div>
      <p
        className={styles.content}
        style={
          withDividers
            ? {
                borderTop: `1px solid ${colors.gray_1}`,
                borderBottom: `1px solid ${colors.gray_1}`,
                padding: "16px 24px",
              }
            : {
                padding: "0 24px",
              }
        }
      >
        {content}
      </p>
      {(primaryActionComponent ?? secondaryActionComponent) ? (
        <div className={styles.actionsContainer}>
          {secondaryActionComponent ?? <div />}
          {primaryActionComponent ?? <div />}
        </div>
      ) : null}
    </BaseModal>
  );
}
