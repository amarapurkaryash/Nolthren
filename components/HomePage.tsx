import React, { useRef } from 'react';
import EyeIcon from './icons/EyeIcon';
import ZapIcon from './icons/ZapIcon';
import CustomizeIcon from './icons/CustomizeIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import ArrowsUpDownIcon from './icons/ArrowsUpDownIcon';
import ReadmeGenerationAnimation from './ReadmeGenerationAnimation';
import RefreshIcon from './icons/RefreshIcon';
import GithubIcon from './icons/GithubIcon';


interface HomePageProps {
  onNavigateToGenerator: () => void;
}

// Re-usable card components for this page
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: string; }> = ({ icon, title, children }) => {
    return (
        <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl border border-white/30 dark:bg-neutral-900/50 dark:border-white/10 shadow-lg h-full text-left">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-100 dark:bg-neutral-800 p-2 rounded-lg">
                    {icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{children}</p>
        </div>
    );
};

// "How to Use" Card
const HowToUseStepCard: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start gap-4 p-6 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/30 dark:bg-neutral-900/50 dark:border-white/10 shadow-lg text-left">
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-violet-600 text-gray-700 dark:text-white font-bold text-lg">
            {number}
        </div>
        <div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{children}</p>
        </div>
    </div>
);


// Icons for the "How It Works" section
const SynthesisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
);
const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/>
    </svg>
);


// Fix: Changed icon prop type from React.ReactNode to React.ReactElement to ensure it's a clonable element.
const StepCard: React.FC<{ icon: React.ReactElement; title: string; isLast?: boolean; children: React.ReactNode }> = ({ icon, title, isLast = false, children }) => (
    <div className="flex items-start">
        <div className="flex flex-col items-center mr-6">
            {/* FIX: The props of the icon element were not being inferred correctly. Using React.cloneElement with a specific cast to handle this. */}
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-violet-950/50 border-2 border-gray-200 dark:border-violet-700/50 text-gray-700 dark:text-violet-400">
                {React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })}
            </div>
            {!isLast && (
                <div className="w-0.5 h-24 bg-gray-200 dark:bg-gray-700 mt-2"></div>
            )}
        </div>
        <div className="flex-grow pt-1 text-left">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{children}</p>
        </div>
    </div>
);


