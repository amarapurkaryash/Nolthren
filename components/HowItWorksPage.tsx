import React from 'react';
import GithubIcon from './icons/GithubIcon';

// Icons for the page, defined locally.
// New, cleaner, and more professional icons.
const SynthesisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);
const GeminiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
    </svg>
);
const ModelingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
);
const RenderingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
        <path d="M2 2l7.586 7.586"></path>
        <circle cx="11" cy="11" r="2"></circle>
    </svg>
);

const StepCard: React.FC<{ icon: React.ReactNode; number: number; title: string; children: React.ReactNode }> = ({ icon, number, title, children }) => (
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


const HowItWorksPage: React.FC = () => {
    return (
        <section id="how-it-works" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">How It Works</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Nolthren orchestrates a sophisticated pipeline to transform a simple GitHub link into a comprehensive README. Here’s a peek under the hood at our generation process.
                </p>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16">
                 <div className="space-y-8">
                    <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                        <StepCard icon={<GithubIcon className="w-8 h-8"/>} number={1} title="Deep Repository Analysis">
                            Our system initiates a deep scan of your repository, interfacing with GitHub's ecosystem to build a multi-faceted profile. It goes beyond simple file listings, creating a holistic model of your project's architecture, dependencies, and community engagement signals.
                        </StepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                        <StepCard icon={<SynthesisIcon className="w-8 h-8"/>} number={2} title="Contextual Code Synthesis">
                            Instead of brute-forcing the entire codebase, our proprietary algorithms perform contextual code synthesis. We identify and extract the most semantically significant code fragments that represent the core logic of your project, creating a compact yet powerful representation.
                        </StepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                        <StepCard icon={<GeminiIcon className="w-8 h-8"/>} number={3} title="Gemini AI Orchestration">
                            The synthesized context is passed through our AI orchestration layer. This layer dynamically constructs a series of complex instructions for Google's Gemini model, guiding its reasoning process to ensure the output is not just accurate, but also aligns with the tone of top-tier projects.
                        </StepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '400ms' }}>
                        <StepCard icon={<ModelingIcon className="w-8 h-8"/>} number={4} title="Structured Content Modeling">
                            The AI's response isn't just plain text—it's a structured content model, meticulously organized and validated. Each component of the README, from sections to badges, is treated as a distinct data object, enabling unprecedented flexibility in the final step.
                        </StepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '500ms' }}>
                        <StepCard icon={<RenderingIcon className="w-8 h-8"/>} number={5} title="Interactive Assembly & Rendering">
                            Finally, our frontend interface interactively assembles this content model into a pixel-perfect preview. Your customizations aren't superficial text edits; they directly manipulate the underlying model, ensuring every change is consistent, intelligent, and instantly reflected.
                        </StepCard>
                    </div>
                 </div>
            </div>
        </section>
    );
}

export default HowItWorksPage;