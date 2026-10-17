'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { Context, ReactNode } from 'react';
import type { PreferenceConfig, PreferenceValue } from './preference-config';

import { listPreferenceConfigs } from './preference-config';

type PreferenceContextValue<Value extends string> = {
  value: Value;
  setValue: (value: Value) => void;
};

const preferenceContexts = new Map<string, Context<PreferenceContextValue<string> | null>>();

function getPreferenceContext(storageKey: string): Context<PreferenceContextValue<string> | null> {
  const existing = preferenceContexts.get(storageKey);
  if (existing) {
    return existing;
  }

  const context = createContext<PreferenceContextValue<string> | null>(null);
  preferenceContexts.set(storageKey, context);
  return context;
}

export function PreferenceProvider<Values extends readonly string[]>({
  children,
  ...config
}: PreferenceConfig<Values> & { children: ReactNode }): ReactNode {
  type Value = PreferenceValue<Values>;
  const PreferenceContext = getPreferenceContext(config.storageKey);
  const [value, setValueState] = useState<Value>(config.defaultValue);

  const setValue = (next: Value): void => {
    setValueState(next);
    try {
      localStorage.setItem(config.storageKey, next);
    } catch {
      // Private mode / disabled storage — still update the document attribute.
    }
    document.documentElement.setAttribute(config.attribute, next);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(config.storageKey);
      const next = config.values.includes(stored as Value) ? (stored as Value) : config.defaultValue;
      setValueState(next);
      document.documentElement.setAttribute(config.attribute, next);
    } catch {
      document.documentElement.setAttribute(config.attribute, config.defaultValue);
    }
  }, [config.attribute, config.defaultValue, config.storageKey, config.values]);

  return <PreferenceContext.Provider value={{ value, setValue }}>{children}</PreferenceContext.Provider>;
}

/**
 * Nests one provider per preference. Spread the same `preferences` object:
 * `<PreferenceProviders {...preferences}>{children}</PreferenceProviders>`
 */
export function PreferenceProviders({
  children,
  ...preferences
}: {
  children: ReactNode;
  [name: string]: PreferenceConfig | ReactNode;
}): ReactNode {
  return listPreferenceConfigs(Object.values(preferences)).reduceRight<ReactNode>(
    (node, config) => <PreferenceProvider {...config}>{node}</PreferenceProvider>,
    children,
  );
}

export function usePreference<Values extends readonly string[]>(
  config: PreferenceConfig<Values>,
): PreferenceContextValue<PreferenceValue<Values>> {
  const context = useContext(getPreferenceContext(config.storageKey));
  if (!context) {
    throw new Error(`usePreference must be used within PreferenceProvider for "${config.storageKey}"`);
  }
  return context as PreferenceContextValue<PreferenceValue<Values>>;
}
