'use client';

import Image from 'next/image';
import { Card } from '@/components/card';
import { trackEvent } from '@/lib/analytics';
import type { FeaturedProject } from '@/lib/featured-projects';

export function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent('outbound_click', { url: project.url, label: project.name })}
    >
      <Card hover="lift" padding="none" className="flex h-full flex-col overflow-hidden">
        {project.image ? (
          <div className="bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-4">
            <Image
              src={project.image}
              width={project.imageWidth ?? 1360}
              height={project.imageHeight ?? 967}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
              alt={project.name}
            />
          </div>
        ) : (
          <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-b from-[#1e2e47] to-[#0c0f16] p-8">
            <span className="text-2xl font-medium text-white/90 md:text-3xl">{project.name}</span>
          </div>
        )}
        <div className="p-6">
          <h3 className="mb-1 text-lg font-medium text-heading dark:text-dark-text">
            {project.name}
          </h3>
          <p className="text-sm text-muted dark:text-dark-text-secondary">{project.description}</p>
        </div>
      </Card>
    </a>
  );
}
