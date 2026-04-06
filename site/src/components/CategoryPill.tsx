"use client";

interface CategoryPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function CategoryPill({
  label,
  active = false,
  onClick,
}: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-[0.875rem] font-body font-semibold tracking-[0.02em] leading-[1.5] transition-colors ${
        active
          ? "bg-accent-primary text-text-light"
          : "bg-surface-secondary text-text-primary hover:bg-accent-primary/20"
      }`}
    >
      {label}
    </button>
  );
}
