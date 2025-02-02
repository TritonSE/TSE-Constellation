/**
 * A global context used for theme configuration.
 * Provides a simplified wrapper around React context hooks.
 */

import { PropsWithChildren, useEffect } from "react";
import "./globals.css";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = RGB | RGBA | HEX;
export type ThemeColors = {
  /** Primary colors */
  primary_light: Color;
  primary_dark: Color;

  /** Secondary colors */
  secondary_accent_1: Color;
  secondary_accent_2: Color;

  secondary_highlight_1: Color;
  secondary_highlight_2: Color;

  /** Tertiary accent colors */
  tertiary_accent_1: Color;
  tertiary_accent_2: Color;
  tertiary_accent_3: Color;

  /** Functional colors */
  background: Color;
  surface: Color;
  success: Color;
  error: Color;
  disabled: Color;

  /** Neutral colors */
  white: Color;
  gray_0: Color;
  gray_1: Color;
  gray_2: Color;
  gray_3: Color;
  gray_4: Color;
  gray_5: Color;
  gray_6: Color;
  black: Color;
};
export type ThemeFonts = {
  primary: string;
  secondary: string;
};
export type Theme = {
  colors: ThemeColors;
  fonts: ThemeFonts;
};
export type ThemeProviderProps = {
  colors?: Partial<ThemeColors>;
  fonts?: Partial<ThemeFonts>;
  fontInject?: string;
};

// Default theme specified by the design system Figma.
export const defaultTheme: Theme = {
  colors: {
    primary_light: "#FCF6E5", // Light off-white
    primary_dark: "#0C2B35", // TSE dark blue
    secondary_accent_1: "#153641", // Lighter variant of primary
    secondary_accent_2: "#EEE8D7", // Off-white
    secondary_highlight_1: "#DEBB01", // Gold
    secondary_highlight_2: "#428BCD", // Baby blue
    tertiary_accent_1: "#CEDCDC", // Light gray
    tertiary_accent_2: "#96A1A1", // Medium gray
    tertiary_accent_3: "#697B82", // Dark gray
    background: "#F9F9F9", // Slight off-white
    surface: "#FFFFFF", // White
    success: "#3BB966", // Green
    error: "#B93B3B", // Red
    disabled: "#D8D8D8", // Gray
    white: "#FFFFFF",
    gray_0: "#F3F3F3",
    gray_1: "#EBEBEB",
    gray_2: "#D8D8D8",
    gray_3: "#B4B4B4",
    gray_4: "#909090",
    gray_5: "#6C6C6C",
    gray_6: "#484848",
    black: "#000000",
  },
  fonts: {
    primary:
      '"Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    secondary:
      '"IBM Plex Mono", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
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
  const { fonts, fontInject, colors, children } = props;

  useEffect(() => {
    if (document.body.dataset.tseInitialized === "true") return;

    activeTheme = {
      colors: {
        ...defaultTheme.colors,
        ...colors,
      },
      fonts: {
        ...defaultTheme.fonts,
        ...fonts,
      },
    };

    // Generate CSS variables from JS objects
    const cssColors = Object.entries(activeTheme.colors)
      .map(([type, value]) => `  --tse-constellation-color-${type.replace(/_/g, "-")}: ${value};`)
      .join("\n");
    const cssFonts = Object.entries(activeTheme.fonts)
      .map(([type, value]) => `  --tse-constellation-font-${type.replace(/_/g, "-")}: ${value};`)
      .join("\n");

    document.head.innerHTML += `${
      fontInject ??
      '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">'
    }
  <style>
  :root {
  ${cssColors}
  ${cssFonts}
  }
  </style>`;

    document.body.dataset.tseInitialized = "true";
  }, []);

  return children;
}
