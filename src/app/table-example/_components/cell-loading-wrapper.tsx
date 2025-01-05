import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CellWrapperProps {
  isFetching: boolean;
  children: ReactNode;
}

export const CellLoadingWrapper = ({ isFetching, children }: CellWrapperProps) => {
  return (
    <span
      className={cn('text-center', {
        'animate-pulse bg-neutral-200 p-2 rounded-lg text-neural-500': isFetching,
      })}
    >
      {children}
    </span>
  );
};
