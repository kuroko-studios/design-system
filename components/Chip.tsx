import * as React from "react";
import { cx, type Option } from "./cx";

/* Controlled selection components. State lives in the consumer (value + onChange). */

export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cx("krk-chip", selected && "is-on")}
    >
      {label}
    </button>
  );
}

export function OptionRow({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cx("krk-option", selected && "is-on")}
    >
      {label}
    </button>
  );
}

export function ChipMulti({
  options,
  value,
  onChange,
}: {
  options: readonly Option[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div className="krk-chip-group">
      {options.map((o) => (
        <Chip
          key={o.value}
          label={o.label}
          selected={value.includes(o.value)}
          onClick={() => toggle(o.value)}
        />
      ))}
    </div>
  );
}

export function ChipSingle({
  options,
  value,
  onChange,
}: {
  options: readonly Option[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  return (
    <div className="krk-chip-group">
      {options.map((o) => (
        <Chip
          key={o.value}
          label={o.label}
          selected={value === o.value}
          onClick={() => onChange(value === o.value ? null : o.value)}
        />
      ))}
    </div>
  );
}

export function OptionGroup({
  options,
  value,
  onChange,
}: {
  options: readonly Option[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  return (
    <div className="krk-option-group">
      {options.map((o) => (
        <OptionRow
          key={o.value}
          label={o.label}
          selected={value === o.value}
          onClick={() => onChange(value === o.value ? null : o.value)}
        />
      ))}
    </div>
  );
}
