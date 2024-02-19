import { useEffect } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../common';
import styles from './styles.module.css';

export interface TextFieldProps extends CommonInputProps {
  // Placeholder text
  placeholder?: string;
}

export function TextField(props: TextFieldProps) {
  const { label, errorText, caption, disabled, name, placeholder } = props;

  const theme = useTheme();

  // Update our highlight color when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--highlight-color',
      theme.colors.secondary_highlight_1
    );
  }, [theme]);

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        name={name}
        className={styles.input}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          border: `1px solid ${theme.colors.gray_2}`
        }}
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
