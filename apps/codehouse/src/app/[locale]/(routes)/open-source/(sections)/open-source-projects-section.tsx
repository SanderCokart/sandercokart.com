'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/shadcn/card';
import { cn } from '@repo/ui/lib/utils';
import { ChevronDownIcon, FileTextIcon, StarIcon, TagIcon } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { FaGithub } from 'react-icons/fa';

import type { ComponentProps, FC } from 'react';
import type { OpenSourceProjectWithVersions } from '@/src/lib/github-source-versions';

import { GithubSourceDownload } from '@/src/components/github-source-download';
import { MotionDiv } from '@/src/lib/motion';
import { githubChangelogUrl, githubReleasesUrl, githubRepoUrl } from '@/src/lib/open-source-projects';

const sectionStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

type OpenSourceProjectsSectionProps = ComponentProps<'section'> & {
  projects: OpenSourceProjectWithVersions[];
};

export const OpenSourceProjectsSection: FC<OpenSourceProjectsSectionProps> = ({ className, projects, ...props }) => {
  const t = useTranslations('OpenSourceProjects');
  const format = useFormatter();

  return (
    <section className={cn('container max-w-(--breakpoint-lg) scroll-mt-16 py-4', className)} id="projects" {...props}>
      <MotionDiv
        className="flex flex-col gap-10"
        variants={sectionStagger}
        animate="show"
        whileInView="show"
        viewport={{ once: true, amount: 0 }}>
        <MotionDiv variants={sectionReveal} className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
          <p className="text-accent text-sm font-semibold tracking-[0.18em] uppercase">{t('eyebrow')}</p>
          <h2 className="text-3xl font-bold uppercase sm:text-5xl">{t('title')}</h2>
          <p className="text-muted-foreground text-balance">{t('description')}</p>
        </MotionDiv>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => {
            const features = t.raw(`projects_${project.id}_features`) as string[];
            const changelogUrl = githubChangelogUrl(project);

            return (
              <MotionDiv key={project.id} variants={sectionReveal} transition={{ delay: index * 0.08 }}>
                <Card>
                  {/*
                  Optional project screenshot.
                  Drop a file at public/static/images/open-source/{project.id}.png
                  then import it and render as the first child of this Card:

                  <Image
                    src={ProjectImage}
                    alt={t(`projects_${project.id}_image_alt`)}
                    className="aspect-video w-full object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 64rem"
                  />
                */}
                  <CardHeader>
                    <p className="text-accent font-mono text-xs tracking-wider uppercase">
                      {t(`projects_${project.id}_intro`)}
                    </p>
                    <CardTitle className="text-2xl font-bold">{t(`projects_${project.id}_title`)}</CardTitle>
                    <CardDescription className="text-base">{t(`projects_${project.id}_description`)}</CardDescription>
                  </CardHeader>
                  {/*
                  Optional secondary gallery slot for GIFs or extra screenshots of {project.repo}.
                  Wrap them in CardContent and keep aspect-video object-cover if you add them.
                */}
                  <CardContent>
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-semibold select-none [&::-webkit-details-marker]:hidden">
                        {t('features_label')}
                        <ChevronDownIcon className="size-4 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <ul className="mt-3 flex flex-col gap-2">
                        {features.map(feature => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="dark:text-accent text-primary">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </CardContent>
                  <CardFooter className="flex flex-wrap items-center gap-3">
                    <GithubSourceDownload versions={project.versions} />
                    <Button
                      variant="outline"
                      nativeButton={false}
                      render={<a href={githubRepoUrl(project)} rel="noopener noreferrer" target="_blank" />}>
                      <FaGithub data-icon="inline-start" />
                      {t('view_on_github')}
                    </Button>
                    {project.hasReleases ? (
                      <Button
                        variant="outline"
                        nativeButton={false}
                        render={<a href={githubReleasesUrl(project)} rel="noopener noreferrer" target="_blank" />}>
                        <TagIcon data-icon="inline-start" />
                        {t('releases')}
                      </Button>
                    ) : null}
                    {changelogUrl ? (
                      <Button
                        variant="outline"
                        nativeButton={false}
                        render={<a href={changelogUrl} rel="noopener noreferrer" target="_blank" />}>
                        <FileTextIcon data-icon="inline-start" />
                        {t('changelog')}
                      </Button>
                    ) : null}
                    {project.stargazersCount !== null ? (
                      <span
                        className="text-muted-foreground inline-flex items-center gap-1.5 text-sm"
                        aria-label={t('stars_label')}
                        title={t('stars_label')}>
                        <StarIcon className="text-accent size-4" aria-hidden />
                        {format.number(project.stargazersCount)}
                      </span>
                    ) : null}
                  </CardFooter>
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </MotionDiv>
    </section>
  );
};
