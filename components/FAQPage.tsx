import React, { useState } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
  startOpen?: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div className="border-b border-gray-200 dark:border-neutral-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">{question}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <div className="pb-5 text-gray-600 dark:text-gray-300 space-y-4 prose prose-sm max-w-none dark:prose-invert prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:font-semibold hover:prose-a:underline">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};

const FAQPage: React.FC = () => {
    return (
        <section id="faq" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Frequently Asked Questions</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Have questions? We've got answers. If you can't find what you're looking for, feel free to open an issue on our GitHub repository.
                </p>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16 use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                <div className="bg-white dark:bg-neutral-900 p-4 sm:p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                    {/* --- General Questions --- */}
                    <FAQItem question="What is Nolthren?" startOpen={true}>
                        <p>
                            Nolthren is an AI-powered tool designed to automatically generate high-quality, professional README.md files for GitHub repositories. It intelligently analyzes your code, file structure, and dependencies to create comprehensive documentation, saving you valuable time and effort.
                        </p>
                    </FAQItem>
                    <FAQItem question="What makes it different from other tools?">
                        <p>
                            Unlike simple template fillers, Nolthren performs a deep analysis of your actual source code. It uses this context to generate genuinely relevant content for sections like "Key Features" and "Tech Stack". Combined with its full customizability (drag-and-drop, section regeneration) and the power of Google's Gemini AI, it produces a much more tailored and accurate result.
                        </p>
                    </FAQItem>
                    <FAQItem question="Is it free to use?">
                        <p>
                           Yes, the Nolthren application is completely free to use. To ensure reliable and high-quality generation, it operates on a "Bring Your Own Keys" model. You'll need to provide your own free API keys from GitHub and Google AI. Both services offer generous free tiers that are more than sufficient for most personal and professional use cases.
                        </p>
                    </FAQItem>

                    {/* --- API Keys & Security --- */}
                    <FAQItem question="Why do I need to provide API keys?">
                       <p>
                           API keys are essential for Nolthren to communicate with the services it relies on. See our <strong>API Keys Guide</strong> from the main navigation for detailed instructions.
                        </p>
                       <ul>
                           <li>
                               <strong>GitHub Token:</strong> GitHub heavily limits unauthenticated API requests (~60 per hour). Analyzing a repository requires many requests, so this limit is hit quickly. Providing a Personal Access Token (PAT) increases your limit to <strong>5,000 requests per hour</strong>, enabling smooth analysis of any public repository.
                           </li>
                           <li>
                               <strong>Gemini API Key:</strong> Content generation is powered by Google's Gemini AI. A free API key from Google AI is required to perform the analysis and generate the README text.
                           </li>
                       </ul>
                    </FAQItem>
                     <FAQItem question="Are my API keys secure?">
                        <p>
                           <strong>Absolutely.</strong> Security is our top priority. Your API keys are stored <strong>exclusively in your browser's local storage</strong>.
                        </p>
                         <ul>
                           <li>They are <strong>never</strong> sent to Nolthren's servers or any third party.</li>
                           <li>They are only used to communicate directly from your browser to the GitHub and Google APIs.</li>
                           <li>You are in full control and can clear them at any time from the API Keys modal (key icon in the top right) or your browser's developer tools.</li>
                       </ul>
                    </FAQItem>

                    {/* --- Usage & Customization --- */}
                    <FAQItem question="How can I improve the generated README?">
                       <p>
                           The AI-generated content is an excellent starting point, but you have full control to perfect it!
                       </p>
                       <ul>
                           <li>
                               <strong>Regenerate:</strong> Not happy with a section? Click the <strong>refresh icon</strong> next to it in the sidebar to have the AI try again.
                           </li>
                           <li>
                               <strong>Customize:</strong> Use the sidebar to toggle section visibility, reorder content with drag-and-drop, and change badge colors.
                           </li>
                           <li>
                               <strong>Manually Edit:</strong> The final output is just Markdown. You can copy it and make any final tweaks in your favorite text editor.
                           </li>
                       </ul>
                    </FAQItem>
                     <FAQItem question="Why can't some sections be regenerated?">
                        <p>
                           Some sections are intentionally non-regenerable for a few key reasons:
                        </p>
                       <ul>
                           <li>
                               <strong>Project Title:</strong> This is directly taken from your repository's name. There's nothing for the AI to creatively regenerate.
                           </li>
                           <li>
                               <strong>Table of Contents:</strong> This section is built automatically from the other sections you have visible. It updates as you toggle or reorder sections, so it doesn't need AI regeneration.
                           </li>
                            <li>
                               <strong>Acknowledgments:</strong> This is a static section that gives credit to Nolthren and is not meant to be changed.
                           </li>
                       </ul>
                    </FAQItem>
                    <FAQItem question="Why isn't there a regenerate option for badges?">
                        <p>
                           There is! You can regenerate the entire set of badges. The option is located in the <strong>"Sections"</strong> tab of the sidebar. Find the <strong>"Project Badges"</strong> item in the list and click the refresh icon next to it.
                        </p>
                        <p>
                            This will trigger the AI to re-analyze your repository's technologies and stats, generating a fresh set of badges. We placed it there to keep all AI-driven regeneration actions in one consistent place.
                        </p>
                    </FAQItem>
                    <FAQItem question="Why doesn't Nolthren automatically add screenshots or videos?">
                        <p>
                            This is a deliberate design choice. Our AI analyzes code, but it can't actually run your project, interact with a user interface, or know which features are visually important to record. This creative step is best left to you, the developer. We provide a placeholder section to make it easy to add your own visuals later.
                        </p>
                    </FAQItem>
                    <FAQItem question="Why isn't there an AI chat editor to build the README step-by-step?">
                        <p>
                            This is a deliberate design choice focused on providing structure, speed, and consistency. While a chat assistant is powerful, our current "structured generator" approach offers several key advantages for documentation:
                        </p>
                        <ul>
                            <li>
                                <strong>Professional Structure:</strong> Our generator guarantees a well-organized, comprehensive README that follows community best practices. A chat interface could lead to inconsistent or incomplete results.
                            </li>
                            <li>
                                <strong>Speed and Token Efficiency:</strong> Nolthren gives you a complete draft in one go. A back-and-forth chat process would be much slower and consume significantly more API tokens. The "Regenerate" button already allows for AI-powered refinement without the waste.
                            </li>
                            <li>
                                <strong>It's a Generator, Not a General LLM:</strong> Nolthren is a specialized tool for analyzing repositories and creating structured documents. It's not a general-purpose chatbot like Gemini, ChatGPT, or Claude.
                            </li>
                            <li>
                                <strong>Use the Best Tool for the Job:</strong> For advanced conversational editing, you can get the best of both worlds! Simply copy the Markdown from Nolthren and paste it into your favorite AI chatbot. They are optimized for that kind of task and can refine the text even further.
                            </li>
                        </ul>
                        <p>
                            We believe this structured-first approach provides the best possible starting point, which you can then fine-tune with our powerful customization tools or your favorite AI chat assistant.
                        </p>
                    </FAQItem>
                    <FAQItem question="Why doesn't Nolthren add animated GitHub stats cards?">
                        <p>
                            We prioritize clean, official, and reliable badges. The popular animated stats cards are generated by external, third-party services which can add clutter, create a dependency that might slow down your README's load time, or even break. Instead, Nolthren generates official, lightweight, and reliable badges for key stats (like stars and forks) that update automatically and maintain a professional look.
                        </p>
                    </FAQItem>

                    {/* --- Limitations & Technical Details --- */}
                    <FAQItem question="Why do I get an error when analyzing a very large repository?">
                        <p>
                            Analyzing a repository requires making numerous calls to the GitHub API to fetch file structures, source code, and metadata. GitHub imposes a rate limit on these calls—even with a personal token, this limit is 5,000 requests per hour.
                        </p>
                        <p>
                            Very large repositories with thousands of files can easily exhaust this limit in a single analysis session. Currently, Nolthren does not implement complex logic to pause and resume after the rate limit resets. This is a known limitation to keep the application lightweight and client-side. For now, Nolthren works best with small to medium-sized repositories.
                        </p>
                    </FAQItem>
                    <FAQItem question="Can I use this for private repositories?">
                        <p>
                            Currently, Nolthren only supports public repositories. Accessing private repositories requires a more permissive API token, and we have opted not to support this at this time to maximize user security and privacy.
                        </p>
                    </FAQItem>
                    <FAQItem question="Why does Nolthren only support Gemini and not other AI models?">
                        <p>
                            This was a practical decision made during development. The Google Gemini API offers a very accessible and generous free tier. This was instrumental in allowing us to build, test, and offer Nolthren as a free, open-source tool without incurring significant costs. While other models are incredibly powerful, Gemini's developer-friendly approach made it the perfect fit for this project's scope and budget.
                        </p>
                    </FAQItem>

                    {/* --- Community & Support --- */}
                    <FAQItem question="How can I report a bug or suggest a feature?">
                        <p>
                            Nolthren is an open-source project, and we welcome community feedback! The best way to contribute is through our GitHub repository.
                        </p>
                        <ul>
                            <li>
                                To report a bug, please <a href="https://github.com/amarapurkaryash/Nolthren/issues" target="_blank" rel="noopener noreferrer">create an issue</a>.
                            </li>
                            <li>
                                To suggest a feature or ask a question, please <a href="https://github.com/amarapurkaryash/Nolthren/discussions" target="_blank" rel="noopener noreferrer">start a discussion</a>.
                            </li>
                        </ul>
                    </FAQItem>
                </div>
            </div>
        </section>
    );
}

export default FAQPage;