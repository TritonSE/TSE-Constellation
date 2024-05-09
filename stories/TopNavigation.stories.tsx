import { TopNavigation } from "../lib/main";
import { TextField } from "../lib/molecules/Input/TextField";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/TopNavigation",
  component: TopNavigation,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    logoSrc:
      "https://raw.githubusercontent.com/TritonSE/TSE-Constellation/main/public/constellation.png",
    navItems: [
      {
        label: "Dashboard",
        path: "",
        icon: "ic_cart",
      },
      {
        label: "Search",
        path: "",
        icon: "ic_search",
      },
      {
        label: "Settings",
        path: "",
        icon: "ic_settings",
      },
      {
        label: "Help",
        path: "",
        icon: "ic_help",
      },
    ],
    renderLink: (_, className, children) => <a className={className}>{children}</a>,
  },
} satisfies Meta<typeof TopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * Default top navigation
 */
export const Default: Story = {};

/**
 * A top navigation with a custom component that renders on the right side of the navigation.
 */
export const ActionElement: Story = {
  args: {
    actionElement: <TextField placeholder="Search" />,
  },
};

/**
 * On mobile viewports, the component appears as a bottom tab bar. Click on the
 * "Mobile Navbar" story in the sidebar to see this in action.
 */
export const MobileNavbar: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
};
