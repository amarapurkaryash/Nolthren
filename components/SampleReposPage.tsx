import React, { useState, useEffect } from 'react';
import ReadmeDisplay from './ReadmeDisplay';

const SAMPLE_README_CONTENT = `<h1 align="center">Awesome-Project</h1>
<p align="center">A brief, one-sentence tagline about what this project does and why it is revolutionary.</p>
<div align="center" class="gemini-badges">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/github/stars/nolthren-dev/awesome-project?style=for-the-badge&logo=github&color=FBBF24" alt="Stars Badge">
  <img src="https://img.shields.io/github/forks/nolthren-dev/awesome-project?style=for-the-badge&logo=github&color=34D399" alt="Forks Badge">
</div>

## Table of Contents
* [Overview](#overview)
* [Tech Stack](#tech-stack)
* [Key Features](#key-features)
* [Key Functions](#key-functions)
* [Important Files](#important-files)
* [Live Demo](#live-demo)
* [Screenshots](#screenshots)
* [Videos](#videos)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Deployment](#deployment)
* [API Reference](#api-reference)
* [Running Tests](#running-tests)
* [Contributors](#contributors)
* [Contributing Guidelines](#contributing-guidelines)
* [Support Us](#support-us)
* [Sponsors](#sponsors)
* [Code of Conduct](#code-of-conduct)
* [Roadmap](#roadmap)
* [References](#references)
* [License](#license)
* [Acknowledgments](#acknowledgments)

## Overview
This section provides a high-level introduction to the project. It explains the problem it solves, its main purpose, and what makes it unique. It's the first thing a new user reads to understand the project's value.

## Tech Stack
### Frameworks & Runtimes
* **React:** A JavaScript library for building user interfaces.

### Languages
* **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

### Developer Tools
* **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects.
* **ESLint:** A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Key Features
* **Intelligent Analysis:** Scans your repository to identify languages and libraries.
* **Full Customization:** Easily toggle sections, reorder content, and customize badges.
* **Live Preview:** Instantly see your changes in a live, GitHub-style preview.

## Key Functions
### \`useAnalytics()\`
A custom React hook that provides a simple interface for tracking user events and page views throughout the application. It abstracts away the underlying analytics provider.

### \`calculateScore()\`
A core utility function located in \`src/utils/calculations.ts\` that takes user data as input and returns a numerical score based on a proprietary algorithm.

## Important Files
* \`src/main.tsx\`: The main entry point of the application.
* \`src/App.tsx\`: The root React component that sets up routing and global context.
* \`vite.config.ts\`: Configuration file for the Vite build tool.
* \`package.json\`: Lists the project dependencies and scripts.

## Live Demo
Check out the live demo of the project deployed on Vercel.
[https://awesome-project.vercel.app](https://awesome-project.vercel.app)

## Screenshots
This is a placeholder for your screenshots. You can add them later as you wish.

## Videos
This is a placeholder for your videos or demos. You can add them later as you wish.

## Getting Started
### Installation
Clone the repository and install the dependencies.
\`\`\`bash
git clone https://github.com/nolthren-dev/awesome-project.git
cd awesome-project
npm install
\`\`\`

## Usage
To start the development server, run the following command:
\`\`\`bash
npm run dev
\`\`\`

## Deployment
This project can be easily deployed to platforms like Vercel or Netlify by connecting your GitHub repository.

## API Reference
This project does not expose a public API. If this were a library, this section would detail the functions, classes, and methods available to consumers.

## Running Tests
To run the test suite, use the following command:
\`\`\`bash
npm test
\`\`\`

## Contributors
A huge thanks to all the contributors who have helped build this project!
<div class="gemini-contributors">
<a href="#"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=ContribSeed1&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=ContribSeed2&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/adventurer/svg?seed=ContribSeed3&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/micah/svg?seed=ContribSeed4&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/miniavs/svg?seed=ContribSeed5&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/identicon/svg?seed=ContribSeed6&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=ContribSeed7&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=ContribSeed8&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=ContribSeed9&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/adventurer/svg?seed=ContribSeed10&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/micah/svg?seed=ContribSeed11&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/miniavs/svg?seed=ContribSeed12&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/identicon/svg?seed=ContribSeed13&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=ContribSeed14&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=ContribSeed15&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=ContribSeed16&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/adventurer/svg?seed=ContribSeed17&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/micah/svg?seed=ContribSeed18&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/miniavs/svg?seed=ContribSeed19&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/identicon/svg?seed=ContribSeed20&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=ContribSeed21&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=ContribSeed22&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=ContribSeed23&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/adventurer/svg?seed=ContribSeed24&radius=50" width="48" height="48" alt="contributor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/micah/svg?seed=ContribSeed25&radius=50" width="48" height="48" alt="contributor"/></a>
</div>

## Contributing Guidelines
Contributions are welcome! Please see the \`CONTRIBUTING.md\` file for guidelines.

## Support Us
If you find this project useful, please consider supporting its development.
<div align="center" class="gemini-badges">
<a href="https://www.buymeacoffee.com/your-username"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee"></a>
<a href="https://www.patreon.com/your-username"><img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon"></a>
</div>

## Sponsors
We are grateful for the support from our amazing sponsors!
<div class="gemini-sponsors">
<a href="#"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=SponsorSeed1&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=SponsorSeed2&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/adventurer/svg?seed=SponsorSeed3&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/micah/svg?seed=SponsorSeed4&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/miniavs/svg?seed=SponsorSeed5&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/identicon/svg?seed=SponsorSeed6&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=SponsorSeed7&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=SponsorSeed8&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=SponsorSeed9&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/adventurer/svg?seed=SponsorSeed10&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/micah/svg?seed=SponsorSeed11&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/miniavs/svg?seed=SponsorSeed12&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/identicon/svg?seed=SponsorSeed13&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=SponsorSeed14&radius=50" width="48" height="48" alt="sponsor"/></a>
<a href="#"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=SponsorSeed15&radius=50" width="48" height="48" alt="sponsor"/></a>
</div>

## Code of Conduct
Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## Roadmap
- [x] Core Feature Implementation
- [ ] Add Advanced Feature X
- [ ] Mobile Responsiveness

## References
* [React Documentation](https://react.dev/) - Official documentation for the React library.
* [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official documentation for the TypeScript language.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/amarapurkaryash/Nolthren/blob/main/LICENSE) file for details.

## Acknowledgments
This README was generated with **Nolthren** & Gemini AI.`;