const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigateToGenerator }) => {
  const howToUseRef = useRef<HTMLElement>(null);
  const howItWorksRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

  const handleScrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="fullpage-scroll-container">
        {/* Hero Section */}
        <section className="fullpage-section">
            {/* Abstract background shapes */}
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div 
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a78bfa] to-[#c084fc] opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="text-center md:text-left md:col-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                        Transform Your Code into a Masterpiece README
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Let AI craft the perfect first impression for your GitHub repository. Nolthren analyzes your code, structure, and dependencies to generate a beautiful, comprehensive, and professional README in moments.
                    </p>
                    <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
                    <button
                        onClick={onNavigateToGenerator}
                        className="flex items-center gap-2 rounded-md bg-gray-800 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-900 dark:bg-violet-600 dark:text-white dark:hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-transform hover:scale-105"
                    >
                        <ZapIcon className="w-6 h-6" />
                        Generate Your README Now
                    </button>
                    </div>
                </div>
                <div className="md:col-span-3 flex justify-center mt-10 md:mt-0">
                    <ReadmeGenerationAnimation />
                </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                <div 
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8b5cf6] to-[#d946ef] opacity-20 dark:opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
                    style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                />
            </div>
            <button onClick={() => handleScrollTo(howToUseRef)} className="scroll-down-arrow text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label="Scroll to next section">
              <ChevronDownIcon className="w-8 h-8"/>
            </button>
        </section>

        {/* How to Use Section */}
        <section ref={howToUseRef} className="fullpage-section bg-gray-100/50 dark:bg-neutral-950/20">
             <div className="max-w-3xl mx-auto px-4">
                 <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">How to Use Nolthren</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                       Creating a professional README is a simple, three-step process.
                    </p>
                </div>
                <div className="mt-16 space-y-8">
                    <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                        <HowToUseStepCard number="1" title="Provide Your Repository">
                            Start by entering a GitHub username to browse repos. Alternatively, directly input a repository URL or use the convenient shorthand format (`user/repo`).
                        </HowToUseStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                        <HowToUseStepCard number="2" title="Let AI Do the Heavy Lifting">
                           Once you select a repository, Nolthren gets to work. It uses Gemini AI to analyze your entire repo and generate a complete, professional README in seconds.
                        </HowToUseStepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                        <HowToUseStepCard number="3" title="Customize & Export">
                            Fine-tune your README using the sidebar. Toggle sections, reorder content, and regenerate parts until they're perfect. When you're ready, copy the Markdown or download the `.md` file.
                        </HowToUseStepCard>
                    </div>
                </div>
            </div>
            <button onClick={() => handleScrollTo(howItWorksRef)} className="scroll-down-arrow text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label="Scroll to next section">
              <ChevronDownIcon className="w-8 h-8"/>
            </button>
        </section>

        {/* How it Works Section */}
        <section ref={howItWorksRef} className="fullpage-section">
             <div className="max-w-3xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">How It Works</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Here’s a peek under the hood at our generation process.
                    </p>
                </div>
                <div className="max-w-xl mx-auto mt-12">
                    <div className="space-y-0">
                        <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                            <StepCard icon={<GithubIcon />} title="1. Deep Repository Analysis">
                                Nolthren fetches your repository's file structure, key source code files, dependencies, and other metadata to build a comprehensive understanding of your project.
                            </StepCard>
                        </div>
                        <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                            <StepCard icon={<SynthesisIcon />} title="2. Contextual Summary">
                                The most relevant information and code snippets are intelligently selected and summarized to create a concise context for the AI model.
                            </StepCard>
                        </div>
                        <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                            <StepCard icon={<GeminiIcon />} title="3. Gemini AI Generation" isLast={true}>
                                This context is sent to Google's Gemini AI, which generates a complete, well-structured, and professional README based on a detailed set of instructions.
                            </StepCard>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => handleScrollTo(featuresRef)} className="scroll-down-arrow text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label="Scroll to next section">
              <ChevronDownIcon className="w-8 h-8"/>
            </button>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="fullpage-section bg-gray-100/50 dark:bg-neutral-950/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Why You'll Love Nolthren
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Packed with powerful features to make README generation effortless and highly effective for any project.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="use-scroll-animation" style={{ transitionDelay: '0ms' }}><FeatureCard icon={<ZapIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Intelligent Analysis">Automatically scans your repository, identifying languages, libraries, and key files to create context-aware content.</FeatureCard></div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}><FeatureCard icon={<ShieldCheckIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Comprehensive Badges">Generates a full suite of professional tech stack and repository statistic badges to showcase your project's vitals.</FeatureCard></div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}><FeatureCard icon={<CustomizeIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Fully Customizable">Easily toggle sections, edit badge colors, and tailor every part of the generated output to your exact needs.</FeatureCard></div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}><FeatureCard icon={<RefreshIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Section Regeneration">Don't like a section? Regenerate its content with a single click without losing any of your other edits or customizations.</FeatureCard></div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '400ms' }}><FeatureCard icon={<ArrowsUpDownIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Drag-and-Drop Reordering">Effortlessly change the layout and flow of your README by dragging and dropping sections and badges in the sidebar.</FeatureCard></div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '500ms' }}><FeatureCard icon={<EyeIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Live GitHub Preview">Instantly see your changes rendered in a live, GitHub-style preview, ensuring it looks perfect before you export.</FeatureCard></div>
                </div>
            </div>
             <button onClick={() => handleScrollTo(finalCtaRef)} className="scroll-down-arrow text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label="Scroll to next section">
              <ChevronDownIcon className="w-8 h-8"/>
            </button>
        </section>

        {/* Final CTA Section */}
        <section ref={finalCtaRef} className="fullpage-section">
            <div className="max-w-2xl mx-auto px-4 use-scroll-animation">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Ready to Get Started?
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    Stop writing READMEs from scratch. Let Nolthren do the heavy lifting so you can focus on what matters most: your code.
                </p>
                <div className="mt-8">
                    <button
                        onClick={onNavigateToGenerator}
                        className="flex items-center gap-2 mx-auto rounded-md bg-gray-800 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-900 dark:bg-violet-600 dark:text-white dark:hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-transform hover:scale-105"
                    >
                        <ZapIcon className="w-6 h-6" />
                        Generate Your README Now
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default HomePage;