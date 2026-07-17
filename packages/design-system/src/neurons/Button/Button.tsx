import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import type { ButtonVariant } from "./Button.variant";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", className, ...rest }: ButtonProps) {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;
  const classes = [styles.button, variantClass, className].filter(Boolean).join(" ");

  return <button className={classes} {...rest} />;
}
