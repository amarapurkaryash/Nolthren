

import { GoogleGenAI, Type } from "@google/genai";
import { RepoData } from './githubService';
import { v4 as uuidv4 } from 'uuid';

export interface Section {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
  hasData: boolean;
  isPlaceholder?: boolean;
}

export interface Badge {
    id: string;
    type: 'tech' | 'stat';
    label: string;
    // For stat badges, this is the stat type (e.g., 'stars', 'forks')
    // For tech badges, it's the logo name from simple-icons
    logoOrStat: string; 
    color: string;
    isVisible: boolean;
}

interface ImportantFunction {
    path: string;
    signature: string;
}

const getAiClient = (): GoogleGenAI => {
    let apiKey: string | null = null;
    try {
        apiKey = localStorage.getItem('gemini_api_key');
    } catch (e) {
        console.warn('Could not access localStorage for Gemini API key.');
    }

    if (!apiKey) {
        throw new Error("Gemini API key not found. Please add your key to continue.");
    }
    return new GoogleGenAI({ apiKey });
};


const SECTION_MAP: Record<string, string> = {
  project_title: "Project Title",
  project_tagline: "Project Tagline",
  project_badges: "Project Badges",
  table_of_contents: "Table of Contents",
  overview: "Overview",
  tech_stack: "Tech Stack",
  key_features: "Key Features",
  key_functions: "Key Functions",
  important_files: "Important Files",
  demos: "Live Demo",
  screenshots: "Screenshots",
  videos: "Videos",
  getting_started: "Getting Started",
  usage: "Usage",
  deployment: "Deployment",
  api_reference: "API Reference",
  running_tests: "Running Tests",
  contributing: "Contributing Guidelines",
  code_of_conduct: "Code of Conduct",
  roadmap: "Roadmap",
  references: "References",
  support_the_project: "Support Us",
  license: "License",
  sponsors: "Sponsors",
  contributors: "Contributors",
  acknowledgments: "Acknowledgments",
};

const SECTION_ORDER = [
  'project_title',
  'project_tagline',
  'project_badges',
  'table_of_contents',
  'overview',
  'tech_stack',
  'key_features',
  'key_functions',
  'important_files',
  'demos',
  'screenshots',
  'videos',
  'getting_started',
  'usage',
  'deployment',
  'api_reference',
  'running_tests',
  'contributors',
  'contributing',
  'support_the_project',
  'sponsors',
  'code_of_conduct',
  'roadmap',
  'references',
  'license',
  'acknowledgments',
];

const getRepoContextPrompt = (repoData: RepoData, codeSnippets: string[] = []): string => {
  const { details, languages, contributors, fileTree, dependencyFileContents, envExampleFileContent, existingReadmeContent, sponsors, fundingFileContent } = repoData;

  const hasContributingMd = !!fileTree?.some(f => f.path.toLowerCase() === 'contributing.md');
  const hasCodeOfConductMd = !!fileTree?.some(f => f.path.toLowerCase() === 'code_of_conduct.md');

  const ownerLogin = details?.owner?.login;
  const filteredContributors = contributors?.filter(c => c.login !== ownerLogin && !c.login.endsWith('[bot]'));

  return `
--- REPOSITORY CONTEXT ---
**Core Details:**
- Name: ${details?.name || 'N/A'}
- Owner: ${ownerLogin || 'N/A'}
- Repo: ${details?.name || 'N/A'}
- Description: ${details?.description || 'N/A'}
- Project Website/Homepage: ${details?.homepage || 'N/A'}
- Stars: ${details?.stargazers_count || 0}
- Forks: ${details?.forks_count || 0}
- Open Issues: ${details?.open_issues_count || 0}
- Watchers: ${details?.subscribers_count || 0}
- License: ${details?.license?.name || 'Not specified'}
- URL: ${details?.html_url || 'N/A'}
**Project Meta Files:**
- Has CONTRIBUTING.md: ${hasContributingMd}
- Has CODE_OF_CONDUCT.md: ${hasCodeOfConductMd}
**Languages:**
${languages ? Object.entries(languages).map(([lang, bytes]) => `- ${lang}: ${bytes} bytes`).join('\n') : 'N/A'}
**Sponsors:**
${sponsors && sponsors.length > 0 ? sponsors.map(s => `- ${s.login} (${s.html_url}) (${s.avatar_url})`).join('\n') : 'No sponsors listed.'}
**Top Contributors (Owner and bots excluded):**
${filteredContributors && filteredContributors.length > 0 ? filteredContributors.map(c => `- ${c.login} (${c.html_url}) (${c.avatar_url})`).join('\n') : 'No other contributors'}
**File Structure:**
${fileTree ? fileTree.slice(0, 30).map(f => `- ${f.path} (${f.type})`).join('\n') : 'N/A'}
${fileTree && fileTree.length > 30 ? '...and more.' : ''}
**Dependency File Contents:**
${Object.entries(dependencyFileContents).map(([fileName, content]) => `\n-- ${fileName} --\n${content}`).join('\n')}
**.env.example Content:**
${envExampleFileContent || 'N/A'}
**Funding File Content (.github/FUNDING.yml):**
${fundingFileContent || 'N/A'}
**Key Function Snippets:**
${codeSnippets.length > 0 ? codeSnippets.join('\n\n') : 'N/A'}
**Existing README.md Content:**
${existingReadmeContent || 'N/A'}
--- END CONTEXT ---`;
};


