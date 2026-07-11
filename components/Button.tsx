import * as React from "react";
import { cx } from "./cx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

/** Token-driven button. Primary carries the signature glow. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        "krk-btn",
        `krk-btn--${variant}`,
        size === "sm" && "krk-btn--sm",
        className
      )}
      {...props}
    />
  );
}
