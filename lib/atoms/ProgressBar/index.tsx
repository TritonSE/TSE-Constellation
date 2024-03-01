import styles from "./styles.module.css";

export type ProgressBarProps = {
  /**
   * The percent progress of the bar, as a number between 0 and 100.
   */
  progress: number;
  /**
   * The width property of the entire bar (e.g. "100%", "500px", "50vw", etc.)
   */
  width?: string;
};

/**
 * A progress bar that indicates the progress of some process.
 */
export function ProgressBar({ progress, width = "900px" }: ProgressBarProps) {
  return (
    <div
      className={styles.container}
      style={{
        width,
      }}
    >
      <div
        className={styles.bar}
        style={{
          width: `${clamp(progress, 0, 100)}%`,
        }}
      />
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
