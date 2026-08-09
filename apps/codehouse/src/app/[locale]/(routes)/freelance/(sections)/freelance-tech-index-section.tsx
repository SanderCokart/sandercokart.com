'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/shadcn/accordion';
import { Badge } from '@repo/ui/components/shadcn/badge';
import { Button } from '@repo/ui/components/shadcn/button';
import { ButtonGroup } from '@repo/ui/components/shadcn/button-group';
import { Card, CardContent } from '@repo/ui/components/shadcn/card';
import { Input } from '@repo/ui/components/shadcn/input';
import { cn } from '@repo/ui/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BiLogoAdobe, BiLogoMicrosoftTeams } from 'react-icons/bi';
import { FaDatabase, FaJava } from 'react-icons/fa';
import {
  SiAlpinedotjs,
  SiAlpinelinux,
  SiBootstrap,
  SiBuefy,
  SiBulma,
  SiBun,
  SiChartdotjs,
  SiClickup,
  SiCloudflare,
  SiComposer,
  SiCss,
  SiCssmodules,
  SiDocker,
  SiDoctrine,
  SiElectron,
  SiEslint,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiFormik,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGnubash,
  SiHetzner,
  SiHtml5,
  SiInertia,
  SiJavascript,
  SiJetbrains,
  SiJira,
  SiJquery,
  SiJson,
  SiJsonwebtokens,
  SiLaravel,
  SiMantine,
  SiMdx,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNotion,
  SiNpm,
  SiNuxt,
  SiOpenid,
  SiPhp,
  SiPinia,
  SiPnpm,
  SiPocketbase,
  SiPostgresql,
  SiPostcss,
  SiPrettier,
  SiPython,
  SiQwik,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiReacttable,
  SiRedis,
  SiRemix,
  SiSanity,
  SiSass,
  SiSendgrid,
  SiSentry,
  SiShadcnui,
  SiSlack,
  SiSqlite,
  SiStorybook,
  SiStripe,
  SiSwagger,
  SiSymfony,
  SiTailwindcss,
  SiTerraform,
  SiTraefikproxy,
  SiTurborepo,
  SiTypescript,
  SiUbuntu,
  SiVercel,
  SiVite,
  SiVuedotjs,
  SiXml,
  SiYarn,
  SiZod,
} from 'react-icons/si';
import { VscAzure, VscAzureDevops } from 'react-icons/vsc';

import { useDeferredValue, useMemo, useState } from 'react';

import type { ComponentProps, FC } from 'react';
import type { IconType } from 'react-icons';

type TechCategory =
  | 'languages'
  | 'frontend'
  | 'ui'
  | 'state'
  | 'backend'
  | 'databases'
  | 'devops'
  | 'testing'
  | 'tooling'
  | 'collaboration';

type TechItem = {
  id: string;
  label: string;
  aliases: string[];
  icon: IconType;
  category: TechCategory;
};

const categoryOrder: TechCategory[] = [
  'languages',
  'frontend',
  'ui',
  'state',
  'backend',
  'databases',
  'devops',
  'testing',
  'tooling',
  'collaboration',
];

