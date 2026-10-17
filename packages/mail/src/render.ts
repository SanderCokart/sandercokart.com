import { createElement } from 'react';
import { render, toPlainText } from 'react-email';

import { templates, type TemplateName } from './registry';

export async function renderTemplate(
  name: TemplateName,
  props: Record<string, unknown>,
): Promise<{ html: string; text: string }> {
  const Component = templates[name];
  const html = await render(createElement(Component, props as never));

  return {
    html,
    text: toPlainText(html),
  };
}
