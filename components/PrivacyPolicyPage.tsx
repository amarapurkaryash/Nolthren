import React from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <section id="privacy-policy" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Privacy Policy</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Your privacy is critically important to us. Nolthren is designed from the ground up to be a privacy-first application.
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last Updated: October 16, 2025</p>
            </div>
            
            <div className="max-w-3xl mx-auto mt-16 space-y-8 prose prose-base max-w-none dark:prose-invert prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:font-semibold hover:prose-a:underline">
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm not-prose">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Core Principle: Client-Side Operation</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            Nolthren is a static web application, which means it runs entirely within your web browser. <strong>We do not have a backend server that processes or stores your data.</strong> All the work, from fetching repository information to generating the README, happens on your local machine.
                        </p>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm not-prose">
                     <div className="flex items-center gap-4 mb-4">
                        <ShieldCheckIcon className="w-10 h-10 flex-shrink-0 text-green-600 dark:text-green-400" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">API Keys (GitHub & Gemini)</h2>
                            <p className="text-gray-500 dark:text-gray-400">Your keys are safe and under your control.</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            To function, Nolthren requires API keys for both GitHub and Google Gemini. Here’s how we handle them:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>Storage:</strong> Your keys are stored exclusively in your browser's <strong>Local Storage</strong>. This is a standard, secure storage mechanism that is sandboxed to this specific website.
                            </li>
                            <li>
                                <strong>No Server Transmission:</strong> Your keys are <strong>never</strong> transmitted to our servers or any third-party service. They only leave your browser when sent directly to the official GitHub and Google APIs to authenticate your requests.
                            </li>
                            <li>
                                <strong>User Control:</strong> You are in full control. The keys remain on your machine and can be cleared at any time from the API key settings (the key icon in the top right) or your browser's developer tools.
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm not-prose">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Third-Party Services</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            Nolthren integrates with third-party services to provide its functionality. Your use of Nolthren is also subject to the terms and policies of these services:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>GitHub:</strong> We use the GitHub API to access repository data. By using our service, you agree to GitHub's Terms of Service and Privacy Statement.
                            </li>
                            <li>
                                <strong>Google Gemini:</strong> We use the Google Gemini API for AI-powered content generation. Your use of this feature is subject to Google's Terms of Service and Privacy Policy.
                            </li>
                        </ul>
                        <p>
                           We encourage you to visit the official websites for GitHub and Google to review their policies to understand how your data is handled.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm not-prose">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Data We Do Not Collect</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            Because of our client-side architecture, we do not collect, see, or store any of the following:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Your API keys</li>
                            <li>Your GitHub repository code or data</li>
                            <li>The content of your generated READMEs</li>
                            <li>Personal information or usage analytics</li>
                        </ul>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm not-prose">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">User Responsibility</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            While we've designed Nolthren to be as secure as possible, you also play a role in maintaining security:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>API Key Security:</strong> You are solely responsible for the security of your API keys. We strongly recommend using GitHub tokens with the minimal required scope (<code>public_repo</code>) and setting an expiration date.
                            </li>
                            <li>
                                <strong>Generated Content:</strong> The README content is generated by an AI model. You are responsible for reviewing it for accuracy, appropriateness, and any sensitive information before using it in your projects. Nolthren and its creators are not liable for the content produced by the AI.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm not-prose">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Changes to This Policy</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of Nolthren after any changes are made constitutes your acceptance of the new policy. We encourage you to review this policy periodically to stay informed.
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm not-prose">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Contact Us</h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            If you have any questions about this Privacy Policy, please <a href="https://github.com/amarapurkaryash/Nolthren/issues" target="_blank" rel="noopener noreferrer">open an issue on our GitHub repository</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PrivacyPolicyPage;