const createFullPrompt = (repoData: RepoData, codeSnippets: string[]): string => {
  const repoDataContext = getRepoContextPrompt(repoData, codeSnippets);
  const sectionTitlesList = SECTION_ORDER
    .map(id => `- ${id}: "${SECTION_MAP[id]}"`).join('\n');

  return `You are an expert software engineer creating a professional README.md file.
**YOUR PRIMARY GOAL:** Generate a complete, well-structured README as a single JSON object. The markdown content for each section MUST be well-formatted and ready to render.

**AI PERSONA & TONE:** You MUST write from the perspective of the project maintainer. Your tone should be confident, knowledgeable, and welcoming to new users or contributors. Absolutely DO NOT use phrases that reveal you are an AI analyzing the code, such as "Based on the file analysis...", "This repository contains...", "The source code suggests...", or any other meta-commentary.

**GOLDEN RULE:** For every section's "content" value (EXCEPT 'project_title' and 'project_tagline'), you MUST start with an H2 heading (e.g., \`## Overview\`). This is CRITICAL for the document's structure.

**JSON FORMATTING RULES**:
- Your ENTIRE response MUST be a single, valid JSON object that strictly adheres to the schema.
- Do NOT include any text, explanations, or markdown outside of the main JSON object.
- The "content" key must contain a valid JSON string. This means all special characters, including newlines, must be properly escaped (e.g., use \\n for newlines, \\" for quotes).

**MANDATORY RULES for specific sections:**
1.  **project_title:**
    - The "content" value MUST be ONLY a center-aligned H1 heading: \`<h1 align="center">Project Name</h1>\`. No other text. Set "isPlaceholder" to \`false\`.
2.  **project_tagline:**
    - The "content" value MUST be ONLY a centered, brief, one-sentence tagline paragraph. No heading. Set "isPlaceholder" to \`false\`.
3.  **project_badges:**
    - This key's value MUST be a JSON array of badge objects: \`{ type: string, label: string, logoOrStat: string, color: string }\`.
    - Generate two types of badges:
      a. **'stat' badges**: For repository stats. The \`logoOrStat\` key MUST be one of: "stars", "forks", "issues", "watchers", "last-commit", "sponsors". Generate all six.
      b. **'tech' badges**: You MUST generate a 'tech' badge for EVERY SINGLE technology that you list in the \`tech_stack\` section's content. This is a critical cross-check: if a technology appears in the \`tech_stack\` list, it MUST have a corresponding badge here, regardless of its category. The \`logoOrStat\` key MUST be the simple-icons slug (e.g., "react", "tailwindcss", "googlecloud").
    - **COLOR RULE:** For EACH badge's \`color\` property, you MUST select a hex color code (without '#') from this list: ['34D399', 'FBBF24', 'F87171', '60A5FA', 'A78BFA', 'EC4899', '2DD4BF', 'FB923C']. Cycle through them.
4.  **sponsors:**
    - MUST start with \`## Sponsors\`.
    - **Source Hierarchy & Logic:**
      a. **Primary Source (API):** First, check the "Sponsors" list from the context. If it contains sponsors, you MUST render their avatars.
      b. **Secondary Source (README):** If the API list is empty, scan the "Existing README.md Content". Look for either an explicit list of sponsors (with links/images) or a sentence mentioning the *number* of sponsors (e.g., "We are supported by 15 sponsors.").
    - **Display Rules:**
      a. **Avatar Display (Priority):** If you have a list of sponsors (from the API or parsed from the README), you MUST create a \`<div class="gemini-sponsors">\` element. Inside this div, add an \`<a>\` tag for each sponsor, linking to their profile, with an \`<img>\` tag for their avatar. Use the exact login, html_url, and avatar_url from the context if available. Each \`<img>\` tag MUST have \`width="48"\` and \`height="48"\`.
      b. **Number Display (Fallback):** If you cannot find a list of sponsors but find a *number* of sponsors mentioned in the README, generate a sentence like "This project is proudly supported by [Number] sponsors."
    - **Finalization:**
      - If you render either avatars or the sponsor count, start with a friendly paragraph thanking them and set "isPlaceholder" to \`false\`.
      - If no sponsors are found from any source, generate a helpful placeholder message (e.g., "Become a sponsor for this project and get your logo on our README!") and set "isPlaceholder" to \`true\`.
5.  **contributors:**
    - MUST start with \`## Contributors\`.
    - Start with a friendly paragraph thanking the contributors.
    - **CRITICAL:** If the "Top Contributors" list in the context is NOT empty, you MUST create a \`<div class="gemini-contributors">\` element. Inside this div, you MUST add an \`<a>\` tag for each contributor, linking to their profile. Inside each \`<a>\` tag, there must be an \`<img>\` tag for their avatar. Use the exact login, html_url, and avatar_url from the context.
    - **CRITICAL STYLING FOR GITHUB:** Each \`<img>\` tag inside the link MUST have the following attributes: \`width="48"\` and \`height="48"\`.
    - If contributor data exists, set "isPlaceholder" to \`false\`.
    - If the "Top Contributors" list is empty, return an empty string "" for "content" and set "isPlaceholder" to \`true\`.
6.  **tech_stack:**
    - MUST start with \`## Tech Stack\`.
    - Analyze the repository context (dependency files, source code, file names) to identify all significant technologies.
    - Group the technologies into the following categories using H3 markdown headings (\`###\`): \`Languages\`, \`Frameworks & Runtimes\`, \`Libraries & Dependencies\`, \`APIs & Services\`, \`AI/ML\`, \`Deployment & Hosting\`, and \`Developer Tools\`.
    - Only include a category heading if you find relevant technologies for it.
    - Under each heading, list the technologies using a simple Markdown bulleted list. DO NOT use HTML \`<img>\` badges here.
7.  **key_features:**
    - MUST start with \`## Key Features\`.
    - Describe the project's primary features and capabilities in a high-level, user-focused manner in plain English.
    - **CRITICAL:** DO NOT mention specific function names, file paths, or include any code snippets in this section. Focus on what the project *does* for the end-user.
8.  **key_functions**:
    - MUST start with \`## Key Functions\`.
    - Use the provided "Key Function Snippets" from the context to write this section.
    - For each function, create a sub-heading (H3) with the function name and write a brief explanation of what it does and how it behaves.
    - **CRITICAL:** DO NOT include the actual code for the function in the markdown. Just describe its purpose.
    - If no snippets were provided, return an empty string "" for "content" and set "isPlaceholder" to \`true\`.
9.  **important_files:**
    - MUST start with \`## Important Files\`.
    - Present key files as a Markdown bulleted list. Each item should be the file path (in backticks) followed by a short description.
10. **demos:**
    - MUST start with \`## Live Demo\`.
    - **Source of Truth:** Your primary source is the "Project Website/Homepage" field from the context. If its value is not 'N/A', you MUST use it.
    - Your secondary source is the "Existing README.md Content". Scan it for URLs that look like live deployments (e.g., containing 'vercel.app', 'netlify.app', 'github.io', 'render.com', 'heroku.com').
    - If a valid URL is found from either source, create a section with a link to it. You can add a brief sentence like "Check out the live demo here: [Project Name](URL)".
    - If a URL is found, set "isPlaceholder" to \`false\`.
    - If no URL is found in either the homepage field or the existing README, generate a helpful placeholder message (e.g., inviting the user to add a demo link) and set "isPlaceholder" to \`true\`.
11. **screenshots:**
    - MUST start with \`## Screenshots\`.
    - DO NOT scan the context for images.
    - The content MUST be a simple placeholder paragraph, like: "This is a placeholder for your screenshots. You can add them later as you wish."
    - You MUST set "isPlaceholder" to \`true\`.
12. **videos:**
    - MUST start with \`## Videos\`.
    - DO NOT scan the context for videos.
    - The content MUST be a simple placeholder paragraph, like: "This is a placeholder for your videos or demos. You can add them later as you wish."
    - You MUST set "isPlaceholder" to \`true\`.
13. **support_the_project:**
    - MUST start with \`## Support Us\`.
    - **Source Hierarchy:** You MUST analyze sources in this order:
      1. **GitHub Sponsors Status:** Check if the "Sponsors" list in the context is populated OR if the "Funding File Content" explicitly lists \`github\`. This indicates official GitHub sponsorship is active.
      2. **Funding File & README Scan:** Analyze the "Funding File Content" and "Existing README.md Content" to find links or usernames for other sponsorship platforms. You MUST look for **GitHub Sponsors, Buy Me a Coffee, Patreon, Ko-fi, PayPal,** and other similar platforms.
    - **Display Rules:**
      - For each platform found, you MUST generate a shields.io badge wrapped in a link, using HTML \`<a>\` and \`<img>\` tags. DO NOT use markdown (\`[![...]]\`).
      - The badges MUST be grouped in a single, center-aligned div: \`<div align="center" class="gemini-badges"> ...badges... </div>\`.
      - **HTML FORMAT EXAMPLE:** \`<a href="https://www.buymeacoffee.com/USERNAME"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee"></a>\`
    - **Finalization:**
      - If you find any support information, generate the content with a brief introductory paragraph followed by the HTML div of badges, and set "isPlaceholder" to \`false\`.
      - **FALLBACK:** If NO support information is found from ANY source, generate a friendly placeholder message that encourages support, taking into account the project's license from the context (e.g., "This project is open-source under the MIT License. If you find it useful, please consider supporting its development."). Set "isPlaceholder" to \`true\`.
14. **references:**
    - MUST start with \`## References\`.
    - Analyze the tech stack from the context. Identify key technologies (frameworks, languages, major libraries, important APIs).
    - For each key technology, find its official documentation or primary resource URL.
    - Format the content as a Markdown bulleted list. Each item MUST follow this format: \`* [Technology Name](https://official-url.com/) - A brief, one-sentence description of the technology.\`
    - If you can generate meaningful references, set "isPlaceholder" to \`false\`.
    - If the tech stack is very simple or you cannot find reliable official URLs, generate a helpful placeholder message and set "isPlaceholder" to \`true\`.
15. **deployment:**
    - MUST start with \`## Deployment\`.
    - Analyze the repository context, especially dependency files (\`package.json\`), file structure (\`Dockerfile\`, \`vercel.json\`, \`netlify.toml\`), and detected frameworks.
    - Based on the analysis, recommend one or two suitable hosting platforms (e.g., Vercel, Netlify, GitHub Pages, Heroku, Render, AWS, GCP).
    - Provide a brief, high-level guide on how to deploy the project to the recommended platform(s). For example, "To deploy this project on Vercel, connect your GitHub repository and follow the on-screen instructions."
    - If you can identify a clear and common deployment path (e.g., a static site to GitHub Pages, a Next.js app to Vercel), provide more specific steps.
    - If no specific deployment method can be determined, generate a helpful placeholder message and set "isPlaceholder" to \`true\`. Otherwise, set it to \`false\`.
16. **acknowledgments:**
    - MUST start with \`## Acknowledgments\`.
    - The "content" value MUST be EXACTLY this markdown string: \`## Acknowledgments\\n\\nThis README was generated with [Nolthren](https://github.com/amarapurkaryash/Nolthren) & Gemini AI.\`
    - Set "isPlaceholder" to \`false\`.
17. **Content and Placeholder Rules:**
    - **Generated Content:** For sections where you can derive meaningful info (like 'overview', 'tech_stack', 'getting_started'), generate detailed content and set "isPlaceholder" to \`false\`.
    - **Placeholder Content:** For sections you can't get info for (like 'Roadmap'), generate helpful boilerplate text and set "isPlaceholder" to \`true\`.
    - **Inapplicable Sections:** For sections that don't apply (e.g., 'API Reference' for a simple website), return an empty string "" for "content" AND set "isPlaceholder" to \`true\`.
18. **Formatting:** Insert one blank line after every heading. Use Markdown backticks (\`) for file names, variables, or code snippets.
19. **Headings:** The "content" for each section ID below MUST start with an H2 heading that exactly matches its title:
    ${sectionTitlesList}

Now, generate the content for all sections based on the following repository context.
${repoDataContext}
`;
};

