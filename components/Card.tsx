import * as React from "react";
import { cx } from "./cx";

/** Raised surface with a hairline border and subtle elevation. */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("krk-card", className)} {...props} />;
}
