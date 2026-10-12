export const GITHUB_OWNER = 'SanderCokart' as const;

export const openSourceProjects = [
  {
    id: 'zen-tab-search',
    hasReleases: true,
    owner: GITHUB_OWNER,
    repo: 'Zen-Tab-Search-Anytime-and-Anywhere',
    defaultBranch: 'main',
    changelogPath: null,
  },
  {
    id: 'cloudreve-mcp',
    hasReleases: false,
    owner: GITHUB_OWNER,
    repo: 'cloudreve-mcp',
    defaultBranch: 'main',
    changelogPath: null,
  },
  {
    id: 'shell-password-generator',
    hasReleases: false,
    owner: GITHUB_OWNER,
    repo: 'shell-password-generator',
    defaultBranch: 'main',
    changelogPath: null,
  },
  {
    id: 'envcrypt',
    hasReleases: true,
    owner: GITHUB_OWNER,
    repo: 'envcrypt',
    defaultBranch: 'main',
    changelogPath: null,
  },
] as const;

export type OpenSourceProject = (typeof openSourceProjects)[number];
export type OpenSourceProjectId = OpenSourceProject['id'];

export function githubRepoUrl(project: Pick<OpenSourceProject, 'owner' | 'repo'>): string {
  return `https://github.com/${project.owner}/${project.repo}`;
}

export function githubReleasesUrl(project: Pick<OpenSourceProject, 'owner' | 'repo'>): string {
  return `${githubRepoUrl(project)}/releases`;
}

export function githubChangelogUrl(
  project: Pick<OpenSourceProject, 'owner' | 'repo' | 'defaultBranch' | 'changelogPath'>,
): string | null {
  if (!project.changelogPath) {
    return null;
  }

  return `${githubRepoUrl(project)}/blob/${project.defaultBranch}/${project.changelogPath}`;
}

export function githubArchiveUrl(
  project: Pick<OpenSourceProject, 'owner' | 'repo'>,
  refType: 'heads' | 'tags',
  ref: string,
): string {
  return `https://github.com/${project.owner}/${project.repo}/archive/refs/${refType}/${encodeURIComponent(ref)}.zip`;
}
