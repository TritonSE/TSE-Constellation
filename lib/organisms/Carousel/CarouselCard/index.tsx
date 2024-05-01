import { CSSProperties, ReactNode } from "react";

import { useTheme } from "../../../main";

import styles from "./styles.module.css";

type CarouselCardProps = {
  /**
   * The background color of the upper part of the card. Defaults to the theme primary dark color.
   */
  backgroundColor?: string;

  /**
   * An optional image to display inside the upper part of the card.
   */
  imageComponent?: ReactNode;

  /**
   * The title text to display on the lower part of the card.
   */
  title: string;

  /**
   * The description text to display on the lower part of the card.
   */
  description: string;

  /**
   * Optional styles to apply to the background of the upper part of the card.
   */
  backgroundStyle?: CSSProperties;

  /**
   * Optional styles to apply to the root of the card.
   */
  style?: CSSProperties;
};

/**
 * A single card to display in the Carousel component.
 */
export function CarouselCard(props: CarouselCardProps) {
  const { colors } = useTheme();
  const backgroundColor = props.backgroundColor ?? colors.primary_dark;

  return (
    <div className={styles.root} style={props.style}>
      <div className={styles.image} style={{ backgroundColor, ...props.backgroundStyle }}>
        {props.imageComponent ?? null}
      </div>
      <div className={styles.textContainer}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.description}>{props.description}</p>
      </div>
    </div>
  );
}
