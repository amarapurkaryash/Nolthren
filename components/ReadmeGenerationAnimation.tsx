import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import GithubIcon from './icons/GithubIcon';
import ZapIcon from './icons/ZapIcon';

// --- File Icons for VS Code UI ---

const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M2 4a2 2 0 012-2h5l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
    </svg>
);

const ReactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 1024 1024" fill="currentColor" {...props}>
        <path d="M640.3 512c0 102.6-43.1 193.9-128.3 193.9-85.1 0-128.3-91.3-128.3-193.9 0-102.6 43.1-193.9 128.3-193.9 85.1 0 128.3 91.3 128.3 193.9zM512 1024c-53.1 0-101.4-11.3-143.9-32.5-40.4-20.1-75.3-47.5-104-81.4-29-34.4-51.5-74.9-67-120.2-15.6-45.6-23.4-95.3-23.4-148.2s7.8-102.6 23.4-148.2c15.6-45.6 38.1-86.1 67-120.2s63.6-61.3 104-81.4C410.6 11.3 458.9 0 512 0c53.1 0 101.4 11.3 143.9 32.5 40.4 20.1 75.3 47.5 104 81.4 29 34.4 51.5 74.9 67 120.2 15.6 45.6 23.4 95.3 23.4 148.2s-7.8 102.6-23.4 148.2c-15.6-45.6-38.1-86.1-67 120.2-29 34.4-63.6 61.3-104 81.4-42.5 21.2-90.8 32.5-143.9 32.5zM512 76.8c-124.9 0-244.3 49.3-332.1 137.2-87.8 87.8-137.2 207.2-137.2 332.1s49.3 244.3 137.2 332.1c87.8 87.8 207.2 137.2 332.1 137.2s244.3-49.3 332.1-137.2c87.8-87.8 137.2-207.2 137.2-332.1s-49.3-244.3-137.2-332.1C756.3 126.1 636.9 76.8 512 76.8zM281.4 512c0 90.4 36.3 170.8 105 170.8s105-80.4 105-170.8-36.3-170.8-105-170.8-105 80.4-105 170.8z m359-211.3c-29.4-23.2-64.5-35.9-101.1-35.9-63.9 0-120.2 36.3-152.9 96.1-15.1-40.2-37.9-76-67.4-106.2-40.2-40.7-89.9-63.1-143.2-63.1-26.6 0-52.6 5.3-77.2 15.9-39.2 17.2-73.4 44.1-101.3 79.1-10.3 12.8-19.6 26.3-27.9 40.5-8.8 15.1-16.3 30.8-22.5 47.1-13 33.7-22.2 69.7-27.4 107.4-4.8 34.9-7.3 70.4-7.3 106.2 0 35.7 2.5 71.2 7.3 106.2 5.2 37.7 14.4 73.7 27.4 107.4 6.2 16.3 13.7 32 22.5 47.1 8.3 14.2 17.6 27.7 27.9 40.5 27.9 35 62.1 61.9 101.3 79.1 24.6 10.6 50.6 15.9 77.2 15.9 53.3 0 103-22.4 143.2-63.1 29.4-29.9 52.3-65.7 67.4-106.2 32.7 59.8 89 96.1 152.9 96.1 36.6 0 71.7-12.7 101.1-35.9 29.4-23.2 52-54 66.8-89.7 14.8-35.7 22.2-74.6 22.2-115.6s-7.4-79.9-22.2-115.6c-14.8-35.7-37.4-66.5-66.8-89.7z"></path>
    </svg>
);
const TSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 128 128" fill="none" {...props}>
        <path fill="#3178C6" d="M0 0h128v128H0z" />
        <path fill="#fff" d="M93.32 62.18v-5.2H71.54v38.16h5.86V67.56h15.92v-5.38zm-3.8-12.42l-2.4-5.3h-19.3v20.4h5.86V49.76h11.96l2.1 4.2 1.62 3.16h4.36l-4.2-7.36zM61.94 44.6h-17.7v5.2h5.7v32.96h5.86V49.8h6.14v-5.2z" />
    </svg>
);
const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M2 2a2 2 0 012-2h8l6 6v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm2 0v16h12V8h-6V2H4z" />
    </svg>
);

