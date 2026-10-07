import { defineConfig } from 'tsdown';

const moduleDirectives = new Map<string, string>();

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.test.ts'],
  format: ['esm'],
  dts: true,
  platform: 'neutral',
  unbundle: true,
  plugins: [
    {
      name: 'preserve-module-directives',
      transform(code, id) {
        const match = code.match(/^(?:\s*(['"])[^\r\n]*?\1;\s*\r?\n?)*/);

        if (!match?.[0].trim()) {
          return null;
        }

        moduleDirectives.set(id, match[0].trim());

        return {
          code: code.slice(match[0].length),
          map: null,
        };
      },
      renderChunk(code, chunk) {
        const directives = chunk.facadeModuleId ? moduleDirectives.get(chunk.facadeModuleId) : undefined;

        if (!directives) {
          return null;
        }

        return {
          code: `${directives}\n${code}`,
          map: null,
        };
      },
    },
  ],
  outExtensions() {
    return {
      js: '.js',
      dts: '.d.ts',
    };
  },
});
