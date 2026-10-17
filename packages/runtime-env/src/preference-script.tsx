import type { ReactNode } from 'react';
import type { PreferenceConfig, PreferenceMap } from './preference-config';

import { BlockingScript } from './blocking-script';
import { generatePreferenceScript, listPreferenceConfigs } from './preference-config';

/**
 * Blocking FOUC script for the root layout `<head>`.
 * Reads localStorage, whitelists the value, and sets the document attribute before paint.
 */
export function PreferenceScript<Values extends readonly string[]>(config: PreferenceConfig<Values>): ReactNode {
  return <BlockingScript id={config.id ?? config.storageKey} code={generatePreferenceScript(config)} />;
}

/**
 * One blocking script per preference. Spread the app `preferences` object:
 * `<PreferenceScripts {...preferences} />`
 */
export function PreferenceScripts(preferences: PreferenceMap): ReactNode {
  return (
    <>
      {listPreferenceConfigs(Object.values(preferences)).map(config => (
        <PreferenceScript key={config.storageKey} {...config} />
      ))}
    </>
  );
}