// --- Animation Content & Configuration ---
type TypingAction = string | number;

const CODE_PRESETS: Record<string, string> = {
    'src/api/api.ts': `<span class="text-pink-600 dark:text-pink-400">import</span> { createApi, fetchBaseQuery } <span class="text-pink-600 dark:text-pink-400">from</span> <span class="text-green-600 dark:text-green-400">'@reduxjs/toolkit/query/react'</span>;

<span class="text-pink-600 dark:text-pink-400">export const</span> api = createApi({
  <span class="text-sky-500 dark:text-sky-400">reducerPath</span>: <span class="text-green-600 dark:text-green-400">'api'</span>,
  <span class="text-sky-500 dark:text-sky-400">baseQuery</span>: fetchBaseQuery({ <span class="text-sky-500 dark:text-sky-400">baseUrl</span>: <span class="text-green-600 dark:text-green-400">'/api/v1/'</span> }),
  <span class="text-sky-500 dark:text-sky-400">endpoints</span>: (builder) => ({
    <span class="text-yellow-600 dark:text-yellow-400">getFeature</span>: builder.query&lt;Feature, <span class="text-teal-500 dark:text-teal-300">string</span>&gt;({
      <span class="text-sky-500 dark:text-sky-400">query</span>: (id) => <span class="text-green-600 dark:text-green-400">\`features/\${id}\`</span>,
    }),
  }),
});`,
    'src/NewFeature.tsx': `<span class="text-pink-600 dark:text-pink-400">import</span> React <span class="text-pink-600 dark:text-pink-400">from</span> <span class="text-green-600 dark:text-green-400">'react'</span>;
<span class="text-pink-600 dark:text-pink-400">import</span> { api } <span class="text-pink-600 dark:text-pink-400">from</span> <span class="text-green-600 dark:text-green-400">'./api'</span>;

<span class="text-pink-600 dark:text-pink-400">const</span> <span class="text-sky-500 dark:text-sky-400">NewFeature</span> = () => {
  <span class="text-pink-600 dark:text-pink-400">const</span> { data, isLoading } = api.useGetFeatureQuery(<span class="text-green-600 dark:text-green-400">'123'</span>);

  <span class="text-pink-600 dark:text-pink-400">if</span> (isLoading) <span class="text-pink-600 dark:text-pink-400">return</span> &lt;<span class="text-red-500 dark:text-red-400">div</span>&gt;Loading...&lt;/<span class="text-red-500 dark:text-red-400">div</span>&gt;;

  <span class="text-pink-600 dark:text-pink-400">return</span> (
    &lt;<span class="text-red-500 dark:text-red-400">div</span> <span class="text-sky-500 dark:text-sky-400">className</span>="<span class="text-green-600 dark:text-green-400">feature-card</span>"&gt;
      &lt;<span class="text-red-500 dark:text-red-400">h1</span>&gt;{data?.name}&lt;/<span class="text-red-500 dark:text-red-400">h1</span>&gt;
      &lt;<span class="text-red-500 dark:text-red-400">button</span> <span class="text-sky-500 dark:text-sky-400">disabled</span>&gt;Click Me&lt;/<span class="text-red-500 dark:text-red-400">button</span>&gt;
    &lt;/<span class="text-red-500 dark:text-red-400">div</span>&gt;
  );
};`,
    'package.json': `<span class="text-sky-500 dark:text-sky-400">"name"</span>: <span class="text-green-600 dark:text-green-400">"awesome-project"</span>,
<span class="text-sky-500 dark:text-sky-400">"version"</span>: <span class="text-green-600 dark:text-green-400">"0.1.0"</span>,
<span class="text-sky-500 dark:text-sky-400">"private"</span>: <span class="text-purple-500 dark:text-purple-400">true</span>,
<span class="text-sky-500 dark:text-sky-400">"dependencies"</span>: {
  <span class="text-sky-500 dark:text-sky-400">"react"</span>: <span class="text-green-600 dark:text-green-400">"^18.2.0"</span>,
  <span class="text-sky-500 dark:text-sky-400">"typescript"</span>: <span class="text-green-600 dark:text-green-400">"^5.0.0"</span>
}`
};

