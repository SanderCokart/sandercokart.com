'use client';

import { getMDXComponent } from 'mdx-bundler/client';

import { useMemo } from 'react';

import type { MDXComponents } from 'mdx/types';

interface MdxRendererProps {
  code: string;
  components: MDXComponents;
}

/* eslint-disable react-hooks/static-components */
export function MdxRenderer({ code, components }: MdxRendererProps) {
  // avoid re-creating the component every render.
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return <Component components={components} />;
}
/* eslint-enable react-hooks/static-components */
