import { Dialog } from "../../lib/organisms/Dialog";
import { ReactNode, useState } from "react";

export interface WrappedDialogProps {
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
   * Component to display as action
   */
  actionComponent?: ReactNode;

  /**
   * Component to display as cancel action (only for error and info dialogs)
   */
  cancelComponent?: ReactNode;
}

/**
 * A wrapper around the Dialog component that displays a button that can
 * be used to open the Dialog, and closes it when necessary.
 */
export function WrappedDialog(props: WrappedDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button onClick={() => setDialogOpen(true)}>Open</button>
      <Dialog
        {...props}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
