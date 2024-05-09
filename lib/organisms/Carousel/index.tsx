import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

import { useTheme } from "../../assets/ThemeProvider";
import { Button, Icon } from "../../main";

import styles from "./styles.module.css";

type CarouselProps = {
  /**
   * The cards to display in the carousel. Should be an array of CarouselCard components.
   */
  carouselCards: ReactNode[];

  /**
   * Optional CSS class to apply to root of carousel
   */
  className?: string;

  /**
   * Optional CSS styles to apply to root of carousel
   */
  style?: CSSProperties;
};

/**
 * A carousel that displays cards in a row and can be scrolled to view different cards.
 */
export function Carousel(props: CarouselProps) {
  const { carouselCards } = props;
  const { colors } = useTheme();

  // Gap between cards, in pixels
  const CARD_GAP = 70;

  // Subscribe to screen width changes
  // https://www.altcademy.com/blog/how-to-check-screen-width-in-reactjs/#:~:text=Here's%20how%20we%20can%20do,innerWidth)%3B%20%7D%3B%20window.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // How many cards should be displayed on the screen at once (depends on screen width)
  const numCardsOnScreen = windowWidth <= 900 ? (windowWidth <= 650 ? 1 : 2) : 3;

  // How many positions can be clicked to
  const numScrollPositions = Math.max(
    1,
    Math.ceil(carouselCards.length / Math.max(numCardsOnScreen, 0)),
  );

  // The current item index
  const [scrollPosition, setScrollPosition] = useState(0);

  // Whether we can go forward or back (are not at end/start of cards respectively)
  const canScrollBack = scrollPosition !== 0;
  const canScrollForward = scrollPosition !== numScrollPositions - 1;

  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardsContainerRef.current || carouselCards.length === 0) {
      return;
    }

    // Calculate the width of each card, in pixels, by taking the scroll width of the container,
    // subtracting the gaps between cards, and dividing by the number of cards
    const cardWidth =
      (cardsContainerRef.current.scrollWidth - (carouselCards.length - 1) * CARD_GAP) /
      carouselCards.length;

    // The number of cards that are offscreen to the left (have been scrolled past)
    const numPrevCards = scrollPosition * numCardsOnScreen;

    cardsContainerRef.current?.scrollTo({
      // Find the total width of previous cards and the gaps between them
      left: numPrevCards * (cardWidth + CARD_GAP),
      behavior: "smooth",
    });
  }, [carouselCards, scrollPosition, cardsContainerRef.current, numCardsOnScreen]);

  return (
    <div className={`${styles.root} ${props.className}`} style={props.style}>
      <div className={styles.row}>
        <div className={styles.cardsContainer} ref={cardsContainerRef}>
          {props.carouselCards.map((card, index) => (
            <div
              key={index}
              style={{
                // Set the width on each card to take up an appropriate fraction of the scroll container
                minWidth: `calc(${100 / numCardsOnScreen}% - ${Math.ceil((CARD_GAP * (numCardsOnScreen - 1)) / numCardsOnScreen)}px)`,
              }}
            >
              {card}
            </div>
          ))}
        </div>

        <Button
          className={`${styles.arrowButton} ${styles.leftArrowButton}`}
          style={{ backgroundColor: canScrollBack ? colors.black : colors.disabled }}
          onClick={() => {
            setScrollPosition(canScrollBack ? scrollPosition - 1 : scrollPosition);
          }}
          disabled={!canScrollBack}
        >
          <Icon name="ic_caretleft" foregroundColor={colors.white} />
        </Button>
        <Button
          className={`${styles.arrowButton} ${styles.rightArrowButton}`}
          style={{ backgroundColor: canScrollForward ? colors.black : colors.disabled }}
          onClick={() => {
            setScrollPosition(canScrollForward ? scrollPosition + 1 : scrollPosition);
          }}
          disabled={!canScrollForward}
        >
          <Icon name="ic_caretright" foregroundColor={colors.white} />
        </Button>
      </div>
      <div className={styles.dotsContainer}>
        {Array(numScrollPositions)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className={styles.dot}
              style={{ backgroundColor: index === scrollPosition ? colors.black : colors.disabled }}
              onClick={() => {
                setScrollPosition(index);
              }}
            />
          ))}
      </div>
    </div>
  );
}
