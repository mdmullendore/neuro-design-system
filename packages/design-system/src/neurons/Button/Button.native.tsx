import { Pressable, StyleSheet, Text, type PressableProps } from "react-native";
import { color, spacing, typography } from "@neuro/tokens";
import type { ButtonVariant } from "./Button.variant";

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  children?: string;
}

export function Button({ variant = "primary", disabled, children, style, ...rest }: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={(state) => [
        styles.button,
        variant === "primary" ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        state.pressed && styles.pressed,
        typeof style === "function" ? style(state) : style,
      ]}
      {...rest}
    >
      <Text style={variant === "primary" ? styles.textPrimary : styles.textSecondary}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg - 4,
  },
  primary: {
    backgroundColor: color.accent,
  },
  secondary: {
    backgroundColor: color.surface,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    opacity: 0.5,
  },
  textPrimary: {
    fontSize: typography.fontSizeMd,
    fontWeight: "600",
    color: "white",
  },
  textSecondary: {
    fontSize: typography.fontSizeMd,
    fontWeight: "600",
    color: color.textPrimary,
  },
});
