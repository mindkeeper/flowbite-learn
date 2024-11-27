import { NuqsAdapter } from 'nuqs/adapters/next';
import { PropsWithChildren } from 'react';

export const NuqsProvider = ({ children }: PropsWithChildren) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};
