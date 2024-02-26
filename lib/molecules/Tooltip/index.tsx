import { ReactNode } from 'react';
import { Anchor } from '../../internal/components/Anchor';
import styles from './styles.module.css';
import { Placement } from '@floating-ui/react';
import { Icon } from '../../main';

export interface TooltipProps {
  /**
   * Whether to place the tooltip on the bottom or top of its anchor element
   */
  verticalPlacement?: 'bottom' | 'top';

  /**
   * Whether to place the tooltip to the left, center, or right of its anchor element
   */
  horizontalPlacement?: 'left' | 'center' | 'right';

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
}

export function Tooltip(props: TooltipProps) {
  const {
    verticalPlacement,
    horizontalPlacement,
    anchorElement,
    contents,
    open,
    onClose
  } = props;

  let anchorPlacement = verticalPlacement ?? 'top';

  const isBottom = verticalPlacement === 'bottom';

  return (
    <Anchor
      open={open}
      onClose={onClose}
      anchorElement={anchorElement}
      placement={anchorPlacement as Placement}
    >
      <div
        className={styles.root}
        style={isBottom ? { marginTop: 12 } : { marginBottom: 12 }}
      >
        <p className={styles.text}>{contents}</p>
        <Icon
          name={isBottom ? 'ic_caretfill_up' : 'ic_caretfill_down'}
          className={styles.arrowIcon}
          style={{
            ...(isBottom ? { top: -12 } : { bottom: -12 }),
            ...(horizontalPlacement === 'left'
              ? { left: 15 }
              : horizontalPlacement === 'right'
              ? { right: 15 }
              : { left: '50%', transform: 'translateX(-50%)' })
          }}
        />
      </div>
    </Anchor>
  );
}
