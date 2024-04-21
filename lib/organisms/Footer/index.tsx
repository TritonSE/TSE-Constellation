import { useTheme } from "../../assets/ThemeProvider";
import { Icon } from "../../main";

import styles from "./styles.module.css";

export type FooterProps = {
  /**
   * Main color for the footer
   */
  mainColor?: string;

  /**
   * Background color for the footer
   */
  backgroundColor?: string;

  // Whether to display a dark icon (defaults to true)
  dark?: boolean;
};

/**
 * A footer to put on the bottom of the page to advertise TSE
 */
export function Footer(props: FooterProps) {
  const { colors } = useTheme();
  const mainColor = props.mainColor ?? colors.primary_dark;
  const backgroundColor = props.backgroundColor ?? colors.white;

  return (
    <div className={styles.root} style={{ backgroundColor }}>
      <Icon
        name={props.dark === false ? "ic_tse_lightbulb_light" : "ic_tse_lightbulb_dark"}
        size={32}
        foregroundColor={"red"}
        backgroundColor={"red"}
      />
      <p
        className={styles.text}
        style={{
          color: mainColor,
        }}
      >
        Built for free by{" "}
        <a
          href="https://tse.ucsd.edu/"
          style={{
            color: mainColor,
          }}
        >
          Triton Software Engineering
        </a>
      </p>
    </div>
  );
}
