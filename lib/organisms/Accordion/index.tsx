import classNames from "classnames";
import { CSSProperties, ReactNode, useCallback, useState } from "react";

import { Icon } from "../../main";

import styles from "./styles.module.css";

export type AccordionItem = {
  header: ReactNode;
  content: ReactNode;
};

export type AccordionProps = {
  /**
   * The items to display in the accordion, represented as an array of
   * objects with `header` and `content` properties. The `header` property
   * and `content` property can be any valid ReactNode, so you can pass any React
   * component you want.
   */
  items: AccordionItem[];
  /**
   * Whether to hide the expand/collapse all controls.
   */
  hideControls?: boolean;
  /**
   * Whether to disable the hover color-changing effects.
   */
  disableHoverEffect?: boolean;
  /**
   * Optional class name to apply to the container element.
   */
  className?: string;
  /**
   * Optional CSS styles to apply to the container element.
   */
  style?: CSSProperties;
  /**
   * Optional color for the borders around the elements.
   */
  borderColor?: string;
};

// See https://github.com/JedWatson/classnames for usage
const cx = classNames.bind(styles);

/**
 * An accordion component. Accordions are great ways to include a lot of information in a condensed way (e.g. FAQ sections).
 */
export function Accordion(props: AccordionProps) {
  const {
    items,
    hideControls,
    disableHoverEffect,
    className,
    style,
    borderColor = "black",
  } = props;
  const [open, setOpen] = useState<boolean[]>(Array(items.length).fill(false));

  const toggleItem = useCallback(
    (index: number) => {
      const newOpen = [...open];
      newOpen[index] = !newOpen[index];
      setOpen(newOpen);
    },
    [open],
  );

  const expandAll = useCallback(() => {
    setOpen(Array(items.length).fill(true));
  }, [items.length]);

  const collapseAll = useCallback(() => {
    setOpen(Array(items.length).fill(false));
  }, [items.length]);

  return (
    <div className={cx(styles.accordionContainer, className)} style={style}>
      {!hideControls && (
        <div
          className={cx(styles.accordionControls, {
            [styles.accordionControlsHover]: !disableHoverEffect,
          })}
        >
          <button
            className={cx(styles.toggle)}
            style={{ borderRight: `1px solid ${borderColor}` }}
            onClick={expandAll}
          >
            Expand All
          </button>
          <button className={cx(styles.toggle)} onClick={collapseAll}>
            Collapse All
          </button>
        </div>
      )}
      <div className={cx(styles.accordionItems)}>
        {items.map((item, index) => (
          <div
            key={index}
            className={cx(styles.accordionRow)}
            style={{ borderBottom: `2px solid ${borderColor}` }}
            onClick={() => {
              toggleItem(index);
            }}
          >
            <div
              className={cx(styles.accordionHeader, {
                [styles.closed]: !open[index],
                [styles.accordionHeaderHover]: !disableHoverEffect,
              })}
            >
              {item.header}
              <Icon
                name="ic_caretdown"
                fill="black"
                size={24}
                className={cx(styles.accordionRowToggleIcon, { [styles.closed]: !open[index] })}
              />
            </div>
            <div className={cx(styles.accordionContent, { [styles.closed]: !open[index] })}>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
