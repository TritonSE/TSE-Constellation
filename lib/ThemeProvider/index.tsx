/**
 * A global context used for theme configuration.
 * Provides a simplified wrapper around React context hooks.
 */

import { PropsWithChildren } from 'react';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX;
export interface ThemeColors {
  primary: Color;
  secondary: Color;
  success: Color;
  warning: Color;
  error: Color;
}
export interface ThemeFonts {
  heading: string;
  text: string;
}
export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
}
export interface ThemeProviderProps {
  colors?: ThemeColors;
  fonts?: ThemeFonts;
}

// Default theme specified by the design system Figma.
export const defaultTheme: Theme = {
  colors: {
    primary: '#00FFFF',
    secondary: '#0000FF',
    success: '#00FF00',
    warning: '#FFFF00',
    error: '#FF0000'
  },
  fonts: {
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    text: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif'
  },
};

// Somewhat hacky global state mutation. Ideally contexts
// should be used, but there is some breakage with the way
// the library is packaged/injected.
let activeTheme = defaultTheme;
export function useTheme(): Theme {
  return activeTheme;
}

/**
 * Wrapper for providing theme to an application, meant to be used
 * at the top level of an application.
 * 
 * Takes `colors` and `fonts` as props, adding in any missing fields
 * using the `defaultTheme` object.
 */
export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
  const { fonts, colors, children } = props;
  activeTheme = {
      colors: {
        ...defaultTheme.colors,
        ...colors
      },
      fonts: {
        ...defaultTheme.fonts,
        ...fonts
      }
    };

  // Generate CSS variables from JS objects
  const cssColors = Object.entries(activeTheme.colors).map(([type, value]) => (`  --color-${type}: ${value};`)).join('\n');
  const cssFonts = Object.entries(activeTheme.fonts).map(([type, value]) => (`  --font-${type}: ${value};`)).join('\n');

  const css = `
:root {
${cssColors}
${cssFonts}
}
html {
  font-family: var(--font-text);
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
span, p, a, button, input {
  font-family: var(--font-text);
}
    `;

  return <>
    <style>{ css }</style>
    {children}
  </>;
}
