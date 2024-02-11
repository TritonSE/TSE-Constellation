import { create } from "@storybook/theming/create";

const primaryLight = "#FCF6E5";
const primaryDark = "#0C2B35";
const secondaryHighlight = "#DEBB01";

export const managerTheme = create({
  base: "dark",
  brandTitle: "TSE Constellation",
  brandImage: "/constellation.png",

  // Typography
  fontBase: '"Rubik"',

  // Colors
  colorPrimary: primaryDark,
  colorSecondary: secondaryHighlight,

  // UI
  appBg: primaryDark,
  appContentBg: primaryDark,

  // Text colors
  textColor: primaryLight,
  textInverseColor: primaryDark,

  // Toolbar default and active colors
  barTextColor: primaryLight,
  barSelectedColor: secondaryHighlight,
  barBg: primaryDark,
});

export const previewTheme = create({
  base: "light",

  // Typography
  fontBase: '"Rubik"',
});
