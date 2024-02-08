import { PropsWithChildren } from "react";
import { Button, ButtonProps } from "../../lib/atoms/Button";
import styles from "./styles.module.css";

const testProps: ButtonProps[] = [
  {},
  { small: true },
  { variant: "secondary" },
  { variant: "secondary", small: true },
  { variant: "secondary", destructive: true },
  { variant: "secondary", small: true, destructive: true },
  { destructive: true },
  { destructive: true, small: true },
  { variant: "tag" },
];

const Label = ({ children }: PropsWithChildren) => {
  return <div className={styles.label}>{children}</div>;
};

const PropsLabel = ({ variant, destructive, small }: ButtonProps) => {
  let text = "";
  if (!variant) text += "default";
  else text += variant;
  if (small) text += " small";
  if (destructive) text += " destructive";
  return <Label>{text}</Label>;
};

export const ButtonTest = () => {
  return (
    <div className={styles.column}>
      <h1>Buttons!</h1>
      <div className={styles.grid}>
        <Label>{/* empty label */}</Label>
        {/* Labels for props */}
        {testProps.map((props, i) => (
          <PropsLabel key={i} {...props} />
        ))}
        {/* First column of buttons */}
        <Label>Default</Label>
        {testProps.map((props, i) => (
          <Button key={i} {...props}>
            Button
          </Button>
        ))}
        {/* Second column of buttons (deactivated) */}
        <Label>Deactivated</Label>
        {testProps.map((props, i) => (
          <Button key={i} {...props} disabled>
            Button
          </Button>
        ))}
      </div>
    </div>
  );
};
