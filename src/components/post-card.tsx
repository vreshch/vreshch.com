import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/card';
import { TagChips } from '@/components/tag-chip';
import { formatPostDate, type BlogPostMeta } from '@/lib/blog';

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Card hover="lift" padding="none" className="overflow-hidden">
      <div className="grid items-center md:grid-cols-2">
        <div className="p-4 md:p-6">
          <Link
            href={`/blog/${post.slug}`}
            aria-label={post.title}
            className="relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/60 bg-surface-alt dark:border-dark-border dark:bg-dark-surface-alt"
          >
            {post.coverUrl ? (
              <Image
                src={post.thumbnailUrl ?? post.coverUrl}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-surface to-surface-alt dark:from-dark-surface dark:to-dark-surface-alt" />
            )}
          </Link>
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted dark:text-dark-text-secondary">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h2 className="mb-2 text-2xl font-medium leading-snug text-heading dark:text-dark-text md:text-3xl">
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">
              {post.title}
            </Link>
          </h2>
          {post.subtitle && (
            <p className="line-clamp-2 text-sm text-muted dark:text-dark-text-secondary md:text-base">
              {post.subtitle}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4">
              <TagChips tags={post.tags} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