interface FileData {
    icon: React.ReactElement;
    actions?: TypingAction[];
}

const FILE_METADATA: Record<string, FileData> = {
    'src/api/api.ts': {
        icon: <TSIcon className="w-4 h-4" />,
        actions: [-4, 500, 'v2/\'']
    },
    'src/NewFeature.tsx': {
        icon: <ReactIcon className="w-4 h-4 text-sky-400" />,
        actions: [-9]
    },
    'package.json': {
        icon: <FileIcon className="w-4 h-4 text-yellow-400" />,
    },
    '.gitignore': {
        icon: <FileIcon className="w-4 h-4 text-gray-500" />,
    },
    'README.md': {
        icon: <FileIcon className="w-4 h-4 text-blue-400" />,
    }
};

interface FileTreeNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: FileTreeNode[];
}

const FILE_TREE_STRUCTURE: FileTreeNode[] = [
  { name: 'src', path: 'src', type: 'folder', children: [
    { name: 'api', path: 'src/api', type: 'folder', children: [
      { name: 'api.ts', path: 'src/api/api.ts', type: 'file' }
    ]},
    { name: 'NewFeature.tsx', path: 'src/NewFeature.tsx', type: 'file' }
  ]},
  { name: '.gitignore', path: '.gitignore', type: 'file' },
  { name: 'package.json', path: 'package.json', type: 'file' },
  { name: 'README.md', path: 'README.md', type: 'file' },
];

const EDITABLE_FILES = ['src/api/api.ts', 'src/NewFeature.tsx'];
const OPEN_TABS = ['src/api/api.ts', 'src/NewFeature.tsx', 'package.json'];


const GIT_COMMANDS = [
    { command: 'git init -b main', output: '<span class="text-gray-500 dark:text-gray-400">Initialized empty Git repository in /Users/dev/awesome-project/.git/</span>', delay: 500 },
    { command: 'git add .', output: '', delay: 300 },
    { command: 'git commit -m "feat: enable feature button"', output: '<span class="text-gray-500 dark:text-gray-400">[main (root-commit) 1a2b3c4] feat: enable feature button\n 2 files changed, 20 insertions(+)</span>', delay: 800 },
    { command: 'git push origin main', output: `<span class="text-gray-500 dark:text-gray-400">Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (2/2), done.\nWriting objects: 100% (3/3), 1.20 KiB | 1.20 MiB/s, done.\nTotal 3 (delta 1), reused 0 (delta 0)\nTo github.com:nolthren-dev/awesome-project.git\n * [new branch]      main -> main</span>`, delay: 1500 }
];

const AVATAR_STYLES = ['fun-emoji', 'bottts', 'adventurer', 'micah', 'miniavs', 'identicon', 'notionists'];

