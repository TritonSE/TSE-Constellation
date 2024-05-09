import { SideNavigation } from "../lib/main";

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
        path: "",
        icon: "ic_cart",
      },
      {
        label: "Search",
        path: "",
        icon: "ic_search",
      },
      "Section header",
      {
        label: "Settings",
        path: "",
        icon: "ic_settings",
      },
      "Section header",
      {
        label: "Help",
        path: "",
        icon: "ic_help",
      },
    ],
    renderLink: (_, className, children) => <a className={className}>{children}</a>,
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
