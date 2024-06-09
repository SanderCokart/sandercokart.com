import { ReactNode } from 'react';

export type Layout<PARAMS = {}> = {
  children: Readonly<ReactNode>;
  params: Readonly<PARAMS>;
};

export type Page<PARAMS = {}, SEARCH_PARAMS = {}> = {
  params: Readonly<PARAMS>;
  searchParams: Readonly<SEARCH_PARAMS>;
};
