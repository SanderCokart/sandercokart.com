import { cacheLife, cacheTag } from 'next/cache';

import type { OpenSourceProject } from '@/src/lib/open-source-projects';

import { env } from '@/src/env';
import { githubArchiveUrl, openSourceProjects } from '@/src/lib/open-source-projects';

type GithubRepository = {
  stargazers_count: number;
};

type GithubRelease = {
  draft: boolean;
  name: string | null;
  prerelease: boolean;
  tag_name: string;
};

export type GithubSourceVersion = {
  id: string;
  isLatestStable: boolean;
  isPrerelease: boolean;
  kind: 'branch' | 'release';
  label: string;
  zipUrl: string;
};

export type OpenSourceProjectWithVersions = OpenSourceProject & {
  stargazersCount: number | null;
  versions: GithubSourceVersion[];
};

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'sandercokart-codehouse',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  return headers;
}

function branchVersion(project: OpenSourceProject, isLatestStable: boolean): GithubSourceVersion {
  return {
    id: `heads:${project.defaultBranch}`,
    isLatestStable,
    isPrerelease: false,
    kind: 'branch',
    label: project.defaultBranch,
    zipUrl: githubArchiveUrl(project, 'heads', project.defaultBranch),
  };
}

async function fetchGithubReleases(project: OpenSourceProject): Promise<GithubRelease[]> {
  if (env.NEXT_PUBLIC_VISUAL_TEST) {
    return [];
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}/releases?per_page=10`, {
      headers: githubHeaders(),
    });

    if (!response.ok) {
      return [];
    }

    const releases = (await response.json()) as GithubRelease[];

    return releases.filter(release => !release.draft);
  } catch {
    return [];
  }
}

async function fetchGithubStargazersCount(project: OpenSourceProject): Promise<number | null> {
  if (env.NEXT_PUBLIC_VISUAL_TEST) {
    return null;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}`, {
      headers: githubHeaders(),
    });

    if (!response.ok) {
      return null;
    }

    const repository = (await response.json()) as GithubRepository;

    return repository.stargazers_count;
  } catch {
    return null;
  }
}

export async function getGithubSourceVersions(project: OpenSourceProject): Promise<GithubSourceVersion[]> {
  const releases = await fetchGithubReleases(project);
  const releaseVersions: GithubSourceVersion[] = releases.map(release => ({
    id: `tags:${release.tag_name}`,
    isLatestStable: false,
    isPrerelease: release.prerelease,
    kind: 'release',
    label: release.tag_name,
    zipUrl: githubArchiveUrl(project, 'tags', release.tag_name),
  }));

  const latestStableRelease = releaseVersions.find(version => !version.isPrerelease);

  if (latestStableRelease) {
    latestStableRelease.isLatestStable = true;

    return [
      latestStableRelease,
      ...releaseVersions.filter(version => version.id !== latestStableRelease.id),
      branchVersion(project, false),
    ];
  }

  return [branchVersion(project, true), ...releaseVersions];
}

export async function getOpenSourceProjectsWithVersions(): Promise<OpenSourceProjectWithVersions[]> {
  'use cache';
  cacheLife('hours');
  cacheTag('open-source-github-versions');

  return Promise.all(
    openSourceProjects.map(async project => {
      const [stargazersCount, versions] = await Promise.all([
        fetchGithubStargazersCount(project),
        getGithubSourceVersions(project),
      ]);

      return { ...project, stargazersCount, versions };
    }),
  );
}
