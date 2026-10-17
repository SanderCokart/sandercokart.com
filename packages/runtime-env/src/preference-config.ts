import { serializeForScript } from './serialize-for-script';

export type PreferenceConfig<Values extends readonly string[] = readonly string[]> = {
  storageKey: string;
  attribute: string;
  values: Values;
  defaultValue: Values[number];
  id?: string;
};

export type PreferenceValue<Values extends readonly string[]> = Values[number];

export function assertPreferenceConfig<Values extends readonly string[]>(config: PreferenceConfig<Values>): void {
  if (config.storageKey.length === 0) {
    throw new Error('createPreference: storageKey must be a non-empty string');
  }
  if (config.attribute.length === 0) {
    throw new Error('createPreference: attribute must be a non-empty string');
  }
  if (config.values.length === 0) {
    throw new Error('createPreference: values must not be empty');
  }
  if (!config.values.includes(config.defaultValue)) {
    throw new Error('createPreference: defaultValue must be one of values');
  }
}

/**
 * Validate a localStorage HTML preference config.
 * Put each config on a `preferences` object and spread that onto
 * `<PreferenceScripts />` / `<PreferenceProviders />`. Use `usePreference(blogView)` in components.
 */
export function createPreference<const Values extends readonly string[]>(
  config: PreferenceConfig<Values>,
): PreferenceConfig<Values> {
  assertPreferenceConfig(config);
  return config;
}

export type PreferenceMap = Record<string, PreferenceConfig>;

export function isPreferenceConfig(value: unknown): value is PreferenceConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    'storageKey' in value &&
    typeof (value as { storageKey: unknown }).storageKey === 'string' &&
    'attribute' in value &&
    'values' in value &&
    Array.isArray((value as { values: unknown }).values) &&
    'defaultValue' in value
  );
}

export function listPreferenceConfigs(values: Iterable<unknown>): PreferenceConfig[] {
  const configs: PreferenceConfig[] = [];
  const storageKeys = new Set<string>();
  const attributes = new Set<string>();

  for (const value of values) {
    if (!isPreferenceConfig(value)) {
      continue;
    }

    assertPreferenceConfig(value);

    if (storageKeys.has(value.storageKey)) {
      throw new Error(`duplicate preference storageKey "${value.storageKey}"`);
    }
    if (attributes.has(value.attribute)) {
      throw new Error(`duplicate preference attribute "${value.attribute}"`);
    }

    storageKeys.add(value.storageKey);
    attributes.add(value.attribute);
    configs.push(value);
  }

  return configs;
}

export function generatePreferenceScript<Values extends readonly string[]>(config: PreferenceConfig<Values>): string {
  const payload = serializeForScript({
    storageKey: config.storageKey,
    attribute: config.attribute,
    defaultValue: config.defaultValue,
    values: config.values,
  });

  return `try{var c=${payload};var v=localStorage.getItem(c.storageKey);if(c.values.indexOf(v)===-1){v=c.defaultValue}document.documentElement.setAttribute(c.attribute,v)}catch(e){}`;
}