const SAMPLES = [
  {
    title: 'Awesome Project: A Modern Web App',
    description: 'This is a sample README generated for a fictional modern web application. It showcases every possible section that Nolthren can generate, demonstrating the comprehensive quality and structure of the output.',
    content: SAMPLE_README_CONTENT,
  },
  // More samples can be added here in the future
];

const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);


const SampleReadme: React.FC<{ title: string; description: string; content: string; }> = ({ title, description, content }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
        <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
      </div>
      <div>
        <ReadmeDisplay readmeContent={content} isBare={true} />
      </div>
    </div>
  );
};

const SampleReposPage: React.FC = () => {
    const [isNoticeVisible, setIsNoticeVisible] = useState(true);

    useEffect(() => {
        if (isNoticeVisible) {
            const timer = setTimeout(() => {
                setIsNoticeVisible(false);
            }, 10000); // Notice disappears after 10 seconds

            return () => clearTimeout(timer);
        }
    }, [isNoticeVisible]);

    return (
        <section id="samples" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Sample README</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Explore a README generated by Nolthren. See the quality and comprehensive structure you can expect for a well-documented project.
                </p>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16">
                 {/* Auto-closing notice banner */}
                 <div className={`transition-all duration-500 ease-in-out ${isNoticeVisible ? 'opacity-100 max-h-40 mb-8' : 'opacity-0 max-h-0 mb-0 invisible overflow-hidden'}`}>
                    <div className="p-4 bg-gray-100 dark:bg-neutral-900/50 border-l-4 border-gray-500 dark:border-violet-500 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm flex items-start gap-3" role="alert">
                      <InfoIcon className="w-6 h-6 flex-shrink-0 text-gray-600 dark:text-violet-400 mt-0.5" />
                      <div>
                        <h3 className="font-bold">Heads up! This is a Sample README</h3>
                        <p className="text-sm">
                          This README was generated by Nolthren to showcase what's possible. This message will automatically disappear.
                        </p>
                      </div>
                    </div>
                </div>
                 
                 <div className="grid grid-cols-1 gap-12">
                     {SAMPLES.map((sample) => (
                         <div key={sample.title}>
                            <SampleReadme {...sample} />
                         </div>
                     ))}
                 </div>
            </div>
        </section>
    );
};

export default SampleReposPage;
