import { Placement, autoPlacement, offset } from "@floating-ui/react";
import { ReactNode, useState } from "react";

import { Anchor } from "../../internal/components/Anchor";
import { Icon } from "../../main";

import styles from "./styles.module.css";

export type TooltipProps = {
  /**
   * Element to anchor the tooltip to
   */
  anchorElement: HTMLElement;

  /**
   * Contents to display inside the tooltip
   */
  contents: string | ReactNode;

  /**
   * Whether the tooltip is currently open
   */
  open: boolean;

  /**
   * Callback handler for when the tooltip is closed
   */
  onClose: () => unknown;
};

/**
 * A Tooltip component that displays a floating message anchored to another element
 */
export function Tooltip(props: TooltipProps) {
  const { anchorElement, contents, open, onClose } = props;
  const [chosenPlacement, setChosenPlacement] = useState<Placement>();

  // Extract horizontal & vertical placement from placement chosen by autoPlacement middleware
  const isBottom = chosenPlacement?.includes("bottom");
  const horizontalPlacement = chosenPlacement?.includes("-start")
    ? "left"
    : chosenPlacement?.includes("-end")
      ? "right"
      : "center";

  return (
    <Anchor
      open={open}
      onClose={onClose}
      anchorElement={anchorElement}
      middleware={[
        autoPlacement({
          allowedPlacements: [
            // These are the possible placements in the Figma designs
            "top",
            "top-start",
            "top-end",
            "bottom",
            "bottom-start",
            "bottom-end",
          ],
        }),
        offset(4),
      ]}
      onChangeChosenPlacement={setChosenPlacement}
    >
      <div className={styles.root} style={isBottom ? { marginTop: 12 } : { marginBottom: 12 }}>
        <p className={styles.text}>{contents}</p>
        {/* Display different icon at different position depending on placement */}
        <Icon
          name={isBottom ? "ic_caretfill_up" : "ic_caretfill_down"}
          className={styles.arrowIcon}
          style={{
            ...(isBottom ? { top: -12 } : { bottom: -12 }),
            ...(horizontalPlacement === "left"
              ? { left: 15 }
              : horizontalPlacement === "right"
                ? { right: 15 }
                : { left: "50%", transform: "translateX(-50%)" }),
          }}
        />
      </div>
    </Anchor>
  );
}