const techItems: TechItem[] = [
  // Languages & markup
  { id: 'html', label: 'HTML', aliases: ['html', 'html5'], icon: SiHtml5, category: 'languages' },
  { id: 'css', label: 'CSS', aliases: ['css', 'css3'], icon: SiCss, category: 'languages' },
  {
    id: 'javascript',
    label: 'JavaScript',
    aliases: ['javascript', 'js', 'ecmascript'],
    icon: SiJavascript,
    category: 'languages',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    aliases: ['typescript', 'ts'],
    icon: SiTypescript,
    category: 'languages',
  },
  { id: 'php', label: 'PHP', aliases: ['php'], icon: SiPhp, category: 'languages' },
  { id: 'python', label: 'Python', aliases: ['python'], icon: SiPython, category: 'languages' },
  { id: 'java', label: 'Java', aliases: ['java'], icon: FaJava, category: 'languages' },
  { id: 'sql', label: 'SQL', aliases: ['sql'], icon: FaDatabase, category: 'languages' },
  { id: 'bash', label: 'Bash / Shell', aliases: ['bash', 'shell', 'sh', 'cli'], icon: SiGnubash, category: 'languages' },
  { id: 'json', label: 'JSON', aliases: ['json'], icon: SiJson, category: 'languages' },
  { id: 'xml', label: 'XML', aliases: ['xml'], icon: SiXml, category: 'languages' },
  { id: 'mdx', label: 'MDX', aliases: ['mdx'], icon: SiMdx, category: 'languages' },

  // Frontend frameworks
  { id: 'react', label: 'React', aliases: ['react', 'reactjs'], icon: SiReact, category: 'frontend' },
  { id: 'vue', label: 'Vue', aliases: ['vue', 'vuejs', 'vue.js'], icon: SiVuedotjs, category: 'frontend' },
  { id: 'nextjs', label: 'Next.js', aliases: ['next', 'nextjs', 'next.js'], icon: SiNextdotjs, category: 'frontend' },
  { id: 'nuxt', label: 'Nuxt.js', aliases: ['nuxt', 'nuxtjs', 'nuxt.js'], icon: SiNuxt, category: 'frontend' },
  { id: 'remix', label: 'Remix', aliases: ['remix'], icon: SiRemix, category: 'frontend' },
  {
    id: 'alpinejs',
    label: 'Alpine.js',
    aliases: ['alpine', 'alpinejs', 'alpine.js'],
    icon: SiAlpinedotjs,
    category: 'frontend',
  },
  { id: 'qwik', label: 'Qwik', aliases: ['qwik'], icon: SiQwik, category: 'frontend' },
  {
    id: 'inertia',
    label: 'Inertia.js',
    aliases: ['inertia', 'inertiajs', 'inertia.js'],
    icon: SiInertia,
    category: 'frontend',
  },
  { id: 'electron', label: 'Electron', aliases: ['electron', 'desktop'], icon: SiElectron, category: 'frontend' },
  { id: 'jquery', label: 'jQuery', aliases: ['jquery'], icon: SiJquery, category: 'frontend' },

  // UI & styling
  { id: 'tailwind', label: 'Tailwind', aliases: ['tailwind', 'tailwindcss'], icon: SiTailwindcss, category: 'ui' },
  { id: 'bootstrap', label: 'Bootstrap', aliases: ['bootstrap', 'bootstrap ui'], icon: SiBootstrap, category: 'ui' },
  { id: 'bulma', label: 'Bulma CSS', aliases: ['bulma', 'bulma css'], icon: SiBulma, category: 'ui' },
  { id: 'buefy', label: 'Buefy', aliases: ['buefy'], icon: SiBuefy, category: 'ui' },
  { id: 'mui', label: 'Material UI', aliases: ['material ui', 'mui', 'material'], icon: SiMui, category: 'ui' },
  { id: 'mantine', label: 'Mantine', aliases: ['mantine'], icon: SiMantine, category: 'ui' },
  { id: 'radix', label: 'Radix UI', aliases: ['radix', 'radix ui', 'radixui'], icon: SiRadixui, category: 'ui' },
  { id: 'baseui', label: 'Base UI', aliases: ['base ui', 'baseui', 'base-ui'], icon: SiMui, category: 'ui' },
  { id: 'shadcn', label: 'shadcn/ui', aliases: ['shadcn', 'shadcn ui', 'shadcn/ui'], icon: SiShadcnui, category: 'ui' },
  {
    id: 'framer-motion',
    label: 'Framer Motion',
    aliases: ['framer', 'framer motion', 'motion'],
    icon: SiFramer,
    category: 'ui',
  },
  { id: 'recharts', label: 'Recharts', aliases: ['recharts'], icon: SiChartdotjs, category: 'ui' },
  {
    id: 'css-modules',
    label: 'CSS Modules',
    aliases: ['css modules', 'cssmodules'],
    icon: SiCssmodules,
    category: 'ui',
  },
  { id: 'postcss', label: 'PostCSS', aliases: ['postcss'], icon: SiPostcss, category: 'ui' },
  { id: 'scss', label: 'SCSS', aliases: ['scss', 'sass'], icon: SiSass, category: 'ui' },

  // State, forms & data fetching
  { id: 'pinia', label: 'Pinia', aliases: ['pinia'], icon: SiPinia, category: 'state' },
  { id: 'vuex', label: 'Vuex', aliases: ['vuex'], icon: SiVuedotjs, category: 'state' },
  { id: 'zustand', label: 'Zustand', aliases: ['zustand'], icon: SiReact, category: 'state' },
  { id: 'jotai', label: 'Jotai', aliases: ['jotai'], icon: SiReact, category: 'state' },
  {
    id: 'react-query',
    label: 'React Query / TanStack Query',
    aliases: ['react query', 'tanstack query', 'tanstackquery', 'react-query'],
    icon: SiReactquery,
    category: 'state',
  },
  {
    id: 'tanstack-table',
    label: 'TanStack Table',
    aliases: ['tanstack table', 'react table'],
    icon: SiReacttable,
    category: 'state',
  },
  {
    id: 'tanstack-router',
    label: 'TanStack Router',
    aliases: ['tanstack router', 'react router tanstack'],
    icon: SiReactrouter,
    category: 'state',
  },
  {
    id: 'react-hook-form',
    label: 'React Hook Form',
    aliases: ['react hook form', 'rhf', 'react-hook-form'],
    icon: SiReacthookform,
    category: 'state',
  },
  { id: 'formik', label: 'Formik', aliases: ['formik'], icon: SiFormik, category: 'state' },
  { id: 'zod', label: 'Zod', aliases: ['zod'], icon: SiZod, category: 'state' },
  { id: 'yup', label: 'Yup', aliases: ['yup'], icon: SiZod, category: 'state' },

  // Backend & APIs
  { id: 'laravel', label: 'Laravel', aliases: ['laravel', 'php laravel'], icon: SiLaravel, category: 'backend' },
  { id: 'symfony', label: 'Symfony', aliases: ['symfony', 'php symfony'], icon: SiSymfony, category: 'backend' },
  { id: 'flask', label: 'Flask', aliases: ['flask', 'python flask'], icon: SiFlask, category: 'backend' },
  { id: 'fastapi', label: 'FastAPI', aliases: ['fastapi', 'fast-api', 'fast api'], icon: SiFastapi, category: 'backend' },
  { id: 'doctrine', label: 'Doctrine', aliases: ['doctrine', 'doctrine orm'], icon: SiDoctrine, category: 'backend' },
  {
    id: 'laravel-sanctum',
    label: 'Laravel Sanctum',
    aliases: ['sanctum', 'laravel sanctum'],
    icon: SiLaravel,
    category: 'backend',
  },
  {
    id: 'nextauth',
    label: 'NextAuth / Auth.js',
    aliases: ['nextauth', 'next auth', 'auth.js', 'authjs'],
    icon: SiNextdotjs,
    category: 'backend',
  },
  { id: 'jwt', label: 'JWT', aliases: ['jwt', 'json web token', 'jsonwebtoken'], icon: SiJsonwebtokens, category: 'backend' },
  {
    id: 'openid',
    label: 'OpenID Connect',
    aliases: ['openid', 'openid connect', 'oidc'],
    icon: SiOpenid,
    category: 'backend',
  },
  { id: 'stripe', label: 'Stripe', aliases: ['stripe'], icon: SiStripe, category: 'backend' },
  { id: 'sendgrid', label: 'SendGrid', aliases: ['sendgrid', 'send grid'], icon: SiSendgrid, category: 'backend' },
  {
    id: 'swagger',
    label: 'Swagger / OpenAPI',
    aliases: ['swagger', 'openapi', 'open api'],
    icon: SiSwagger,
    category: 'backend',
  },
  {
    id: 'pocketbase',
    label: 'PocketBase',
    aliases: ['pocketbase', 'pocket base'],
    icon: SiPocketbase,
    category: 'backend',
  },
  { id: 'sanity', label: 'Sanity', aliases: ['sanity', 'sanity cms'], icon: SiSanity, category: 'backend' },

  // Databases & storage
  { id: 'mysql', label: 'MySQL', aliases: ['mysql'], icon: SiMysql, category: 'databases' },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    aliases: ['postgres', 'postgresql', 'psql'],
    icon: SiPostgresql,
    category: 'databases',
  },
  { id: 'sqlite', label: 'SQLite', aliases: ['sqlite'], icon: SiSqlite, category: 'databases' },
  { id: 'mongodb', label: 'MongoDB', aliases: ['mongo', 'mongodb', 'mongo db'], icon: SiMongodb, category: 'databases' },
  { id: 'redis', label: 'Redis', aliases: ['redis', 'cache'], icon: SiRedis, category: 'databases' },

  // DevOps & hosting
  { id: 'docker', label: 'Docker', aliases: ['docker', 'containers'], icon: SiDocker, category: 'devops' },
  {
    id: 'docker-compose',
    label: 'Docker Compose',
    aliases: ['docker compose', 'compose'],
    icon: SiDocker,
    category: 'devops',
  },
  { id: 'nginx', label: 'Nginx', aliases: ['nginx'], icon: SiNginx, category: 'devops' },
  { id: 'traefik', label: 'Traefik', aliases: ['traefik', 'proxy', 'reverse proxy'], icon: SiTraefikproxy, category: 'devops' },
  { id: 'cloudflare', label: 'Cloudflare', aliases: ['cloudflare', 'cf'], icon: SiCloudflare, category: 'devops' },
  { id: 'vercel', label: 'Vercel', aliases: ['vercel'], icon: SiVercel, category: 'devops' },
  { id: 'dokploy', label: 'Dokploy', aliases: ['dokploy'], icon: SiDocker, category: 'devops' },
  { id: 'hetzner', label: 'Hetzner', aliases: ['hetzner', 'hetzen'], icon: SiHetzner, category: 'devops' },
  {
    id: 'azure',
    label: 'Azure Cloud',
    aliases: ['azure', 'azure cloud', 'microsoft azure'],
    icon: VscAzure,
    category: 'devops',
  },
  {
    id: 'azure-devops',
    label: 'Azure DevOps',
    aliases: ['azure devops', 'ado', 'azuredevops'],
    icon: VscAzureDevops,
    category: 'devops',
  },
  {
    id: 'azure-build',
    label: 'Azure Build Pipelines',
    aliases: ['azure build', 'azure build pipelines', 'build pipelines'],
    icon: VscAzureDevops,
    category: 'devops',
  },
  {
    id: 'azure-release',
    label: 'Azure Release Pipelines',
    aliases: ['azure release', 'azure release pipelines', 'release pipelines'],
    icon: VscAzureDevops,
    category: 'devops',
  },
  { id: 'terraform', label: 'Terraform', aliases: ['terraform', 'iac'], icon: SiTerraform, category: 'devops' },
  { id: 'sentry', label: 'Sentry', aliases: ['sentry'], icon: SiSentry, category: 'devops' },
  { id: 'ubuntu', label: 'Ubuntu', aliases: ['ubuntu'], icon: SiUbuntu, category: 'devops' },
  {
    id: 'alpinelinux',
    label: 'Alpine Linux',
    aliases: ['alpine linux', 'alpine'],
    icon: SiAlpinelinux,
    category: 'devops',
  },

  // Testing & quality
  { id: 'phpunit', label: 'PHPUnit', aliases: ['phpunit'], icon: SiPhp, category: 'testing' },
  { id: 'pest', label: 'Pest', aliases: ['pest', 'pestphp', 'pest php'], icon: SiPhp, category: 'testing' },
  {
    id: 'storybook',
    label: 'Storybook',
    aliases: ['storybook', 'component docs'],
    icon: SiStorybook,
    category: 'testing',
  },
  { id: 'eslint', label: 'ESLint', aliases: ['eslint', 'lint'], icon: SiEslint, category: 'testing' },
  { id: 'prettier', label: 'Prettier', aliases: ['prettier', 'format'], icon: SiPrettier, category: 'testing' },

  // Tooling & packages
  { id: 'vite', label: 'Vite', aliases: ['vite'], icon: SiVite, category: 'tooling' },
  { id: 'turbopack', label: 'Turbopack', aliases: ['turbopack'], icon: SiVercel, category: 'tooling' },
  { id: 'tsdown', label: 'tsdown', aliases: ['tsdown'], icon: SiTypescript, category: 'tooling' },
  { id: 'turborepo', label: 'Turborepo', aliases: ['turborepo', 'turbo'], icon: SiTurborepo, category: 'tooling' },
  { id: 'npm', label: 'npm', aliases: ['npm'], icon: SiNpm, category: 'tooling' },
  { id: 'pnpm', label: 'pnpm', aliases: ['pnpm'], icon: SiPnpm, category: 'tooling' },
  { id: 'yarn', label: 'Yarn', aliases: ['yarn'], icon: SiYarn, category: 'tooling' },
  { id: 'bun', label: 'Bun', aliases: ['bun'], icon: SiBun, category: 'tooling' },
  { id: 'pip', label: 'pip', aliases: ['pip', 'pip3'], icon: SiPython, category: 'tooling' },
  { id: 'composer', label: 'Composer', aliases: ['composer', 'php composer'], icon: SiComposer, category: 'tooling' },
  { id: 'git', label: 'Git', aliases: ['git'], icon: SiGit, category: 'tooling' },
  { id: 'github', label: 'GitHub', aliases: ['github'], icon: SiGithub, category: 'tooling' },
  { id: 'gitlab', label: 'GitLab', aliases: ['gitlab'], icon: SiGitlab, category: 'tooling' },

  // Collaboration
  { id: 'notion', label: 'Notion', aliases: ['notion'], icon: SiNotion, category: 'collaboration' },
  { id: 'slack', label: 'Slack', aliases: ['slack'], icon: SiSlack, category: 'collaboration' },
  {
    id: 'teams',
    label: 'Microsoft Teams',
    aliases: ['teams', 'microsoft teams', 'ms teams'],
    icon: BiLogoMicrosoftTeams,
    category: 'collaboration',
  },
  { id: 'figma', label: 'Figma', aliases: ['figma'], icon: SiFigma, category: 'collaboration' },
  { id: 'jira', label: 'Jira', aliases: ['jira', 'atlassian'], icon: SiJira, category: 'collaboration' },
  { id: 'clickup', label: 'ClickUp', aliases: ['clickup', 'click up'], icon: SiClickup, category: 'collaboration' },
  {
    id: 'youtrack',
    label: 'YouTrack',
    aliases: ['youtrack', 'jetbrains youtrack'],
    icon: SiJetbrains,
    category: 'collaboration',
  },
  {
    id: 'adobe',
    label: 'Adobe CC',
    aliases: ['adobe', 'adobe cc', 'creative cloud', 'photoshop'],
    icon: BiLogoAdobe,
    category: 'collaboration',
  },
];

