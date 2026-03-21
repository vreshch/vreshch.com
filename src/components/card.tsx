import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export const cardVariants = cva('rounded-2xl bg-surface dark:bg-dark-surface', {
  variants: {
    padding: {
      none: '',
      tight: 'p-4',
      compact: 'p-5',
      default: 'p-6 md:p-8',
    },
    hover: {
      none: '',
      lift: 'transition-all duration-200 hover:bg-surface-alt dark:hover:bg-dark-surface-alt',
      border: 'transition-all duration-200 hover:bg-surface-alt dark:hover:bg-dark-surface-alt',
    },
  },
  defaultVariants: {
    padding: 'default',
    hover: 'none',
  },
});

type CardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className, padding, hover }: CardProps) {
  return <div className={cn(cardVariants({ padding, hover }), className)}>{children}</div>;
}
