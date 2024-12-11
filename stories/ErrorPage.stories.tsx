import { LoadingSpinner } from "../lib/atoms/LoadingSpinner";
import { ErrorPage, Footer, TopNavigation } from "../lib/main";

import type { Meta, StoryObj } from "@storybook/react";

const navbar = (
  <TopNavigation
    navItems={[
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
    ]}
    logoSrc="https://raw.githubusercontent.com/TritonSE/TSE-Constellation/main/public/constellation.png"
    renderLink={(_, className, children, key) => (
      <a key={key} className={className}>
        {children}
      </a>
    )}
  />
);

const footer = <Footer />;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Templates/ErrorPage",
  component: ErrorPage,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    navbar: {
      options: ["None", "Default Navbar"],
      mapping: {
        None: undefined,
        "Default Navbar": navbar,
      },
    },
    footer: {
      options: ["None", "Default Footer"],
      mapping: {
        None: undefined,
        "Default Footer": footer,
      },
    },
  },
  args: {
    navbar,
    footer,
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const PageNotFound: Story = {
  args: {
    icon: "ic_search",
    errorHeader: "Page Not Found",
    errorMessage: "Sorry, we couldn't find the page you're looking for.",
    errorCode: "404",
  },
};

/**
 * An error page indicating that the user is not connected to the internet.
 */
export const NoInternetConnection: Story = {
  args: {
    icon: "ic_no_internet",
    errorHeader: "No Internet Connection",
    errorMessage: "Please check your internet connection and try again.",
    errorCode: "503",
  },
};

/**
 * An error page indicating that the user does not have permission to access a page.
 */
export const AccessDenied: Story = {
  args: {
    icon: "ic_cancel",
    errorHeader: "Access Denied",
    errorMessage: "It seems like you don't have permission to access this page.",
    errorCode: "403",
  },
};

/**
 * Prompt the user to wait.
 */
export const PleaseWait: Story = {
  args: {
    customIcon: <LoadingSpinner size={48} />,
    errorHeader: "Please Wait...",
  },
};

/**
 * Just a plain old error page. No navbar. No footer. :(
 */
export const BasicErrorPage = {
  args: {
    icon: "ic_cancel",
    errorHeader: "An Error Occurred",
    errorMessage: "Something went wrong. Please try again later.",
    navbar: undefined,
    footer: undefined,
  },
};