type CategoryFilter = 'all' | TechCategory;

function matchesQuery(item: TechItem, query: string, categoryLabel: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  return (
    item.label.toLowerCase().includes(normalized) ||
    categoryLabel.toLowerCase().includes(normalized) ||
    item.aliases.some(alias => alias.includes(normalized) || normalized.includes(alias))
  );
}

function sortByLabel(a: TechItem, b: TechItem): number {
  return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
}

function TechBadgeList({ items }: { items: TechItem[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map(item => {
        const Icon = item.icon;

        return (
          <li key={item.id}>
            <Badge
              variant="outline"
              className="border-accent/40 dark:border-primary/40 bg-card/40 h-7 gap-1 rounded-full px-2.5 text-xs [&>svg]:size-3!">
              <Icon data-icon="inline-start" aria-hidden />
              {item.label}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}

export const FreelanceTechIndexSection: FC<ComponentProps<'section'>> = ({ className, ...props }) => {
  const t = useTranslations('FreelanceTechIndex');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('frontend');
  const deferredQuery = useDeferredValue(query);
  const isSearching = deferredQuery.trim().length > 0;

  const categoryLabels = useMemo(
    () => Object.fromEntries(categoryOrder.map(category => [category, t(`categories_${category}`)])) as Record<
      TechCategory,
      string
    >,
    [t],
  );

  const grouped = useMemo(() => {
    return categoryOrder
      .map(category => {
        const categoryLabel = categoryLabels[category];
        const items = techItems
          .filter(item => item.category === category)
          .filter(item => matchesQuery(item, deferredQuery, categoryLabel))
          .sort(sortByLabel);

        return { category, categoryLabel, items };
      })
      .filter(group => group.items.length > 0);
  }, [categoryLabels, deferredQuery]);

  const visibleGroups = useMemo(() => {
    if (isSearching || activeCategory === 'all') {
      return grouped;
    }

    return grouped.filter(group => group.category === activeCategory);
  }, [activeCategory, grouped, isSearching]);

  const visibleCategoryValues = useMemo(
    () => visibleGroups.map(group => group.category),
    [visibleGroups],
  );

  const accordionSyncKey = isSearching ? `search:${deferredQuery}` : `browse:${activeCategory}`;
  const [openCategories, setOpenCategories] = useState<TechCategory[]>([]);
  const [lastAccordionSyncKey, setLastAccordionSyncKey] = useState(accordionSyncKey);

  if (lastAccordionSyncKey !== accordionSyncKey) {
    setLastAccordionSyncKey(accordionSyncKey);
    setOpenCategories(isSearching ? visibleCategoryValues : []);
  }

  const filteredCount = useMemo(
    () => visibleGroups.reduce((sum, group) => sum + group.items.length, 0),
    [visibleGroups],
  );

  const showAccordion = isSearching || activeCategory === 'all';
  const allExpanded =
    visibleCategoryValues.length > 0 && visibleCategoryValues.every(category => openCategories.includes(category));
  const noneExpanded = !visibleCategoryValues.some(category => openCategories.includes(category));

  return (
    <section
      className={cn('container flex scroll-mt-16 flex-col gap-6 sm:scroll-mt-16', className)}
      id="tech-index"
      {...props}>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-balance">{t('description')}</p>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        <div className="relative w-full">
          <SearchIcon
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder={t('search_placeholder')}
            aria-label={t('search_label')}
            className="h-10 pl-9"
          />
        </div>

        {!isSearching ? (
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={t('filter_label')}>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                activeCategory === 'all'
                  ? 'border-accent bg-accent/15 text-foreground dark:border-primary dark:bg-primary/20'
                  : 'border-border text-muted-foreground hover:border-accent/50 hover:text-foreground',
              )}>
              {t('categories_all')}
            </button>
            {categoryOrder.map(category => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                  activeCategory === category
                    ? 'border-accent bg-accent/15 text-foreground dark:border-primary dark:bg-primary/20'
                    : 'border-border text-muted-foreground hover:border-accent/50 hover:text-foreground',
                )}>
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {visibleGroups.length === 0 ? (
        <p className="text-muted-foreground text-center text-sm">{t('empty', { query })}</p>
      ) : showAccordion ? (
        <Card className="border-border/60 bg-card/40">
          <CardContent className="flex flex-col gap-2 pt-2">
            <div className="flex justify-end">
              <ButtonGroup aria-label={t('accordion_controls_label')}>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  disabled={allExpanded}
                  onClick={() => setOpenCategories(visibleCategoryValues)}>
                  {t('expand_all')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  disabled={noneExpanded}
                  onClick={() => setOpenCategories([])}>
                  {t('collapse_all')}
                </Button>
              </ButtonGroup>
            </div>

            <Accordion
              multiple
              value={openCategories}
              onValueChange={value => setOpenCategories(value as TechCategory[])}
              className="w-full">
              {visibleGroups.map(group => (
                <AccordionItem key={group.category} value={group.category}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="flex flex-1 items-center justify-between gap-3 pr-2">
                      <span className="text-xs font-semibold tracking-[0.12em] uppercase">
                        {group.categoryLabel}
                      </span>
                      <span className="text-muted-foreground text-xs tabular-nums">{group.items.length}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <TechBadgeList items={group.items} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ) : (
        <div className="border-border/60 bg-card/30 rounded-xl border p-4">
          <TechBadgeList items={visibleGroups[0]?.items ?? []} />
        </div>
      )}

      <p className="text-muted-foreground text-center text-xs">
        {t('result_count', { count: filteredCount, total: techItems.length })}
      </p>
    </section>
  );
};