export const buildBadgeUrl = (badge: Badge, repoData: RepoData | null): string => {
    const style = 'for-the-badge';
    if (badge.type === 'tech') {
        return `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-${badge.color}?style=${style}&logo=${badge.logoOrStat}&logoColor=white`;
    }
    if (badge.type === 'stat' && repoData?.details?.owner?.login && repoData?.details?.name) {
        const owner = repoData.details.owner.login;
        const repo = repoData.details.name;
        
        const logoMap: Record<string, string> = {
            'stars': 'data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDE3LjI3TDE4LjE4IDIybC0xLjY0LTcuMDNMMjIgOS4yNGwtNy4xOS0uNjFMMTIgMiA5LjE5IDguNjMgMiA5LjI0bDYuNDYgNS55NEw2LjgyIDIyIDEyIDE3LjI3eiIvPjwvc3ZnPg==',
            'forks': 'data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNiIgeTE9IjMiIHgyPSI2IiB5Mj0iMTUiPjwvbGluZT48Y2lyY2xlIGN4PSIxOCIgY3k9IjYiIHI9IjMiPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjYiIGN5PSIxOCIgcj0iMyI+PC9jaXJjbGU+PHBhdGggZD0iTTE4IDlhOSA5IDAgMCAxLTkgOSI+PC9wYXRoPjwvc3ZnPg==',
            'watchers': 'data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDQuNUM3IDQuNSAyLjczIDcuNjEgMSAxMmMxLjczIDQuMzkgNiA3LjUgMTEgNy41czkuMjctMy4xMSAxMS03LjVDMjIuMjcgNy42MSAxNyA0LjUgMTIgNC41ek0xMiAxN2E1IDUgMCAxIDEgMC0xMCA1IDUgMCAwIDEgMCAxMHptMC04YTMgMyAwIDEgMCAwIDYgMyAzIDAgMCAwIDAgLTZ6IiAvPjwvc3ZnPg==',
            'issues': 'data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTEgMTVoLTJ2LTJoMnYyem0wLTRoLTJWN2gydjZ6Ii8+PC9zdmc+',
            'sponsors': 'data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDIxLjM1bC0xLjQ1LTEuMzJDNS40IDE1LjM2IDIgMTIuMjggMiA4LjVDMiA1LjQyIDQuNDIgMyA3LjUgM2MxLjc0IDAgMy40MS44MSA0LjUgMi4wOUMxMy4wOSAzLjgxIDE0Ljc2IDMgMTYuNSAzIDE5LjU4IDMgMjIgNS40MiAyMiA4LjVjMCAzLjc4LTMuNCA2Ljg2LTguNTUgMTEuNTRMMTIgMjEuMzV6Ii8+PC9zdmc+',
            'last-commit': 'git'
        };

        const logo = logoMap[badge.logoOrStat];
        
        if (badge.logoOrStat === 'sponsors') {
            let url = `https://img.shields.io/github/sponsors/${owner}?style=${style}&label=${encodeURIComponent(badge.label)}&color=${badge.color}`;
            if (logo) {
                url += `&logo=${encodeURIComponent(logo)}&logoColor=white`;
            }
            return url;
        }
        
        const endpoint = badge.logoOrStat === 'issues' ? 'issues-raw' : badge.logoOrStat;

        let url = `https://img.shields.io/github/${endpoint}/${owner}/${repo}?style=${style}&label=${encodeURIComponent(badge.label)}&color=${badge.color}`;
        
        if (logo) {
            url += `&logo=${encodeURIComponent(logo)}&logoColor=white`;
        }
        
        return url;
    }
    return `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-grey?style=${style}`;
};

