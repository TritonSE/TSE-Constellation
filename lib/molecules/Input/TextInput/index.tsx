import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../CommonInput';
import styles from './styles.module.css';

export interface TextInputProps extends CommonInputProps {
  // Placeholder text
  placeholder?: string;
}

export function TextInput(props: TextInputProps) {
  const { label, errorText, caption, disabled, placeholder } = props;

  const theme = useTheme();

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
      ></input>
      <p
        className={styles.caption}
        style={errorText ? { color: theme.colors.error } : {}}
      >
        {errorText ?? caption}
      </p>
    </div>
  );
}
