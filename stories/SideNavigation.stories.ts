import { SideNavigation } from "../lib/organisms/Navigation/SideNavigation";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Organisms/SideNavigation",
  component: SideNavigation,
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  args: {
    logoSrc:
      "https://raw.githubusercontent.com/TritonSE/TSE-Constellation/main/public/constellation.png",
    navItems: [
      "Section header",
      {
        label: "Dashboard",
        onClick: () => [],
        icon: "ic_cart",
      },
      {
        label: "Search",
        onClick: () => [],
        icon: "ic_search",
      },
      "Section header",
      {
        label: "Settings",
        onClick: () => [],
        icon: "ic_settings",
      },
      "Section header",
      {
        label: "Help",
        onClick: () => [],
        icon: "ic_help",
      },
    ],
  },
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

/**
 * Default side navigation
 */
export const Default: Story = {};

/**
 * On mobile viewports, the component appears as a hamburger menu that slides in
 * from the right when toggled. Click on the
 * "Mobile Navbar" story in the sidebar to see this in action.
 */
export const MobileNavbar: Story = {
  parameters: { viewport: { defaultViewport: "mobile2" } },
};