const extractFunctionSignatures = (content: string, path: string): string[] => {
    const extension = path.split('.').pop();
    const signatures = new Set<string>();
    let regex: RegExp;

    // A simple regex-based approach. This won't be perfect but covers many common cases.
    switch (extension) {
        case 'js':
        case 'ts':
        case 'jsx':
        case 'tsx':
            // Catches: function name(...), const name = (...) =>, class { method(...) }
            regex = /(?:(export\s+)?(async\s+)?function\s+([a-zA-Z0-9_]+)\s*\(.*?\))|(?:(export\s+)?const\s+([a-zA-Z0-9_]+)\s*=\s*\(.*?\)\s*=>)|(?:(private|public|protected)?\s*(static)?\s*(async)?\s*([a-zA-Z0-9_]+)\s*\(.*?\)\s*\{)/g;
            break;
        case 'py':
            // Catches: def function_name(...)
            regex = /def\s+([a-zA-Z0-9_]+)\s*\(.*?\):/g;
            break;
        case 'java':
        case 'cs':
            // Catches: public static void main(...)
            regex = /(?:public|private|protected)\s+(?:static\s+)?\w+\s+([a-zA-Z0-9_]+)\s*\(.*?\)\s*\{?/g;
            break;
        default:
            return [];
    }
    
    // Normalize content to make regex matching easier
    const cleanedContent = content.replace(/\s+/g, ' ');
    let match;
    while ((match = regex.exec(cleanedContent)) !== null) {
        // Find the first non-null capture group which corresponds to the function name
        const signature = match[0].trim();
        if (signature) signatures.add(signature);
    }
    
    return Array.from(signatures);
};

const selectImportantFunctions = async (repoData: RepoData): Promise<ImportantFunction[]> => {
    const allSignatures: ImportantFunction[] = [];
    repoData.sourceFiles.forEach(file => {
        const signatures = extractFunctionSignatures(file.content, file.path);
        signatures.forEach(sig => allSignatures.push({ path: file.path, signature: sig }));
    });

    if (allSignatures.length === 0) {
        return [];
    }
    
    const ai = getAiClient();

    const prompt = `
        You are a code analysis expert. Given a list of function signatures from a repository, identify the 5-7 most important ones that represent the core functionality.
        Focus on business logic, key utilities, and entry points. Avoid helper functions, getters/setters, and boilerplate.
        The file path provides context. For example, functions in 'services' or 'utils' might be more important.
        
        Respond with ONLY a valid JSON array of objects, where each object has "path" and "signature" keys.
        
        Function Signatures:
        ${allSignatures.map(s => `- ${s.path}: \`${s.signature}\``).join('\n')}
    `;

    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                path: { type: Type.STRING },
                signature: { type: Type.STRING }
            },
            required: ['path', 'signature']
        }
    };

    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: schema }
        });
        
        const jsonText = result.text.trim();
        return JSON.parse(jsonText);
    } catch (e: any) {
        console.error("Failed to select important functions:", e);
        if (e.message.includes('non ISO-8859-1 code point')) {
            throw new Error('Invalid character in Gemini API key. Please ensure it is copied correctly and contains only valid characters.');
        }
        if (e.message.includes('API key not valid')) {
            throw new Error('Invalid Gemini API key. Please check your key and try again.');
        }
        return [];
    }
};

const getCodeSnippets = (repoData: RepoData, functions: ImportantFunction[]): string[] => {
    const snippets: string[] = [];
    const MAX_LINES = 40;

    functions.forEach(func => {
        const file = repoData.sourceFiles.find(f => f.path === func.path);
        if (!file) return;

        const lines = file.content.split('\n');
        const startLineIndex = lines.findIndex(line => line.includes(func.signature));
        
        if (startLineIndex > -1) {
            const extension = func.path.split('.').pop() || '';
            const endLineIndex = startLineIndex + MAX_LINES;
            let snippet = lines.slice(startLineIndex, endLineIndex).join('\n');
            if (endLineIndex < lines.length) {
                snippet += '\n// ... function truncated ...';
            }
            snippets.push(`\`\`\`${extension}\n${snippet}\n\`\`\``);
        }
    });

    return snippets;
};

