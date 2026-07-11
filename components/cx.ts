/** Join class names, dropping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** A selectable option for chip/radio groups. */
export type Option<T extends string = string> = { value: T; label: string };
