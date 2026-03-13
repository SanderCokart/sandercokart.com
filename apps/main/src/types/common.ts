import type { ReactNode } from 'react';

export type Layout<PARAMS = unknown> = {
  params: PARAMS;
  children: ReactNode;
};

export type Page<PARAMS = unknown, SEARCH_PARAMS = unknown> = {
  params: Promise<PARAMS>;
  searchParams: Promise<SEARCH_PARAMS>;
};
