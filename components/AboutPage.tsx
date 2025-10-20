import React from 'react';
import GithubIcon from './icons/GithubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import LinkIcon from './icons/LinkIcon';

// --- Components and Icons for the new sections ---

// "How to Use" Card
const HowToUseStepCard: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-900/80 rounded-xl border border-gray-200 dark:border-neutral-800">
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 dark:bg-violet-600 text-white font-bold text-lg">
            {number}
        </div>
        <div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{children}</p>
        </div>
    </div>
);

// Icons for "How It Works"
const SynthesisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);
const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
    </svg>
);
const ModelingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
);
const RenderingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>
    </svg>
);

// "How It Works" Card
const HowItWorksStepCard: React.FC<{ icon: React.ReactNode; number: number; title: string; children: React.ReactNode }> = ({ icon, number, title, children }) => (
    <div className="flex items-start gap-6">
        <div className="flex flex-col items-center">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-violet-400 border border-gray-200 dark:border-neutral-700 shadow-sm">
                {icon}
            </div>
            {number < 5 && (
                <div className="w-px h-20 bg-gray-200 dark:bg-neutral-700 mt-4"></div>
            )}
        </div>
        <div className="pt-4">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">{number}. {title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{children}</p>
        </div>
    </div>
);


const AboutPage: React.FC = () => {
    return (
        <section id="about" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">About Nolthren</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Nolthren is a smart README generator that uses Google's Gemini AI to analyze your GitHub repository and create a professional, comprehensive, and customizable README.md file in seconds.
                </p>
            </div>

             <div className="max-w-3xl mx-auto mt-16 use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight text-center mb-10">How to Use</h2>
                <div className="space-y-8">
                    <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                        <HowToUseStepCard number="1" title="Provide Your Repository">
                            Start by entering a GitHub username to see a list of their public repos. Alternatively, you can directly input a full repository URL (e.g., `https://github.com/user/repo`) or use the convenient shorthand format (`user/repo`).
                        </HowToUseStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                        <HowToUseStepCard number="2" title="Let AI Do the Heavy Lifting">
                            Once you select a repository, Nolthren gets to work. Using Google's Gemini AI, it analyzes your entire repo—from source code and dependencies to file structure—and generates a complete, professional README in seconds.
                        </HowToUseStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                        <HowToUseStepCard number="3" title="Customize & Export">
                            Fine-tune your generated README using the powerful sidebar controls. Toggle section visibility, drag-and-drop to reorder content, and even regenerate individual sections until they're perfect. When you're happy, copy the Markdown or download the `.md` file.
                        </HowToUseStepCard>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-20 use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight text-center mb-10">How It Works</h2>
                <div className="space-y-8">
                    <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                        <HowItWorksStepCard icon={<GithubIcon className="w-8 h-8"/>} number={1} title="Deep Repository Analysis">
                            Nolthren fetches key details from your repository using the GitHub API. This includes file structure, source code from important files, dependencies (like `package.json`), and metadata such as contributors and license information.
                        </HowItWorksStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                        <HowItWorksStepCard icon={<SynthesisIcon className="w-8 h-8"/>} number={2} title="Contextual Summary">
                           To stay within context limits, we intelligently select the most relevant code snippets that represent the project's core functionality. This collected information is then summarized and prepared for the AI.
                        </HowItWorksStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                        <HowItWorksStepCard icon={<GeminiIcon className="w-8 h-8"/>} number={3} title="Gemini AI Generation">
                            This summarized context is sent to Google's Gemini model with a detailed prompt. The AI is instructed to generate content for each README section, acting as a project maintainer and following best practices.
                        </HowItWorksStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '400ms' }}>
                        <HowItWorksStepCard icon={<ModelingIcon className="w-8 h-8"/>} number={4} title="Structured Output">
                           The AI returns the generated content in a structured JSON format. This allows us to separate each section (like "Overview" or "Tech Stack") and handle them as individual, editable components.
                        </HowItWorksStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '500ms' }}>
                        <HowItWorksStepCard icon={<RenderingIcon className="w-8 h-8"/>} number={5} title="Interactive UI">
                            The structured data is then rendered in the Nolthren interface, where you can see a live preview and use the sidebar to customize, reorder, or regenerate any part of the document before exporting the final Markdown.
                        </HowItWorksStepCard>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-20 use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight text-center mb-10">Meet the Creator</h2>
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <img
                                src="https://github.com/amarapurkaryash.png"
                                alt="Yash Amarapurkar"
                                className="w-32 h-32 rounded-full shadow-lg border-4 border-white dark:border-neutral-800"
                            />
                        </div>

                        {/* Text content */}
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Yash Amarapurkar</h3>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                <a
                                    href="https://github.com/amarapurkaryash"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                                >
                                    <GithubIcon className="w-5 h-5" />
                                    Follow me on GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/amarapurkaryash"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                                >
                                    <LinkedInIcon className="w-5 h-5" />
                                    Connect on LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-16 use-scroll-animation" style={{ transitionDelay: '400ms' }}>
                 <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Open Source & Project Status</h2>
                    <div className="mt-3 text-gray-600 dark:text-gray-300 space-y-3 text-left">
                        <p>
                            This project is completely open-source. You are welcome to explore the code, suggest features, or submit pull requests.
                        </p>
                        <p>
                           This is a stable release that has undergone testing. While we strive to provide a bug-free experience, should you encounter any issues, please report them by <a href="https://github.com/amarapurkaryash/Nolthren/issues" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">raising an issue on GitHub</a>.
                        </p>
                        <p>
                            Please note that this project is not under continuous, active maintenance. Updates will not be released on a fixed schedule. We will prioritize critical bug fixes and consider major updates as they arise, but we do not promise ongoing support or a fixed development roadmap.
                        </p>
                    </div>
                    <a href="https://github.com/amarapurkaryash/Nolthren" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 dark:bg-violet-500 dark:hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all">
                        <GithubIcon className="w-5 h-5 text-white" />
                        View on GitHub
                    </a>
                </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16 use-scroll-animation" style={{ transitionDelay: '500ms' }}>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight text-center mb-10">Contributing & License</h2>
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm space-y-4 text-gray-600 dark:text-gray-300">
                    <p>While this project is not actively maintained, we still welcome community contributions. Please be aware that response and review times for pull requests may be long. If you'd like to contribute, here are the general guidelines:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Report a Bug:</strong> If you find an issue, please <a href="https://github.com/amarapurkaryash/Nolthren/issues" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">create an issue</a> and describe the problem in as much detail as possible.</li>
                        <li><strong>Suggest a Feature:</strong> Have a great idea? We'd love to hear it! Feel free to <a href="https://github.com/amarapurkaryash/Nolthren/discussions" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">start a discussion</a>.</li>
                        <li><strong>Submit a Pull Request:</strong>
                            <ol className="list-decimal list-inside pl-4 mt-2 space-y-1">
                                <li>Fork the repository to your own GitHub account.</li>
                                <li>Create a new branch for your feature or bug fix.</li>
                                <li>Make your changes and commit them with a clear message.</li>
                                <li>Push your branch and open a pull request.</li>
                            </ol>
                        </li>
                    </ul>
                    <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">License & Attribution</h3>
                         <p className="mt-2">
                            Nolthren is released under the <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">Creative Commons Attribution–NonCommercial 4.0 (CC BY-NC 4.0)</a> license.
                        </p>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30">
                                    <span className="font-bold text-sm text-green-700 dark:text-green-300">✓</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">Use, Modify, Share</p>
                                    <p className="text-gray-600 dark:text-gray-400">You are free to use, modify, and share the code.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center ring-1 ring-inset ring-yellow-600/20 dark:ring-yellow-500/30">
                                    <span className="font-bold text-sm text-yellow-700 dark:text-yellow-300">!</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">Must Credit</p>
                                    <p className="text-gray-600 dark:text-gray-400">You must provide attribution and credit the original project.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center ring-1 ring-inset ring-red-600/20 dark:ring-red-500/30">
                                    <span className="font-bold text-sm text-red-700 dark:text-red-300">×</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">Non-Commercial</p>
                                    <p className="text-gray-600 dark:text-gray-400">You cannot use it for commercial purposes (no selling, no paid services, no closed-source use).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutPage;