const STAT_BADGE_COLORS: Record<string, string> = {
    'stars': 'FBBF24',
    'watchers': '60A5FA',
    'forks': '34D399',
    'issues': 'F87171',
    'last-commit': 'A78BFA',
    'sponsors': 'EC4899',
};

const processAndStructureBadges = (rawBadges: any[]): Badge[] => {
    // 1. Normalize stats from AI response
    let allBadges: Omit<Badge, 'id' | 'isVisible'>[] = (rawBadges || []).map((badge: any) => {
        if (badge.type === 'stat' && typeof badge.logoOrStat === 'string') {
            let normalizedStat = badge.logoOrStat.toLowerCase().replace(/\s+/g, '-');
            if (normalizedStat.includes('issue')) normalizedStat = 'issues';
            else if (normalizedStat.includes('watcher')) normalizedStat = 'watchers';
            else if (normalizedStat.includes('star')) normalizedStat = 'stars';
            else if (normalizedStat.includes('fork')) normalizedStat = 'forks';
            else if (normalizedStat.includes('commit')) normalizedStat = 'last-commit';
            else if (normalizedStat.includes('sponsor')) normalizedStat = 'sponsors';
            badge.logoOrStat = normalizedStat;
        }
        return badge;
    });

    // 2. Ensure all required stat badges are present
    const requiredStats: { logoOrStat: string; label: string }[] = [
        { logoOrStat: 'stars', label: 'Stars' },
        { logoOrStat: 'watchers', label: 'Watchers' },
        { logoOrStat: 'forks', label: 'Forks' },
        { logoOrStat: 'issues', label: 'Open Issues' },
        { logoOrStat: 'last-commit', label: 'Last Commit' },
        { logoOrStat: 'sponsors', label: 'Sponsors' },
    ];
    
    const existingStats = new Set(allBadges.filter(b => b.type === 'stat').map(b => b.logoOrStat));

    requiredStats.forEach(stat => {
        if (!existingStats.has(stat.logoOrStat)) {
            allBadges.push({
                type: 'stat',
                label: stat.label,
                logoOrStat: stat.logoOrStat,
                color: STAT_BADGE_COLORS[stat.logoOrStat] || 'grey'
            });
        }
    });

    // 3. De-duplicate the entire list to prevent issues like multiple "last commit" badges
    const uniqueBadges: Omit<Badge, 'id' | 'isVisible'>[] = [];
    const seen = new Set<string>();
    
    for (const badge of allBadges) {
        // Uniqueness is based on the type and the specific stat or tech logo
        const key = `${badge.type}:${badge.logoOrStat}`;
        
        if (!seen.has(key)) {
            uniqueBadges.push(badge);
            seen.add(key);
        }
    }

    // 4. Assign final properties (UUID, visibility, correct color)
    return uniqueBadges.map((b) => {
        const finalColor = b.type === 'stat' && STAT_BADGE_COLORS[b.logoOrStat]
            ? STAT_BADGE_COLORS[b.logoOrStat]
            : b.color;
        
        return {
            ...b,
            color: finalColor,
            id: uuidv4(),
            isVisible: true,
        };
    });
};

