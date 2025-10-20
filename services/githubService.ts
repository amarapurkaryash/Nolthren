

export interface RepoDetails {
  name?: string;
  description?: string | null;
  homepage?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  subscribers_count?: number; // watchers
  license?: { name: string } | null;
  html_url?: string;
  owner?: { login: string };
  message?: string; // For errors like "Not Found"
}

export interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface Sponsor {
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface FileTreeItem {
    path: string;
    type: string;
}

export interface UserRepo {
  name: string;
  html_url: string;
  description: string | null;
}

export interface RepoData {
  details: RepoDetails | null;
  languages: Record<string, number> | null;
  contributors: Contributor[] | null;
  sponsors: Sponsor[] | null;
  fileTree: FileTreeItem[] | null;
  dependencyFileContents: Record<string, string>;
  sourceFiles: { path: string; content: string }[];
  envExampleFileContent: string | null;
  existingReadmeContent: string | null;
  fundingFileContent: string | null;
}

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json',
    };
    
    let token: string | null = null;

    try {
        token = localStorage.getItem('github_pat');
    } catch (e) {
        console.warn('Could not access localStorage for GitHub token.', e);
    }

    if (!token) {
        // Now mandatory to provide a token to avoid rate-limiting issues from the start.
        throw new Error("GitHub token not found. Please add your Personal Access Token to continue.");
    }
    
    headers['Authorization'] = `Bearer ${token}`;
    
    return headers;
};

const parseRepoUrl = (url: string): { owner: string; repo: string } | null => {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== 'github.com') return null;
    
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) return null;

    const [owner, repo] = pathParts;
    return { owner, repo: repo.replace('.git', '') };
  } catch (error) {
    return null;
  }
};

const safeFetch = async <T>(url: string): Promise<T | null> => {
    try {
        const response = await fetch(url, { headers: getHeaders() });
        if (response.status === 403) {
            console.warn(`GitHub API rate limit may have been exceeded for ${url}`);
             const rateLimitReset = response.headers.get('x-ratelimit-reset');
            const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset, 10) * 1000).toLocaleTimeString() : 'an hour';
            throw new Error(`GitHub API rate limit exceeded. Please try again after ${resetTime} or provide a token.`);
        }
        if (response.status === 401) { // Unauthorized
            throw new Error('Invalid GitHub token. Please check your token and try again.');
        }
        return response.json();
    } catch (error) {
        console.error(`Error during fetch for ${url}:`, error);
        if (error instanceof Error) {
            if (error.message.includes('non ISO-8859-1 code point')) {
                throw new Error('Invalid character in GitHub token. Please ensure it is copied correctly and contains only valid characters.');
            }
            if (error.message.includes('rate limit exceeded') || error.message.includes('Invalid GitHub token') || error.message.includes('GitHub token not found')) {
                throw error;
            }
        }
        return null;
    }
};

