import React from "react";
import type { Preview } from "@storybook/react";
import DocumentationTemplate from "./DocumentationTemplate.mdx";
import { ThemeProvider } from "../lib/assets/ThemeProvider";
import { previewTheme } from "./theme";

const preview: Preview = {
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      theme: previewTheme,
      page: DocumentationTemplate,
    },
    options: {
      storySort: {
        order: ["Atoms", "Molecules", "Organisms"],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