export const generateReadme = async (repoData: RepoData, onProgress: (stepId: string) => void): Promise<{ sections: Section[], structuredBadges: Badge[] }> => {
    // Step 4: Analyzing key functions with AI...
    onProgress('analyzing_code_with_ai');
    const importantFunctions = await selectImportantFunctions(repoData);

    // Step 5: Preparing context for generation...
    onProgress('preparing_final_prompt');
    const codeSnippets = getCodeSnippets(repoData, importantFunctions);

    // Step 6: Generating full README with AI...
    onProgress('generating_readme_with_ai');
    const ai = getAiClient();

    const badgeSchema = {
        type: Type.OBJECT,
        properties: {
            type: { type: Type.STRING },
            label: { type: Type.STRING },
            logoOrStat: { type: Type.STRING },
            color: { type: Type.STRING },
        },
        required: ['type', 'label', 'logoOrStat', 'color']
    };
    
    const sectionObjectSchema = {
        type: Type.OBJECT,
        properties: {
            content: { type: Type.STRING },
            isPlaceholder: { type: Type.BOOLEAN }
        },
        required: ['content', 'isPlaceholder']
    };

    const schema = {
        type: Type.OBJECT,
        properties: SECTION_ORDER
            .reduce((acc, key) => {
            if (key === 'project_badges') {
                acc[key] = { type: Type.ARRAY, items: badgeSchema };
            } else {
                acc[key] = sectionObjectSchema;
            }
            return acc;
        }, {} as any)
    };
    
    let result;
    try {
        result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: createFullPrompt(repoData, codeSnippets),
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        });
    } catch (e: any) {
        if (e.message.includes('non ISO-8859-1 code point')) {
            throw new Error('Invalid character in Gemini API key. Please ensure it is copied correctly and contains only valid characters.');
        }
        if (e.message.includes('API key not valid')) {
            throw new Error('Invalid Gemini API key. Please check your key and try again.');
        }
        throw e;
    }
  
    // Step 7: Structuring the final document...
    onProgress('structuring_output');
    const rawResponse = result.text.trim();
    if (!rawResponse) {
        throw new Error("Received an empty response from the AI model.");
    }
    
    let jsonText = rawResponse;

    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.substring(7, jsonText.length - 3).trim();
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.substring(3, jsonText.length - 3).trim();
    }

    const firstBraceIndex = jsonText.indexOf('{');
    const lastBraceIndex = jsonText.lastIndexOf('}');

    if (firstBraceIndex === -1 || lastBraceIndex === -1 || lastBraceIndex < firstBraceIndex) {
      console.error("Could not find a valid JSON object in the response:", rawResponse);
      throw new Error("The AI model returned an invalid format. Please try again.");
    }
    
    jsonText = jsonText.substring(firstBraceIndex, lastBraceIndex + 1);

    let parsedContent: Record<string, any>;
    try {
        parsedContent = JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse JSON response:", jsonText);
        console.error("Original model response was:", rawResponse);
        throw new Error("The AI model returned an invalid format. Please try again.");
    }

    const rawBadges = parsedContent.project_badges || [];
    const structuredBadges = processAndStructureBadges(rawBadges);

    const sections = SECTION_ORDER.map(id => {
        let content: string;
        let isPlaceholder = false;
        let hasData = false;

        if (id === 'project_badges') {
            content = ''; 
            hasData = structuredBadges.length > 0;
        } else {
            const sectionData = parsedContent[id];
            content = (sectionData?.content || '').replace(/\\n/g, '\n');
            isPlaceholder = sectionData?.isPlaceholder || false;
            hasData = content.trim() !== '';
        }

        let finalContent = content;
        if (!hasData && !isPlaceholder) {
             if (id === 'project_title') {
                finalContent = '<h1 align="center">(No Title Generated)</h1>';
            } else if (id === 'project_tagline') {
                finalContent = '<p align="center"><em>(No tagline generated. Regenerate to try again.)</em></p>';
            } else if (id !== 'project_badges') {
                finalContent = `## ${SECTION_MAP[id]}\n\n*This section could not be generated automatically. You can add content manually.*`;
            }
        }
        
        return {
            id,
            title: SECTION_MAP[id],
            content: finalContent,
            hasData,
            isVisible: true,
            isPlaceholder,
        };
    });
    
    return { sections, structuredBadges };
};

