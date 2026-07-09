import Image from 'next/image';
import { Fragment } from 'react';
import { Card } from '@/components/card';
import { ExternalLink } from './external-link';
import type { NowThread } from '@/lib/interests-data';

type ThreadImage = { src: string; alt: string; width: number; height: number };

export function NowThreadCard({
  thread,
  coverImage,
}: {
  thread: NowThread;
  coverImage?: ThreadImage;
}) {
  const image = thread.image ?? coverImage;

  return (
    <Card
      padding="none"
      hover="lift"
      className="flex h-full flex-col overflow-hidden ring-1 ring-border/60 dark:ring-dark-border"
    >
      {image && (
        <div className="aspect-[16/10] overflow-hidden bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-3">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-full w-full rounded-md object-cover object-top shadow-lg"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-base font-medium text-heading dark:text-dark-text">
          {thread.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted dark:text-dark-text-secondary">
          {thread.body}
        </p>
        <p className="text-sm">
          {thread.links.map((link, index) => (
            <Fragment key={link.href}>
              {index > 0 && (
                <span className="text-muted dark:text-dark-text-secondary" aria-hidden>
                  {' · '}
                </span>
              )}
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            </Fragment>
          ))}
        </p>
      </div>
    </Card>
  );
}
