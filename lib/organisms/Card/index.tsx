import { CSSProperties, ReactNode } from "react";

import { useTheme } from "../../assets/ThemeProvider";
import { Icon } from "../../main";

import styles from "./styles.module.css";

export type CardProps = {
  /**
   * The contents to render inside the card
   */
  contents: ReactNode;

  /**
   * Optional CSS class to apply to root of card
   */
  className?: string;

  /**
   * Optional CSS styles to apply to root of card
   */
  style?: CSSProperties;
};

/**
 * A base card component that displays arbitrary contents inside a card
 */
export function Card(props: CardProps) {
  const { contents, style, className } = props;

  return (
    <div className={`${styles.root} ${className ?? ""}`} style={style}>
      {contents}
    </div>
  );
}

/**
 * A single section to display in a section card
 */
export type CardSection = {
  /**
   * Optional checkbox to display on left side of section
   */
  checkbox?: ReactNode;

  /**
   * Title for section
   */
  title: string | ReactNode;

  /**
   * Content text of section
   */
  content?: string | ReactNode;
};

export type SectionCardProps = {
  /**
   * The title of the card
   */
  title: string | ReactNode;

  /**
   * The text content of the card
   */
  content: string | ReactNode;

  /**
   * The sections to display on the card
   */
  sections: CardSection[];

  /**
   * Optional CSS class to apply to root of card
   */
  className?: string;

  /**
   * Optional CSS styles to apply to root of card
   */
  style?: CSSProperties;
};

/**
 * A card that displays a title, subtitle, and a list of sections
 */
export function SectionCard(props: SectionCardProps) {
  const { title, content, sections, ...restProps } = props;

  return (
    <Card
      {...restProps}
      contents={
        <>
          <p className={`${styles.title} ${styles.sectionTitle}`}>{title}</p>
          <p className={styles.content}>{content}</p>
          {sections.map((section, index) => (
            <div key={index} className={styles.row}>
              {section.checkbox ?? null}
              <div className={styles.sectionColumn}>
                {section.title ? <p className={styles.sectionTitle}>{section.title}</p> : null}
                {section.content ? <p className={styles.content}>{section.content}</p> : null}
              </div>
            </div>
          ))}
        </>
      }
    />
  );
}

export type ProfileCardProps = {
  /**
   * The profile picture image components to display
   */
  images: ReactNode[];

  /**
   * The name to display
   */
  name?: string | ReactNode;

  /**
   * The text content to display
   */
  content?: string | ReactNode;

  /**
   * Optional action (e.g. button) to display below the name and content
   */
  action?: ReactNode;

  /**
   * Optional CSS class to apply to root of card
   */
  className?: string;

  /**
   * Optional CSS styles to apply to root of card
   */
  style?: CSSProperties;
};

/**
 * A card that displays one or more profile pictures and additional profile information
 */
export function ProfileCard(props: ProfileCardProps) {
  const { images, name, content, action, ...restProps } = props;

  return (
    <Card
      {...restProps}
      contents={
        <div className={styles.row}>
          {images.length === 1 ? (
            <>
              {images[0]}
              <div className={styles.profileColumn}>
                {name ? <p className={`${styles.title} ${styles.profileTitle}`}>{name}</p> : null}
                {content ? <p className={styles.content}>{content}</p> : null}
                {action ?? null}
              </div>
            </>
          ) : (
            images
          )}
        </div>
      }
    />
  );
}

export type RatingCardProps = {
  /**
   * The number of stars to display
   */
  numStars: number;

  /**
   * The rating text to display
   */
  ratingText: string | ReactNode;

  /**
   * Optional CSS class to apply to root of card
   */
  className?: string;

  /**
   * Optional CSS styles to apply to root of card
   */
  style?: CSSProperties;
};

/**
 * A card that renders a rating of some number of stars and some text
 */
export function RatingCard(props: RatingCardProps) {
  const { numStars, ratingText, ...restProps } = props;
  const { colors } = useTheme();

  return (
    <Card
      {...restProps}
      contents={
        <div className={styles.ratingRow}>
          <div className={styles.starsContainer}>
            {Array(numStars)
              .fill(true)
              .map((_, index) => (
                <Icon
                  key={index}
                  name="ic_star"
                  foregroundColor={colors.secondary_highlight_1}
                  size={16}
                />
              ))}
          </div>
          <p className={styles.ratingText}>{ratingText}</p>
        </div>
      }
    />
  );
}

export type ImageCardProps = {
  /**
   * The image component to display inside the card
   */
  image: ReactNode;

  /**
   * Optional CSS class to apply to root of card
   */
  className?: string;

  /**
   * Optional CSS styles to apply to root of card
   */
  style?: CSSProperties;
};

/**
 * A card that displays an image inside
 */
export function ImageCard(props: ImageCardProps) {
  const { image, ...restProps } = props;

  return <Card {...restProps} contents={image} />;
}