export const getUserRepos = async (username: string): Promise<UserRepo[]> => {
    if (!username.trim()) {
        throw new Error('Username cannot be empty.');
    }
    const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`;
    
    // This initial fetch can also be rate-limited, but we'll throw the specific error from safeFetch if it is.
    try {
        const response = await fetch(url, { headers: getHeaders() });
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 403) {
                const rateLimitReset = response.headers.get('x-ratelimit-reset');
                const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset, 10) * 1000).toLocaleTimeString() : 'an hour';
                throw new Error(`GitHub API rate limit exceeded. Please try again after ${resetTime} or provide a token.`);
            }
            if (response.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and try again.');
            }
            const message = data.message === 'Not Found' 
                ? `User "${username}" not found.`
                : (data.message || `An unexpected error occurred while fetching repositories.`);
            throw new Error(message);
        }
        
        return (data as any[]).filter(repo => !repo.fork);
    } catch (error) {
        console.error(`Error during fetch for ${url}:`, error);
        if (error instanceof Error && error.message.includes('non ISO-8859-1 code point')) {
            throw new Error('Invalid character in GitHub token. Please ensure it is copied correctly and contains only valid characters.');
        }
        // Re-throw the error so the UI can catch it
        throw error;
    }
};

const getSponsors = async (owner: string): Promise<Sponsor[]> => {
    const query = `
        query($owner: String!) {
          user(login: $owner) { ...sponsorFields }
          organization(login: $owner) { ...sponsorFields }
        }
        fragment sponsorFields on Sponsorable {
          sponsorshipsAsMaintainer(first: 60, orderBy: {field: CREATED_AT, direction: DESC}) {
            nodes {
              sponsorEntity {
                ... on User { login, avatarUrl, url }
                ... on Organization { login, avatarUrl, url }
              }
            }
          }
        }
    `;

    try {
        const response = await fetch(GITHUB_GRAPHQL_API, {
            method: 'POST',
            headers: { ...getHeaders(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { owner } }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid GitHub token. Please check your token and try again.');
            }
             if (response.status === 403) {
                const rateLimitReset = response.headers.get('x-ratelimit-reset');
                const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset, 10) * 1000).toLocaleTimeString() : 'an hour';
                throw new Error(`GitHub API request for sponsors failed. This may be a rate limit (resets at ${resetTime}) or a token permission issue.`);
            }
            console.error(`GraphQL request failed with status ${response.status}`);
            return [];
        }

        const json = await response.json();
        
        if (json.errors) {
            console.warn('GraphQL query returned errors:', json.errors.map((e: any) => e.message).join(', '));
        }

        if (!json.data) {
            console.error('GraphQL response did not contain a data field.');
            return [];
        }

        const sponsorships = json.data.user?.sponsorshipsAsMaintainer || json.data.organization?.sponsorshipsAsMaintainer;
        if (!sponsorships || !sponsorships.nodes) {
            return [];
        }

        return sponsorships.nodes
            .map((node: any) => node.sponsorEntity)
            .filter(Boolean)
            .map((entity: any) => ({
                login: entity.login,
                avatar_url: entity.avatarUrl,
                html_url: entity.url,
            }));

    } catch (error) {
        console.error('Error fetching sponsors via GraphQL:', error);
        if (error instanceof Error) {
            if (error.message.includes('non ISO-8859-1 code point')) {
                throw new Error('Invalid character in GitHub token. Please ensure it is copied correctly and contains only valid characters.');
            }
            if (error.message.includes('Invalid GitHub token') || error.message.includes('GitHub API request for sponsors failed') || error.message.includes('GitHub token not found')) {
                throw error;
            }
        }
        return [];
    }
};

export const getRepoData = async (repoUrl: string, onProgress: (stepId: string) => void): Promise<RepoData> => {
    const parsed = parseRepoUrl(repoUrl);
    if (!parsed) {
        throw new Error('Invalid GitHub repository URL format.');
    }
    const { owner, repo } = parsed;

    // --- Step 1: Fetching repository details... ---
    const detailsPromise = safeFetch<RepoDetails>(`${GITHUB_API_BASE}/repos/${owner}/${repo}`);
    const languagesPromise = safeFetch<Record<string, number> | { message: string }>(`${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`);
    const contributorsPromise = safeFetch<Contributor[] | { message: string }>(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=60`);
    const sponsorsPromise = getSponsors(owner);

    const [details, languagesData, contributorsData, sponsors] = await Promise.all([
        detailsPromise,
        languagesPromise,
        contributorsPromise,
        sponsorsPromise
    ]);
    
    if (!details || details?.message === 'Not Found') {
        throw new Error('Repository not found. Please check the URL or ensure it is public.');
    }

    const languages = (languagesData && !('message' in languagesData)) ? languagesData as Record<string, number> : null;
    const contributors = Array.isArray(contributorsData) ? contributorsData : null;
    
    // --- Step 2: Scanning file structure... ---
    onProgress('scanning_file_tree');
    let treeResponse: { tree: FileTreeItem[], truncated: boolean } | null = await safeFetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/main?recursive=1`);
    if (!treeResponse?.tree) {
        treeResponse = await safeFetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/master?recursive=1`);
    }
    const fileTree = treeResponse?.tree ?? [];
    if (treeResponse?.truncated) {
        console.warn("File tree was truncated. Some files may not be analyzed.");
    }
    
    // --- Step 3: Retrieving source code... ---
    onProgress('retrieving_source_code');
    let existingReadmeContent: string | null = null;
    const readmeData: { content?: string, encoding?: string } | null = await safeFetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/README.md`);
    if (readmeData?.content && readmeData.encoding === 'base64') {
        try {
            existingReadmeContent = atob(readmeData.content);
        } catch(e) { console.warn(`Could not decode base64 content for README.md`, e); }
    }

    let fundingFileContent: string | null = null;
    const fundingData: { content?: string, encoding?: string } | null = await safeFetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/.github/FUNDING.yml`);
    if (fundingData?.content && fundingData.encoding === 'base64') {
        try {
            fundingFileContent = atob(fundingData.content);
        } catch(e) { console.warn(`Could not decode base64 content for FUNDING.yml`, e); }
    }


    const dependencyFileContents: Record<string, string> = {};
    let envExampleFileContent: string | null = null;
    const sourceFiles: { path: string; content: string }[] = [];
    
    const dependencyFileNames = ['package.json', 'requirements.txt', 'pom.xml', 'build.gradle', 'Gemfile', 'go.mod', 'Cargo.toml'];
    const sourceFileExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.rs', '.cs', '.php', '.rb', '.swift', '.kt', '.m', '.cpp', '.h'];
    const MAX_SOURCE_FILES = 30;

    const filesToInspect = fileTree.filter(file => {
        if (file.type !== 'blob') return false;
        const fileName = file.path.split('/').pop() ?? '';
        
        return dependencyFileNames.includes(fileName) || 
               fileName.endsWith('.env.example') ||
               sourceFileExtensions.some(ext => fileName.endsWith(ext));
    });

    let sourceFilesFound = 0;
    const fetchPromises = filesToInspect.map(async (file) => {
        const isSourceFile = sourceFileExtensions.some(ext => file.path.endsWith(ext));
        if (isSourceFile) {
            if (sourceFilesFound >= MAX_SOURCE_FILES) return;
            sourceFilesFound++;
        }

        const fileData: { content?: string, encoding?: string } | null = await safeFetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${file.path}`);
        if (fileData?.content && fileData.encoding === 'base64') {
            try {
                const content = atob(fileData.content);
                const fileName = file.path.split('/').pop() ?? '';
                if (fileName.endsWith('.env.example')) {
                    envExampleFileContent = content;
                } else if (dependencyFileNames.includes(fileName)) {
                    dependencyFileContents[fileName] = content;
                } else if (isSourceFile) {
                    sourceFiles.push({ path: file.path, content });
                }
            } catch(e) { console.warn(`Could not decode base64 content for ${file.path}`, e); }
        }
    });

    await Promise.all(fetchPromises);
    // The next progress update will be triggered from geminiService
    
    return {
        details,
        languages,
        contributors,
        sponsors,
        fileTree,
        dependencyFileContents,
        sourceFiles,
        envExampleFileContent,
        existingReadmeContent,
        fundingFileContent,
    };
};