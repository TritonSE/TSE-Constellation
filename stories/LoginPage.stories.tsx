import { useState } from "react";

import useDevice from "../lib/internal/hooks/useDevice";
import { LoginPage } from "../lib/main";
import { LoginPageProps, LoginPageVariant } from "../lib/templates/LoginPage";

import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Templates/LoginPage",
  component: LoginPage,
  args: {},
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const dummyMethod = () => {
  return 1;
};

/**
 * A sign-in login page
 */
export const SignIn: Story = {
  args: {
    nonprofitLogo: (
      <img src="/nonprofit_checkered.svg" alt="Checkered image" width={360} height={450} />
    ),
    nonprofitName: "Nonprofit Name",
    variant: "signin",
    onVariantChanged: dummyMethod,
    validateEmail: (email) => (email.includes("@") ? null : "Must be a valid email address"),
    validateName: (name) => (name === "invalid" ? "Name is invalid" : null),
    validatePassword: (password) =>
      password.length >= 6 ? null : "Password must be at least 6 characters",
    onSubmit: dummyMethod,
  },
};

/**
 * A sign-up login page
 */
export const SignUp: Story = {
  args: {
    nonprofitLogo: (
      <img src="/nonprofit_checkered.svg" alt="Checkered image" width={360} height={450} />
    ),
    nonprofitName: "Nonprofit Name",
    variant: "signup",
    onVariantChanged: dummyMethod,
    validateEmail: (email) => (email.includes("@") ? null : "Must be a valid email address"),
    validateName: (name) => (name === "invalid" ? "Name is invalid" : null),
    validatePassword: (password) =>
      password.length >= 6 ? null : "Password must be at least 6 characters",
    onSubmit: dummyMethod,
  },
};

/**
 * A reset password login page
 */
export const ResetPassword: Story = {
  args: {
    nonprofitLogo: (
      <img src="/nonprofit_checkered.svg" alt="Checkered image" width={360} height={450} />
    ),
    nonprofitName: "Nonprofit Name",
    variant: "resetpassword",
    onVariantChanged: dummyMethod,
    validateEmail: (email) => (email.includes("@") ? null : "Must be a valid email address"),
    validateName: (name) => (name === "invalid" ? "Name is invalid" : null),
    validatePassword: (password) =>
      password.length >= 6 ? null : "Password must be at least 6 characters",
    onSubmit: dummyMethod,
  },
};

const VariantControllableStory = (args: LoginPageProps) => {
  const [variant, setVariant] = useState<LoginPageVariant>("signin");

  const { width } = useDevice();

  return (
    <LoginPage
      {...args}
      variant={variant}
      onVariantChanged={setVariant}
      nonprofitLogo={
        <img
          src="/nonprofit_checkered.svg"
          alt="Checkered image"
          width={width < 550 ? 100 : 360}
          height={width < 550 ? 100 : 450}
        />
      }
    />
  );
};

/**
 * A login page where the variant is controllable
 */
export const VariantControllable: Story = {
  render: VariantControllableStory,
  args: {
    nonprofitLogo: null,
    nonprofitName: "Nonprofit Name",
    variant: "resetpassword",
    onVariantChanged: dummyMethod,
    validateEmail: (email) => (email.includes("@") ? null : "Must be a valid email address"),
    validateName: (name) => (name === "invalid" ? "Name is invalid" : null),
    validatePassword: (password) =>
      password.length >= 6 ? null : "Password must be at least 6 characters",
    onSubmit: dummyMethod,
  },
};
