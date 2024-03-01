import styles from "./styles.module.css";

export type LoadingSpinnerProps = {
  /**
   * The width and height of the spinner in pixels
   */
  size?: number;
};

/**
 * A loading spinner that indicates stuff is happening.
 */
export function LoadingSpinner({ size = 48 }: LoadingSpinnerProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={styles.spinner}
    ></div>
  );
}
