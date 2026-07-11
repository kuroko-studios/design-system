import * as React from "react";
import { cx } from "./cx";

export type BadgeTone = "neutral" | "accent" | "ok" | "warning" | "danger";

/** Pill badge. Tone maps to the status/accent token roles. */
export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cx("krk-badge", `krk-badge--${tone}`, className)}
      {...props}
    />
  );
}
