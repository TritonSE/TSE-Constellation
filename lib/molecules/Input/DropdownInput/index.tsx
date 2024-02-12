import { Key, useMemo, useState } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../CommonInput';
import styles from './styles.module.css';
import { Icon } from '../../../main';

export interface DropdownInputOption {
  label: string;
  value?: unknown;
}

export interface DropdownInputProps extends CommonInputProps {
  // Placeholder text
  placeholder?: string;

  options: DropdownInputOption[];

  value?: unknown;

  onChange: (newValue: unknown) => unknown;
}

export function DropdownInput(props: DropdownInputProps) {
  const {
    label,
    placeholder,
    errorText,
    caption,
    disabled,
    options,
    value,
    onChange
  } = props;

  const theme = useTheme();

  const [selectedOption, setSelectedOption] = useState(value);
  const [expanded, setExpanded] = useState(false);

  const selectedLabel = useMemo(
    () =>
      options.find(
        (option) => (option.value ?? option.label) === selectedOption
      )?.label ?? placeholder,
    [selectedOption, placeholder, options]
  );

  const getOptionValue = (option: DropdownInputOption) =>
    option.value ?? option.label;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.text}>{label}</label>
      <div
        className={styles.inputBox}
        style={{ border: `1px solid ${theme.colors.gray_2}` }}
        onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
      >
        <p
          className={styles.text}
          style={
            selectedLabel === placeholder ? { color: theme.colors.gray_3 } : {}
          }
        >
          {selectedLabel}
        </p>
        <Icon
          name={expanded ? 'ic_caretfill_up' : 'ic_caretfill_down'}
          fill={theme.colors.gray_2}
          stroke="none"
          size={14}
        />
      </div>

      {expanded ? (
        <ul
          className={styles.list}
          style={{
            border: `1px solid ${theme.colors.gray_2}`,
            borderTopWidth: 0
          }}
        >
          {options.map((option) => (
            <li
              key={getOptionValue(option) as Key}
              onClick={() => {
                setSelectedOption(getOptionValue(option));
                onChange(getOptionValue(option));
                setExpanded(false);
              }}
            >
              <div className={styles.optionContainer}>
                <p className={styles.text}>{option.label}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      <p
        className={styles.caption}
        style={errorText ? { color: theme.colors.error } : {}}
      >
        {errorText ?? caption}
      </p>
    </div>
  );
}
