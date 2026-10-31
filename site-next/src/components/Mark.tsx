/** Marca JCC: os três losangos. */
export function Mark({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="12 10 40 52"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
      fill="currentColor"
    >
      <polygon points="40,10 52,22 40,34 28,22" />
      <polygon points="24,25 36,37 24,49 12,37" />
      <polygon points="40,36 52,48 40,60 28,48" />
    </svg>
  );
}
