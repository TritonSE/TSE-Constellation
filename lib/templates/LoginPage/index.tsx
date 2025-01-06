import { ReactNode, useState } from "react";

import { useDevice } from "../../hooks/useDevice";
import { Button, Icon, TextField, useTheme } from "../../main";

import styles from "./styles.module.css";

export type LoginPageVariant = "signin" | "signup" | "resetpassword";

export type LoginFormFields = {
  name?: string;
  email?: string;
  password?: string;
};

export type LoginPageProps = {
  /**
   * The nonprofit's logo, to display on the left side
   */
  nonprofitLogo: ReactNode;

  /**
   * The nonprofit's name, to display at the top of the page
   */
  nonprofitName: string;

  /**
   * The variant of the page (sign in/sign up/reset password)
   */
  variant: LoginPageVariant;

  /**
   * Callback invoked when the variant of the page changes
   */
  onVariantChanged: (newVariant: LoginPageVariant) => unknown;

  /**
   * Callback to validate the full name the user entered, returning
   * a string error message or null if there is no error
   */
  validateName?: (name: string) => string | null;

  /**
   * Callback to validate the email address the user entered, returning
   * a string error message or null if there is no error
   */
  validateEmail?: (email: string) => string | null;

  /**
   * Callback to validate the password the user entered, returning
   * a string error message or null if there is no error
   */
  validatePassword?: (password: string) => string | null;

  /**
   * Callback invoked when the form is submitted, if there are no errors
   * @param fields The current form fields (values the user has entered)
   */
  onSubmit: (fields: LoginFormFields) => unknown;
};

/**
 * A login page template, that can show either a sign in, sign up,
 * or reset password flow, depending on the variant.
 */
export function LoginPage(props: LoginPageProps) {
  const {
    nonprofitLogo,
    nonprofitName,
    variant,
    onVariantChanged,
    validateName,
    validateEmail,
    validatePassword,
    onSubmit,
  } = props;

  const { colors } = useTheme();

  const title =
    variant === "signin"
      ? "Log In"
      : variant === "signup"
        ? "Create An Account"
        : "Forgot Password?";

  const caption =
    variant === "signin"
      ? "Don't have an account?"
      : variant === "signup"
        ? "Already have an account?"
        : "Remembered your password?";

  const captionActionText = variant === "signin" ? "Sign Up" : "Log In";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showingPassword, setShowingPassword] = useState(false);
  const [showingConfirmPassword, setShowingConfirmPassword] = useState(false);

  const { width } = useDevice();
  const isMobile = width <= 550;

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const setError = (field: string, value: string | null) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: value,
    }));
  };

  const renderCaptionRow = () => (
    <div className={styles.captionRow}>
      <p className={styles.caption}>{caption}</p>
      <p
        className={styles.captionAction}
        onClick={() => onVariantChanged(variant === "signin" ? "signup" : "signin")}
      >
        {captionActionText}
      </p>
    </div>
  );

  return (
    <div className={styles.root}>
      {nonprofitLogo}
      <div className={styles.rightColumn}>
        {variant === "resetpassword" ? (
          <div className={styles.backLink} onClick={() => onVariantChanged("signin")}>
            <Icon name="ic_arrowback" fill={colors.primary_dark} />
            <p className={styles.backText}>Back to Sign In</p>
          </div>
        ) : (
          <p className={styles.nonprofitName}>{nonprofitName}</p>
        )}
        <p className={styles.title}>{title}</p>
        {isMobile ? null : renderCaptionRow()}
        <div className={styles.textFieldsContainer}>
          {variant === "signup" ? (
            <TextField
              label="Full Name"
              errorText={errors.name ?? ""}
              placeholder="Enter your full name"
              value={name}
              onChange={(newName) => {
                setError("name", validateName?.(newName) ?? null);
                setName(newName);
              }}
            />
          ) : null}
          <TextField
            label="Email Address"
            errorText={errors.email ?? ""}
            placeholder="Enter email"
            value={email}
            onChange={(newEmail) => {
              setError("email", validateEmail?.(newEmail) ?? null);
              setEmail(newEmail);
            }}
          />
          {variant === "signin" || variant === "signup" ? (
            <TextField
              type={showingPassword ? "text" : "password"}
              label="Password"
              errorText={errors.password ?? ""}
              placeholder="Enter password"
              value={password}
              onChange={(newPassword) => {
                setError("password", validatePassword?.(newPassword) ?? null);
                if (variant === "signup") {
                  setError(
                    "confirmPassword",
                    confirmPassword === newPassword ? null : "Passwords don't match",
                  );
                }
                setPassword(newPassword);
              }}
              endIcon={
                <Button
                  className={styles.passwordButton}
                  onClick={() => {
                    setShowingPassword(!showingPassword);
                  }}
                  variant="secondary"
                >
                  <Icon
                    name={showingPassword ? "ic_show" : "ic_hide"}
                    size={isMobile ? 18 : 24}
                    fill={colors.gray_5}
                  />
                </Button>
              }
            />
          ) : null}
          {variant === "signup" ? (
            <TextField
              type={showingConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              errorText={errors.confirmPassword ?? ""}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(newConfirmPassword) => {
                setError(
                  "confirmPassword",
                  newConfirmPassword === password ? null : "Passwords don't match",
                );
                setConfirmPassword(newConfirmPassword);
              }}
              endIcon={
                <Button
                  className={styles.passwordButton}
                  onClick={() => {
                    setShowingConfirmPassword(!showingConfirmPassword);
                  }}
                  variant="secondary"
                >
                  <Icon
                    name={showingConfirmPassword ? "ic_show" : "ic_hide"}
                    size={isMobile ? 18 : 24}
                    fill={colors.gray_5}
                  />
                </Button>
              }
            />
          ) : null}
        </div>
        {variant === "signin" ? (
          <p className={styles.forgotPassword} onClick={() => onVariantChanged("resetpassword")}>
            Forgot Password?
          </p>
        ) : null}
        <Button
          className={styles.submitButton}
          onClick={() => {
            if (errors.name ?? errors.email ?? errors.password ?? errors.confirmPassword) {
              return;
            }
            // Check for errors on fields that might not have been changed yet
            let anyErrors = false;
            if (variant === "signup" && validateName?.(name)) {
              anyErrors = true;
              setError("name", validateName(name));
            }
            if (validateEmail?.(email)) {
              anyErrors = true;
              setError("email", validateEmail(email));
            }
            if (validatePassword?.(password)) {
              anyErrors = true;
              setError("password", validatePassword(password));
            }
            if (variant === "signup" && password !== confirmPassword) {
              anyErrors = true;
              setError("confirmPassword", "Passwords don't match");
            }

            if (anyErrors) {
              return;
            }

            onSubmit({ name, email, password });
          }}
        >
          Continue
        </Button>
        {isMobile ? renderCaptionRow() : null}
      </div>
    </div>
  );
}
