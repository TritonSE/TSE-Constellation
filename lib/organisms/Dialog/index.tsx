import { ReactNode } from "react";

import { useTheme } from "../../assets/ThemeProvider";
import { IconName } from "../../atoms/Icon";
import { BaseModal } from "../../internal/components/BaseModal";
import { Icon } from "../../main";

import styles from "./styles.module.css";

export type DialogProps = {
  /**
   * The variant of dialog (determines color theme & icon)
   */
  variant: "success" | "error" | "info";

  /**
   * The version of styling to use (see Figma for each version)
   */
  styleVersion: "minimal" | "styled" | "dramatic" | "inline";

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
   * Component to display as action
   */
  actionComponent?: ReactNode;

  /**
   * Component to display as cancel action (only for error and info dialogs)
   */
  cancelComponent?: ReactNode;
};

/**
 * A dialog modal that displays a pop-up message to the user. Can be used for
 * success, error, and info messages via the variant prop.
 */
export function Dialog(props: DialogProps) {
  const {
    variant,
    styleVersion,
    title,
    content,
    isOpen,
    onClose,
    actionComponent,
    cancelComponent,
  } = props;

  const { colors } = useTheme();

  const mainColor =
    variant === "success"
      ? colors.success
      : variant === "error"
        ? colors.error
        : colors.primary_dark;

  const iconName: IconName =
    variant === "success" ? "ic_success" : variant === "error" ? "ic_error" : "ic_info";

  const iconSize = styleVersion === "dramatic" ? 80 : 32;

  const renderIcon = () => (
    <Icon
      name={iconName}
      size={iconSize}
      foregroundColor={styleVersion === "styled" ? mainColor : colors.white}
      backgroundColor={styleVersion === "styled" ? colors.white : mainColor}
      style={styleVersion === "dramatic" ? { marginTop: 24 } : {}}
    />
  );

  const renderTitle = () => (
    <h2
      className={styles.title}
      style={{
        color: styleVersion === "styled" ? colors.white : mainColor,
      }}
    >
      {title}
    </h2>
  );

  const renderContent = () => (
    <p
      className={styles.content}
      style={
        styleVersion === "inline"
          ? {
              padding: "24px 0",
            }
          : {}
      }
    >
      {content}
    </p>
  );

  const renderActions = () => (
    <div
      className={`${styles.actionsContainer} ${
        styleVersion === "dramatic" ? styles.actionsContainerDramatic : ""
      }`}
    >
      {cancelComponent}
      {actionComponent}
    </div>
  );

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} rootClass={styles.root}>
      {["minimal", "styled"].includes(styleVersion) ? (
        <>
          <div
            className={styles.header}
            style={styleVersion === "styled" ? { backgroundColor: mainColor } : {}}
          >
            {renderIcon()}
            {renderTitle()}
          </div>
          {renderContent()}
          {renderActions()}
        </>
      ) : styleVersion === "dramatic" ? (
        <div className={styles.dramaticContainer}>
          {renderIcon()}
          {renderTitle()}
          {renderContent()}
          {renderActions()}
        </div>
      ) : (
        <div className={styles.header}>
          {renderIcon()}
          <div className={styles.inlineColumnContainer}>
            {renderTitle()}
            {renderContent()}
          </div>
          {variant === "info" ? (
            actionComponent
          ) : (
            <button className={styles.closeButton} onClick={onClose}>
              <Icon
                name="ic_close_large"
                foregroundColor={colors.gray_3}
                backgroundColor={colors.gray_3}
              />
            </button>
          )}
        </div>
      )}
    </BaseModal>
  );
}
