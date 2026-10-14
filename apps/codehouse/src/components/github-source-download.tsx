'use client';

import { Button } from '@repo/ui/components/shadcn/button';
import { ButtonGroup } from '@repo/ui/components/shadcn/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@repo/ui/components/shadcn/dropdown-menu';
import { ChevronDownIcon, DownloadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { GithubSourceVersion } from '@/lib/github-source-versions';

type GithubSourceDownloadProps = {
  versions: GithubSourceVersion[];
};

export function GithubSourceDownload({ versions }: GithubSourceDownloadProps) {
  const t = useTranslations('OpenSourceProjects');
  const latest = versions.find(version => version.isLatestStable) ?? versions[0];

  if (!latest) {
    return null;
  }

  const latestLabel =
    latest.kind === 'branch' ? t('download_latest') : t('download_version', { version: latest.label });

  return (
    <ButtonGroup>
      <Button variant="default" nativeButton={false} render={<a href={latest.zipUrl} rel="noopener noreferrer" />}>
        <DownloadIcon data-icon="inline-start" />
        <span data-visual-mask>{latestLabel}</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="default" size="icon" />}
          aria-label={t('download_other_versions')}>
          <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t('download_versions_label')}</DropdownMenuLabel>
            {versions.map(version => (
              <DropdownMenuItem
                key={version.id}
                nativeButton={false}
                render={<a href={version.zipUrl} rel="noopener noreferrer" />}>
                <span data-visual-mask>
                  {version.kind === 'branch' ? t('download_branch', { branch: version.label }) : version.label}
                </span>
                {version.isPrerelease ? <DropdownMenuShortcut>{t('download_prerelease')}</DropdownMenuShortcut> : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