export const regenerateReadmeSection = async (repoData: RepoData, sectionId: string): Promise<string> => {
    const ai = getAiClient();

    const sectionTitle = SECTION_MAP[sectionId];
    if (!sectionTitle) {
        throw new Error(`Invalid section ID for regeneration: ${sectionId}`);
    }

    // For regeneration, we won't re-run the expensive function selection process.
    // The AI will use the initial broad context. This is a reasonable trade-off.
    const repoDataContext = getRepoContextPrompt(repoData);

    const prompt = `You are an expert software engineer updating a single section of a README.md file.
**IMPORTANT:** Write from the perspective of the project maintainer. DO NOT use phrases like "Based on the file analysis...", "This repository contains...", or any other meta-commentary.

You will be given context about a GitHub repository. Your task is to generate the Markdown content for ONLY the "${sectionTitle}" section.

**MANDATORY RULES:**
1.  Your response MUST be ONLY the Markdown content for the requested section.
2.  Do NOT include any other sections, JSON, or explanations.
3.  The content MUST start with the H2 heading: \`## ${sectionTitle}\`.
4.  Use clear, professional language and proper Markdown formatting. Use backticks (\`) for file names and code snippets.
5.  Analyze the provided repository context to generate detailed, accurate, and specific content for this section.

Now, generate the content for the "${sectionTitle}" section based on the following repository context.
${repoDataContext}
`;
    let result;
    try {
        result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
    } catch (e: any) {
        if (e.message.includes('non ISO-8859-1 code point')) {
            throw new Error('Invalid character in Gemini API key. Please ensure it is copied correctly and contains only valid characters.');
        }
        if (e.message.includes('API key not valid')) {
            throw new Error('Invalid Gemini API key. Please check your key and try again.');
        }
        throw e;
    }

    const rawContent = result.text.trim();
    if (!rawContent) {
        throw new Error(`AI returned empty content for section ${sectionId}`);
    }
    const newContent = rawContent.replace(/\\n/g, '\n');

    if (!newContent.startsWith(`## ${sectionTitle}`)) {
        return `## ${sectionTitle}\n\n${newContent}`;
    }

    return newContent;
};

