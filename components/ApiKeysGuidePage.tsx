import React from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import CheckBadgeIcon from './icons/CheckBadgeIcon';

const GuideSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
        <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
        </div>
        <div className="text-gray-600 dark:text-gray-300 space-y-4 prose prose-sm max-w-none dark:prose-invert prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:font-semibold hover:prose-a:underline">
            {children}
        </div>
    </div>
);

const ApiKeysGuidePage: React.FC = () => {
    return (
        <section id="api-keys-guide" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">API Keys Guide</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Understand why and how to use API keys with Nolthren to get the best experience. You can add and manage your keys at any time by clicking the <strong>key icon</strong> in the top-right corner of the navigation bar.
                </p>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16 space-y-12">
                <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                    <GuideSection title="GitHub Personal Access Token (PAT)">
                        <h4>Why do I need a GitHub token?</h4>
                        <p>GitHub limits unauthenticated API requests to about 60 per hour. Analyzing a repository requires many requests, so you can easily hit this limit. By providing a Personal Access Token (PAT), your limit increases to <strong>5,000 requests per hour</strong>, allowing for uninterrupted analysis of any public repository.</p>
                        
                        <h4>How to create a classic token:</h4>
                        <ol>
                            <li>Go to the <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer">New personal access token</a> page on GitHub.</li>
                            <li>Select <strong>Tokens (classic)</strong> from the dropdown menu if prompted.</li>
                            <li>Give your token a descriptive <strong>Note</strong>, like "Nolthren".</li>
                            <li>Set an <strong>Expiration</strong>. We recommend 30 or 90 days for security.</li>
                            <li>In the <strong>Select scopes</strong> section, check the box for <code>public_repo</code> as shown below.</li>
                            <li>Click <strong>Generate token</strong> at the bottom of the page and copy the new token.</li>
                        </ol>

                        <h4>Required Scope: <code>public_repo</code></h4>
                        <div className="bg-gray-100 dark:bg-neutral-800/50 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 not-prose">
                          <div className="flex items-start gap-3">
                            <CheckBadgeIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-gray-100">Select the <code>public_repo</code> scope.</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">This is the only scope required for Nolthren to function correctly.</p>
                            </div>
                          </div>
                        </div>

                        <h4>What does this scope enable?</h4>
                        <p>The <code>public_repo</code> scope grants read-access to public repository data. Nolthren uses this to:</p>
                        <ul>
                            <li><strong>Read Repository Details:</strong> To generate the <em>Project Title</em>, <em>Overview</em>, and stats badges.</li>
                            <li><strong>Analyze Code & Files:</strong> To create the <em>Tech Stack</em>, <em>Key Features</em>, and <em>Getting Started</em> sections.</li>
                            <li><strong>Fetch Contributor Data:</strong> To build the <em>Contributors</em> section with user avatars.</li>
                            <li><strong>Access Metadata:</strong> To find license information and other important details.</li>
                        </ul>
                        <p><strong>Note:</strong> Nolthren will never write to your repositories.</p>
                    </GuideSection>
                </div>

                <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                     <GuideSection title="Gemini API Key">
                        <h4>Why do I need a Gemini key?</h4>
                        <p>Nolthren uses Google's powerful Gemini AI to generate README content. To ensure reliable performance, you must provide your own API key.</p>

                        <h4>How to get a key:</h4>
                        <ol>
                            <li>Visit <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank" rel="noopener noreferrer">Google AI Studio</a> to create your key.</li>
                            <li>Click "Create API key in new project".</li>
                            <li>Copy your new key and paste it into Nolthren's API key settings, accessible from the key icon in the top-right corner of the application.</li>
                        </ol>
                        <p>The Gemini API has a generous free tier, so it's unlikely to cost you anything for personal use.</p>
                    </GuideSection>
                </div>
                 
                <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                   <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-500/50 text-yellow-800 dark:text-yellow-300 p-6 rounded-lg">
                        <div className="flex items-start gap-4">
                            <ShieldCheckIcon className="w-8 h-8 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                            <div>
                                <h3 className="font-bold text-yellow-900 dark:text-yellow-200">Your Keys Are Safe</h3>
                                <div className="text-sm mt-2 space-y-2 prose prose-sm max-w-none dark:prose-invert">
                                    <p>Any API keys you provide are stored <strong>exclusively in your browser's local storage</strong>. This is a standard, secure storage mechanism sandboxed to this specific website. This means:</p>
                                    <ul>
                                        <li><strong>No Server Transmission:</strong> Your keys are never sent to Nolthren's servers. They only leave your browser when sent directly to the GitHub or Google APIs to authenticate your requests.</li>
                                        <li><strong>Origin Isolation:</strong> Other websites you visit cannot access the keys you store for Nolthren.</li>
                                        <li><strong>User Control:</strong> You are in full control. The keys remain on your machine and can be cleared at any time from the API key settings or your browser's developer tools.</li>
                                    </ul>
                                    <p>While local storage itself does not encrypt data on your disk, it is protected by the security of your operating system user account and the sandboxing policies of your browser.</p>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </section>
    );
}

export default ApiKeysGuidePage;