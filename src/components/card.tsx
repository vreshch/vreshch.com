import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export const cardVariants = cva(
  'rounded-xl border border-border bg-white dark:border-dark-border dark:bg-dark-surface',
  {
    variants: {
      padding: {
        none: '',
        tight: 'p-4',
        compact: 'p-5',
        default: 'p-6',
      },
      hover: {
        none: '',
        lift: 'shadow-sm transition-all hover:shadow-lg dark:shadow-none dark:hover:bg-dark-surface-alt',
        border:
          'transition-all hover:border-primary/40 hover:shadow-lg dark:hover:border-accent-light/30',
      },
    },
    defaultVariants: {
      padding: 'default',
      hover: 'none',
    },
  },
);

type CardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className, padding, hover }: CardProps) {
  return <div className={cn(cardVariants({ padding, hover }), className)}>{children}</div>;
}