export const regenerateTagline = async (repoData: RepoData): Promise<string> => {
    const ai = getAiClient();
    const repoDataContext = getRepoContextPrompt(repoData);

    const prompt = `You are an expert software engineer creating a project tagline.
**YOUR TASK:** Generate a single, brief, one-sentence tagline for a project. The tagline should be concise, catchy, and descriptive.
**RESPONSE FORMAT:** Your response MUST be ONLY the tagline text itself. Do not include any headings, markdown, or extra explanations.

Now, generate the tagline based on the following repository context.
${repoDataContext}
`;
    let result;
    try {
        result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
    } catch (e: any) {
        if (e.message.includes('non ISO-8859-1 code point')) {
            throw new Error('Invalid character in Gemini API key. Please ensure it is copied correctly and contains only valid characters.');
        }
        if (e.message.includes('API key not valid')) {
            throw new Error('Invalid Gemini API key. Please check your key and try again.');
        }
        throw e;
    }

    const rawTagline = result.text.trim();
    if (!rawTagline) {
        throw new Error(`AI returned empty content for tagline.`);
    }
    const newTagline = rawTagline.replace(/\\n/g, '\n');

    // Wrap in the required formatting
    return `<p align="center">${newTagline}</p>`;
};

export const regenerateBadges = async (repoData: RepoData): Promise<Badge[]> => {
    const ai = getAiClient();
    const repoDataContext = getRepoContextPrompt(repoData);
    
    const prompt = `You are an expert software engineer creating README badges.
**YOUR TASK:** Generate a JSON array of badge objects for a project.
**RULES:**
1.  Your ENTIRE response MUST be a single, valid JSON array that strictly adheres to the schema.
2.  Generate two types of badges:
    a. **'stat' badges**: For repository stats. The \`logoOrStat\` key MUST be one of: "stars", "forks", "issues", "watchers", "last-commit", "sponsors". Generate all six.
    b. **'tech' badges**: Analyze the repository context to identify all significant technologies (languages, frameworks, libraries, tools, APIs, etc.). You MUST generate a 'tech' badge for EVERY technology you identify, no matter its type. Your goal is to be comprehensive. The \`logoOrStat\` key MUST be the simple-icons slug (e.g., "react", "tailwindcss").
3.  **COLOR RULE:** For EACH badge's \`color\` property, you MUST select a hex color code (without '#') from this list: ['34D399', 'FBBF24', 'F87171', '60A5FA', 'A78BFA', 'EC4899', '2DD4BF', 'FB923C']. Cycle through them.

Now, generate the badges based on the following repository context.
${repoDataContext}
`;

    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                type: { type: Type.STRING },
                label: { type: Type.STRING },
                logoOrStat: { type: Type.STRING },
                color: { type: Type.STRING },
            },
            required: ['type', 'label', 'logoOrStat', 'color']
        }
    };
    
    let result;
    try {
        result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: schema }
        });
    } catch (e: any) {
        if (e.message.includes('non ISO-8859-1 code point')) {
            throw new Error('Invalid character in Gemini API key. Please ensure it is copied correctly and contains only valid characters.');
        }
        if (e.message.includes('API key not valid')) {
            throw new Error('Invalid Gemini API key. Please check your key and try again.');
        }
        throw e;
    }


    const jsonText = result.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the AI model for badges.");
    }

    try {
        const rawBadges = JSON.parse(jsonText);
        return processAndStructureBadges(rawBadges);
    } catch (e) {
        console.error("Failed to parse JSON response for badges:", jsonText);
        throw new Error("The AI model returned an invalid format for badges. Please try again.");
    }
};