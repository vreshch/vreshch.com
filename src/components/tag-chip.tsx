import Link from 'next/link';

export function TagChip({ tag }: { tag: string }) {
  return (
    <Link
      href={`/blog/tag/${tag}`}
      className="rounded-full border border-border/70 bg-surface-alt px-3 py-1 text-xs font-medium text-muted transition-colors hover:text-heading dark:border-dark-border dark:bg-dark-surface-alt dark:text-dark-text-secondary dark:hover:text-dark-text"
    >
      {tag}
    </Link>
  );
}

export function TagChips({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <TagChip tag={tag} />
        </li>
      ))}
    </ul>
  );
}
