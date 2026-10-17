import { StarIcon } from 'lucide-react';
import { getFormatter, getTranslations } from 'next-intl/server';
import { FaGithub } from 'react-icons/fa';

import { getPopularOpenSourceProjects } from '@/lib/github-source-versions';
import { githubRepoUrl } from '@/lib/open-source-projects';

const SLOTS = 4;

/**
 * Open source: the most starred repositories in a 2×2 grid, linking to GitHub. When there are fewer than four
 * projects the remaining slots say something new is on the way instead of leaving holes. Real links, so unlike the
 * other previews this one is not hidden from assistive tech.
 */
export async function RepositoriesPreview() {
  const [projects, t, tProjects, format] = await Promise.all([
    getPopularOpenSourceProjects(SLOTS),
    getTranslations('ServicePreviews'),
    getTranslations('OpenSourceProjects'),
    getFormatter(),
  ]);
  const placeholders = Math.max(0, SLOTS - projects.length);

  return (
    <div className="grid gap-3">
      <span className="text-muted-foreground font-digital text-sm tracking-wider uppercase">{t('repos_label')}</span>
      <ul role="list" className="grid grid-cols-2 gap-3">
        {projects.map(project => (
          <li key={project.id}>
            <a
              href={githubRepoUrl(project)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card/85 grid h-full gap-2 rounded-xl border border-(--accent)/25 p-4 transition-colors hover:border-(--accent)/60">
              <span className="flex items-center justify-between gap-2">
                <FaGithub aria-hidden className="size-5" />
                <span
                  className="text-muted-foreground flex items-center gap-1 text-xs tabular-nums"
                  title={tProjects('stars_label')}>
                  <StarIcon aria-hidden className="size-3.5 fill-current text-amber-400" />
                  <span className="sr-only">{tProjects('stars_label')}: </span>
                  {project.stargazersCount === null ? '—' : format.number(project.stargazersCount)}
                </span>
              </span>
              <span className="font-semibold">{tProjects(`projects_${project.id}_title`)}</span>
              <span className="text-muted-foreground text-xs">{tProjects(`projects_${project.id}_intro`)}</span>
            </a>
          </li>
        ))}
        {Array.from({ length: placeholders }, (_, index) => (
          <li
            key={`placeholder-${index}`}
            className="text-muted-foreground grid content-center gap-1 rounded-xl border border-dashed border-(--accent)/30 p-4">
            <span className="text-foreground/80 font-semibold">{t('repos_placeholder_title')}</span>
            <span className="text-xs">{t('repos_placeholder_text')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
