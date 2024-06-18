import type { ReactNode } from 'react';

export type Layout<PARAMS = {}> = {
  params: PARAMS;
  children: ReactNode;
};

export type Page<PARAMS = {}, SEARCH_PARAMS = {}> = {
  params: PARAMS;
  searchParams: SEARCH_PARAMS;
};
