import { ReactNode, useEffect, useState } from "react";

import { useTheme } from "../../assets/ThemeProvider";
import { Button, Icon } from "../../main";

import styles from "./styles.module.css";

type CarouselProps = {
  // The cards to display in the carousel. Should be an array of CarouselCard components.
  carouselCards: ReactNode[];
};

/**
 * A carousel that displays cards in a row and can be scrolled to view different cards.
 */
export function Carousel(props: CarouselProps) {
  const { carouselCards } = props;
  const { colors } = useTheme();

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
  const numScrollPositions = Math.max(1, carouselCards.length - numCardsOnScreen + 1);

  // The current item index
  const [scrollPosition, setScrollPosition] = useState(0);

  // Whether we can go forward or back (are not at end/start of cards respectively)
  const canScrollBack = scrollPosition !== 0;
  const canScrollForward = scrollPosition !== numScrollPositions - 1;

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <Button
          className={styles.arrowButton}
          style={{ backgroundColor: canScrollBack ? colors.black : colors.disabled }}
          onClick={() => {
            setScrollPosition(canScrollBack ? scrollPosition - 1 : scrollPosition);
          }}
          disabled={!canScrollBack}
        >
          <Icon name="ic_caretleft" foregroundColor={colors.white} />
        </Button>
        <div className={styles.cardsContainer}>
          {props.carouselCards.slice(scrollPosition, scrollPosition + numCardsOnScreen)}
        </div>
        <Button
          className={styles.arrowButton}
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
