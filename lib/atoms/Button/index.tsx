import { useTheme } from '../../ThemeProvider';
import styles from './styles.module.css';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { style, className, ...restProps } = props;
  const { colors } = useTheme();

  return <button
    style={{
      backgroundColor: colors.primary,
      ...style
    }}
    className={`${className} ${styles.button}`}
    {...restProps}
  />;
}
