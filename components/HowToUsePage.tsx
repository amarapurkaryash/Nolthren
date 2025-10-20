import React from 'react';

const StepCard: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start gap-4 p-6 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800">
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 dark:bg-violet-600 text-white font-bold text-lg">
            {number}
        </div>
        <div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">{children}</p>
        </div>
    </div>
);


const HowToUsePage: React.FC = () => {
    return (
        <section id="how-to-use" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">How to Use</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Creating a professional README with Nolthren is a simple, three-step process.
                </p>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16">
                 <div className="space-y-8">
                    <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                        <StepCard number="1" title="Provide Your Repository">
                            Start by entering a GitHub username to see a list of their public repos. Alternatively, you can directly input a full repository URL (e.g., `https://github.com/user/repo`) or use the convenient shorthand format (`user/repo`).
                        </StepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                        <StepCard number="2" title="Let AI Do the Heavy Lifting">
                            Once you select a repository, Nolthren gets to work. Using Google's Gemini AI, it analyzes your entire repo—from source code and dependencies to file structure—and generates a complete, professional README in seconds.
                        </StepCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                        <StepCard number="3" title="Customize & Export">
                            Fine-tune your generated README using the powerful sidebar controls. Toggle section visibility, drag-and-drop to reorder content, and even regenerate individual sections until they're perfect. When you're happy, copy the Markdown or download the `.md` file.
                        </StepCard>
                    </div>
                 </div>
            </div>
        </section>
    );
}

export default HowToUsePage;