const generateAvatarLinks = (count: number, type: 'contributor' | 'sponsor'): string => {
    let links = '';
    for (let i = 0; i < count; i++) {
        const style = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
        const seed = Math.random().toString(36).substring(7); // random seed
        const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&radius=50`;
        links += `<a href="#"><img src="${avatarUrl}" width="48" height="48" alt="${type}"/></a>\n`;
    }
    return links;
};

const README_HTML_CONTENT = `
<h1 align="center">Awesome-Project</h1>
<p align="center">A brief, one-sentence tagline about what this project does and why it is revolutionary.</p>
<div align="center" class="gemini-badges">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/github/stars/nolthren-dev/awesome-project?style=for-the-badge&logo=github&color=FBBF24" alt="Stars Badge">
  <img src="https://img.shields.io/github/forks/nolthren-dev/awesome-project?style=for-the-badge&logo=github&color=34D399" alt="Forks Badge">
</div>
<div style="text-align: left;">
  <h2 id="table-of-contents">Table of Contents</h2>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#sponsors">Sponsors</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
  </ul>
  <h2 id="overview">Overview</h2>
  <p>This section provides a high-level introduction to the project. It explains the problem it solves, its main purpose, and what makes it unique. It's the first thing a new user reads to understand the project's value.</p>
  <h2 id="tech-stack">Tech Stack</h2>
  <h3>Frameworks & Runtimes</h3>
  <ul>
    <li><strong>React:</strong> A JavaScript library for building user interfaces.</li>
  </ul>
  <h3>Languages</h3>
  <ul>
    <li><strong>TypeScript:</strong> A typed superset of JavaScript that compiles to plain JavaScript.</li>
  </ul>
  <h2 id="key-features">Key Features</h2>
  <ul>
    <li><strong>Intelligent Analysis:</strong> Scans your repository to identify languages and libraries.</li>
    <li><strong>Full Customization:</strong> Easily toggle sections, reorder content, and customize badges.</li>
    <li><strong>Live Preview:</strong> Instantly see your changes in a live, GitHub-style preview.</li>
  </ul>
  <h2 id="getting-started">Getting Started</h2>
  <h3>Installation</h3>
  <p>Clone the repository and install the dependencies.</p>
  <pre><code class="language-bash">git clone https://github.com/nolthren-dev/awesome-project.git
cd awesome-project
npm install</code></pre>
  <h2 id="usage">Usage</h2>
  <p>To start the development server, run the following command:</p>
  <pre><code class="language-bash">npm run dev</code></pre>
  <h2 id="deployment">Deployment</h2>
  <p>This project can be easily deployed to platforms like Vercel or Netlify by connecting your GitHub repository.</p>
  <h2 id="roadmap">Roadmap</h2>
  <ul>
    <li>[x] Core Feature Implementation</li>
    <li>[ ] Add Advanced Feature X</li>
    <li>[ ] Mobile Responsiveness</li>
  </ul>
  <h2 id="contributing">Contributing</h2>
  <p>Contributions are welcome! Please see the <code>CONTRIBUTING.md</code> file for guidelines.</p>
  <h2 id="sponsors">Sponsors</h2>
  <p>We are grateful for the support from our amazing sponsors!</p>
  <div class="gemini-sponsors">
    ${generateAvatarLinks(15, 'sponsor')}
  </div>
  <h2 id="contributors">Contributors</h2>
  <p>A huge thanks to all the contributors who have helped build this project!</p>
  <div class="gemini-contributors">
    ${generateAvatarLinks(25, 'contributor')}
  </div>
  <h2 id="license">License</h2>
  <p>This project is licensed under the MIT License. See the <a href="#">LICENSE</a> file for details.</p>
  <h2>Acknowledgments</h2>
  <p>This README was generated with <strong>Nolthren</strong> & Gemini AI.</p>
</div>
`;

// --- Custom Hooks & Helper Components ---

const useTypingEffect = (
    initialText: string,
    actions: TypingAction[], 
    start: boolean, 
    onFinished?: () => void,
    options: { typeSpeed?: number, deleteSpeed?: number } = {}
) => {
    const { typeSpeed = 30, deleteSpeed = 40 } = options;
    const [text, setText] = useState(initialText);
    const onFinishedRef = useRef(onFinished);
    onFinishedRef.current = onFinished;
    const cursorRef = useRef(-1);

    useEffect(() => {
        if (!start || !actions || actions.length === 0) {
            if (start) onFinishedRef.current?.();
            return;
        }
        
        let cursorIndex = -1;
        if (typeof actions[0] === 'number' && actions[0] < 0) {
             if (initialText.includes('v1/\'')) { // api.ts
                cursorIndex = initialText.indexOf('v1/\'');
            } else if (initialText.includes('disabled')) { // NewFeature.tsx
                cursorIndex = initialText.indexOf('disabled');
            }
        }
        
        setText(initialText);
        cursorRef.current = cursorIndex;

        let actionIndex = 0;
        let isCancelled = false;
        
        const type = () => {
            if (isCancelled || actionIndex >= actions.length) {
                onFinishedRef.current?.();
                return;
            }

            const action = actions[actionIndex];
            
            if (typeof action === 'string') {
                let charIndex = 0;
                const typeChar = () => {
                    if (isCancelled) return;
                    if (charIndex < action.length) {
                        const charToType = action[charIndex];
                        setText(currentText => {
                            if (cursorRef.current === -1) {
                                return currentText + charToType;
                            }
                            const beforeCursor = currentText.slice(0, cursorRef.current);
                            const afterCursor = currentText.slice(cursorRef.current);
                            cursorRef.current++;
                            return beforeCursor + charToType + afterCursor;
                        });
                        charIndex++;
                        setTimeout(typeChar, typeSpeed + Math.random() * 40);
                    } else {
                        actionIndex++;
                        type();
                    }
                };
                typeChar();
            } else if (action < 0) {
                let deleteCount = Math.abs(action);
                const deleteChar = () => {
                    if (isCancelled) return;
                    if (deleteCount > 0) {
                        setText(currentText => {
                            const beforeCursor = currentText.slice(0, cursorRef.current);
                            const afterCursor = currentText.slice(cursorRef.current + 1);
                            return beforeCursor + afterCursor;
                        });
                        deleteCount--;
                        setTimeout(deleteChar, deleteSpeed + Math.random() * 40);
                    } else {
                        actionIndex++;
                        type();
                    }
                };
                deleteChar();
            } else { // This is a delay (number > 0)
                setTimeout(() => {
                    actionIndex++;
                    type();
                }, action);
            }
        };
        
        setTimeout(type, 500);
        
        return () => { isCancelled = true; };
    }, [actions, start, initialText, typeSpeed, deleteSpeed]);
    
    return text;
};


// --- Animation Scene Components ---

const CodingScene: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
    const fileOrder = useMemo(() => EDITABLE_FILES, []);
    const [phase, setPhase] = useState(0);

    const activeFile = fileOrder[phase];
    const finishedTexts = useRef<Partial<Record<string, string>>>({}).current;

    const onTypingFinished = useCallback(() => {
        if (phase + 1 >= fileOrder.length) {
            onFinished();
        } else {
            setPhase(p => p + 1);
        }
    }, [phase, fileOrder, onFinished]);

    const typedText = useTypingEffect(
        activeFile ? CODE_PRESETS[activeFile] : '',
        activeFile ? FILE_METADATA[activeFile]?.actions ?? [] : [],
        !!activeFile,
        onTypingFinished
    );
    
    useEffect(() => {
        if(typedText && activeFile) {
            finishedTexts[activeFile] = typedText;
        }
    }, [typedText, finishedTexts, activeFile]);

    const getFileContent = (file: string) => {
        if (file === activeFile) {
            return typedText || CODE_PRESETS[file];
        }
        return finishedTexts[file] || CODE_PRESETS[file];
    };

    const renderFileTree = (nodes: FileTreeNode[], level = 0): React.ReactNode[] => {
        return nodes.map(node => (
            <div key={node.path}>
                <div
                    className={`flex items-center gap-2 p-1 rounded ${activeFile === node.path ? 'bg-gray-200/50 dark:bg-violet-900/30' : ''}`}
                    style={{ paddingLeft: `${(level * 1) + 0.25}rem` }}
                >
                    {node.type === 'folder'
                        ? <FolderIcon className="w-4 h-4 text-sky-400" />
                        : FILE_METADATA[node.path]?.icon
                    }
                    <span className={activeFile === node.path ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>{node.name}</span>
                </div>
                {node.children && renderFileTree(node.children, level + 1)}
            </div>
        ));
    };
    
    return (
        <div className="absolute inset-0 flex text-gray-700 dark:text-gray-300 text-sm">
            <div className="w-48 bg-gray-100/50 dark:bg-gray-800/50 p-3 flex-shrink-0">
                <p className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-3">Explorer</p>
                <div className="space-y-1">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">AWESOME-PROJECT</p>
                    <div className="space-y-0.5">
                        {renderFileTree(FILE_TREE_STRUCTURE, 1)}
                    </div>
                </div>
            </div>
            <div className="flex-grow flex flex-col min-w-0">
                <div className="flex-shrink-0 flex border-b border-gray-300 dark:border-gray-700/50">
                    {OPEN_TABS.map(filepath => {
                        const filename = filepath.split('/').pop() || filepath;
                        const fileMeta = FILE_METADATA[filepath];
                        if (!fileMeta) return null;
                        return (
                            <div key={filepath} className={`flex items-center gap-2 px-4 py-2 border-r border-gray-300 dark:border-gray-700/50 ${activeFile === filepath ? 'bg-white dark:bg-neutral-900/80 border-t-2 border-t-violet-400' : 'bg-gray-100/30 dark:bg-gray-700/30'}`}>
                                {fileMeta.icon}
                                <span className={activeFile === filepath ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>{filename}</span>
                            </div>
                        );
                    })}
                </div>
                <pre className="p-5 font-mono text-sm text-gray-800 dark:text-gray-200 h-full overflow-y-auto whitespace-pre-wrap flex-grow bg-white dark:bg-neutral-900/80">
                    {activeFile && (
                        <code className="flex flex-col">
                           <span dangerouslySetInnerHTML={{ __html: getFileContent(activeFile) + (activeFile === fileOrder[phase] ? '<span class="animate-blink">|</span>' : '') }} />
                        </code>
                    )}
                </pre>
            </div>
        </div>
    );
};


const GitScene: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
    const [lines, setLines] = useState<React.ReactElement[]>([]);
    const sceneFinished = useRef(false);
    const onFinishedRef = useRef(onFinished);
    onFinishedRef.current = onFinished;

    useEffect(() => {
        let isCancelled = false;

        const runCommands = async () => {
            let tempLines: React.ReactElement[] = [];

            for (let i = 0; i < GIT_COMMANDS.length; i++) {
                if (isCancelled) return;
                
                const cmd = GIT_COMMANDS[i];
                let currentTypedText = '';
                const lineKey = `line-${i}`;

                for (const char of cmd.command) {
                    if (isCancelled) return;
                    currentTypedText += char;
                    const newLine = <div key={lineKey}>$ {currentTypedText}<span className="animate-blink">|</span></div>;
                    setLines([...tempLines, newLine]);
                    await new Promise(res => setTimeout(res, 30 + Math.random() * 20));
                }
                
                const finalLine = <div key={lineKey}>$ {cmd.command}</div>;
                const output = cmd.output ? <div key={`output-${i}`} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: cmd.output }} /> : null;
                
                tempLines.push(finalLine);
                if(output) tempLines.push(output);
                setLines([...tempLines]);
                
                await new Promise(res => setTimeout(res, cmd.delay));
            }

            const finalPrompt = <div key="final-prompt">$ <span className="animate-blink">|</span></div>;
            tempLines.push(finalPrompt);
            setLines([...tempLines]);

            if (!isCancelled && !sceneFinished.current) {
                sceneFinished.current = true;
                setTimeout(() => onFinishedRef.current(), 1000);
            }
        };

        runCommands();

        return () => { isCancelled = true; };
    }, []);

    return (
        <pre className="absolute inset-0 p-5 font-mono text-sm overflow-y-auto whitespace-pre-wrap text-gray-800 dark:text-gray-300">
            <code>{lines}</code>
        </pre>
    );
};


const NolthrenScene: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
    const exampleUrl = "nolthren-dev/awesome-project";
    const typingActions = useMemo(() => [exampleUrl], [exampleUrl]);
    const typedUrl = useTypingEffect("", typingActions, true, onFinished, { typeSpeed: 80 });

    return (
        <div className="absolute inset-0 p-5 flex flex-col items-center justify-center">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Nolthren</h2>
            </div>
            <div className="w-full max-w-sm px-4 py-3 font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-800 dark:text-gray-200">
                {typedUrl}
                <span className="animate-blink">|</span>
            </div>
            <button className="flex items-center gap-2 rounded-md bg-violet-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all mt-6 animate-pulse">
                <ZapIcon className="w-6 h-6" />
                Generate README
            </button>
        </div>
    );
};

const AnalysisScene: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
    const [step, setStep] = useState('Fetching repo details...');
    
    useEffect(() => {
        const t1 = setTimeout(() => setStep('Analyzing key functions...'), 1200);
        const t2 = setTimeout(() => setStep('Preparing context for Gemini...'), 2400);
        const t3 = setTimeout(onFinished, 3500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onFinished]);

    return (
         <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-gray-700 dark:text-gray-300">
            <svg className="animate-spin h-10 w-10 text-violet-500 dark:text-violet-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-semibold">{step}</p>
        </div>
    );
};

interface ReadmeSceneProps {
    onFinished: () => void;
    finished?: boolean;
}

const ReadmeScene: React.FC<ReadmeSceneProps> = ({ onFinished, finished = false }) => {
    const [displayedHtml, setDisplayedHtml] = useState(finished ? README_HTML_CONTENT : '');
    const scrollRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (finished) return;
        
        let i = 0;
        let animationFrameId: number;
        
        const renderChunk = () => {
            const CHUNK_SIZE = 40;
            const nextI = Math.min(i + CHUNK_SIZE, README_HTML_CONTENT.length);
            setDisplayedHtml(README_HTML_CONTENT.substring(0, nextI));
            i = nextI;
            
            if (i < README_HTML_CONTENT.length) {
                animationFrameId = requestAnimationFrame(renderChunk);
            } else {
                setTimeout(onFinished, 2000); // Pause on the final readme before looping
            }
        };

        animationFrameId = requestAnimationFrame(renderChunk);
        return () => cancelAnimationFrame(animationFrameId);
    }, [onFinished, finished]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayedHtml]);
    
    return (
      <div className="absolute inset-0 overflow-y-auto no-scrollbar" ref={scrollRef}>
        <div className="p-6">
            <div 
              className="prose prose-sm max-w-none dark:prose-invert" 
              dangerouslySetInnerHTML={{ __html: displayedHtml + (!finished && displayedHtml.length < README_HTML_CONTENT.length ? '<span class="animate-blink text-gray-400">|</span>' : '') }}
            />
        </div>
      </div>
    );
};

// --- Main Component ---
type Scene = 'coding' | 'git' | 'nolthren' | 'analysis' | 'readme' | 'pause';

const ReadmeGenerationAnimation: React.FC = () => {
    const sceneOrder: Scene[] = useMemo(() => ['coding', 'git', 'nolthren', 'analysis', 'readme', 'pause'], []);
    const [scene, setScene] = useState<Scene>(sceneOrder[0]);

    const handleSceneFinished = useCallback(() => {
        setScene(currentScene => {
            const currentIndex = sceneOrder.indexOf(currentScene);
            const nextIndex = (currentIndex + 1) % sceneOrder.length;
            return sceneOrder[nextIndex];
        });
    }, [sceneOrder]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (scene === 'pause') {
            timer = setTimeout(handleSceneFinished, 3000);
        }
        return () => clearTimeout(timer);
    }, [scene, handleSceneFinished]);

    const getSceneTitle = () => {
        switch(scene) {
            case 'coding': return '1. A developer makes a few changes...';
            case 'git': return '2. ...and pushes them to GitHub.';
            case 'nolthren': return '3. The repo is given to Nolthren...';
            case 'analysis': return '4. ...which analyzes the repository.';
            case 'readme': return '5. A professional README is generated!';
            case 'pause': return 'Ready to start your own?';
            default: return '';
        }
    };
    
    const currentSceneComponent = useMemo(() => {
        switch (scene) {
            case 'coding': return <CodingScene onFinished={handleSceneFinished} />;
            case 'git': return <GitScene onFinished={handleSceneFinished} />;
            case 'nolthren': return <NolthrenScene onFinished={handleSceneFinished} />;
            case 'analysis': return <AnalysisScene onFinished={handleSceneFinished} />;
            case 'readme': return <ReadmeScene onFinished={handleSceneFinished} />;
            case 'pause': return <ReadmeScene onFinished={() => {}} finished={true} />;
            default: return null;
        }
    }, [scene, handleSceneFinished]);
    
    return (
        <div className="h-full w-full max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600/50 overflow-hidden animate-[fade-in-zoom_0.5s_ease-out] text-left flex flex-col">
            <div className="h-10 bg-gray-200/80 dark:bg-gray-700/80 flex items-center px-4 justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-900/50 px-3 py-1 rounded-md font-mono transition-opacity duration-300">
                   {getSceneTitle()}
                </div>
            </div>
            <div className="flex-grow min-h-0 relative">
                {currentSceneComponent}
            </div>
        </div>
    );
};

export default ReadmeGenerationAnimation;