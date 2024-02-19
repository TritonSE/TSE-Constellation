import { Key, MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../../assets/ThemeProvider';
import { CommonInputProps } from '../common';
import styles from './styles.module.css';
import { Icon } from '../../../main';
import { Anchor } from '../../../internal/Anchor';

export interface DropdownOption<T> {
  label: string;
  value?: T;
}

export interface DropdownProps<T> extends CommonInputProps {
  // Placeholder text
  placeholder?: string;

  options: DropdownOption<T>[];

  value?: T;

  onChange: (newValue: unknown) => unknown;
}

export function Dropdown<T>(props: DropdownProps<T>) {
  const {
    label,
    placeholder,
    errorText,
    caption,
    disabled,
    name,
    options,
    value,
    onChange
  } = props;

  const theme = useTheme();

  const [selectedOption, setSelectedOption] = useState(value ?? ('' as T));
  const [expanded, setExpanded] = useState(false);

  const selectedLabel = useMemo(
    () =>
      options.find(
        (option) => (option.value ?? option.label) === selectedOption
      )?.label ?? placeholder,
    [selectedOption, placeholder, options]
  );

  // Update our highlight color when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--highlight-color',
      theme.colors.secondary_highlight_1
    );
  }, [theme]);

  const getOptionValue = (option: DropdownOption<T>) =>
    option.value ?? option.label;

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleInputClick = (e: MouseEvent) => {
    if (disabled) {
      return;
    }

    // Stop event propagation so it doesn't trigger Anchor component closing
    e.stopPropagation();
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleOptionClick = (option: DropdownOption<T>) => {
    if (disabled) {
      return;
    }

    setSelectedOption(getOptionValue(option) as T);
    onChange(getOptionValue(option));
    setExpanded(false);
  };

  // Update our hover backgorund color when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--hover-background-color',
      theme.colors.gray_1
    );
  }, [theme]);

  return (
    <div className={styles.inputContainer}>
      <label className={styles.text}>{label}</label>
      <div
        className={styles.inputBox}
        style={
          disabled
            ? {
                // Disabled styles copied from browser defaults for disabled input element
                border: '1px solid rgba(118, 118, 118, 0.3)',
                backgroundColor: 'rgba(239, 239, 239, 0.3)',
                color: 'rgb(84, 84, 84)'
              }
            : {
                border: `1px solid ${theme.colors.gray_2}`
              }
        }
        onClick={handleInputClick}
        ref={dropdownRef}
        tabIndex={0}
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

      <Anchor
        open={expanded}
        onClose={() => setExpanded(false)}
        anchorElement={dropdownRef.current!}
        placement="bottom"
      >
        <div className={styles.listContainer}>
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
                onClick={() => handleOptionClick(option)}
              >
                <div className={styles.optionContainer}>
                  <p
                    className={styles.text}
                    style={
                      // Selected option should have gold text in options menu
                      getOptionValue(option) === selectedOption
                        ? { color: theme.colors.secondary_highlight_1 }
                        : {}
                    }
                  >
                    {option.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Anchor>

      <p
        className={styles.caption}
        style={errorText ? { color: theme.colors.error } : {}}
      >
        {errorText ?? caption}
      </p>
      {/** Display a hidden input element with the current value of the input.
       * This enables developers to access the value of this field in a form
       * by setting the "name" property. This is a bit hacky, but is necessary
       * since the dropdown itself is not an input element.
       */}
      <input name={name} type="hidden" value={selectedOption as any} />
    </div>
  );
}
