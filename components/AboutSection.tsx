import React from 'react';
import EyeIcon from './icons/EyeIcon';
import ZapIcon from './icons/ZapIcon';
import CustomizeIcon from './icons/CustomizeIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 h-full">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-sky-100 p-2 rounded-lg">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{children}</p>
  </div>
);

const StepCard: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-sky-600 text-white font-bold text-lg">
            {number}
        </div>
        <div>
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <p className="text-gray-600">{children}</p>
        </div>
    </div>
);


const AboutSection: React.FC = () => {
    return (
        <div className="mt-16 space-y-20 py-10">

            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">About Nolthren</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Nolthren is a smart README generator that uses Google's Gemini AI to analyze your GitHub repository and create a professional, comprehensive, and customizable README.md file in seconds.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3">
                     <p className="text-gray-700">
                        This project is open-source.
                        <a href="https://github.com/amarapurkaryash/Nolthren" target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-700 hover:underline ml-2">
                           View on GitHub
                        </a>
                    </p>
                     <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
                     <p className="text-gray-700">
                        Created by 
                        <a href="https://github.com/amarapurkaryash" target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-700 hover:underline ml-1">
                           Yash Amarapurkar
                        </a>
                    </p>
                </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
                 <h2 className="text-3xl font-bold text-gray-800 tracking-tight text-center mb-12">How to Use</h2>
                 <div className="space-y-10">
                    <StepCard number="1" title="Provide Your Repository">
                        Enter a GitHub username to browse repos, or directly input a repository URL or shorthand like `user/repo`.
                    </StepCard>
                    <StepCard number="2" title="Let AI Do the Heavy Lifting">
                        Nolthren uses Gemini AI to analyze your entire repo—from source code to dependencies—and generates a complete, professional README in seconds.
                    </StepCard>
                    <StepCard number="3" title="Customize & Export">
                        Fine-tune your generated README using the sidebar controls. When you're happy, copy the Markdown or download the `.md` file.
                    </StepCard>
                 </div>
            </div>
            
            <div className="max-w-5xl mx-auto">
                 <h2 className="text-3xl font-bold text-gray-800 tracking-tight text-center mb-12">Features</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard icon={<ZapIcon className="w-6 h-6 text-sky-600" />} title="Intelligent Analysis">
                        Automatically scans your repository, identifying languages, libraries, and key files to create context-aware content.
                    </FeatureCard>
                     <FeatureCard icon={<CustomizeIcon className="w-6 h-6 text-sky-600" />} title="Fully Customizable">
                        Easily toggle sections, reorder content with drag-and-drop, customize badges, and regenerate any part of the README you don't like.
                    </FeatureCard>
                    <FeatureCard icon={<EyeIcon className="w-6 h-6 text-sky-600" />} title="Live Preview">
                        Instantly see your changes in a live, GitHub-style preview as you customize your README, ensuring it looks perfect before you export.
                    </FeatureCard>
                </div>
            </div>

        </div>
    );
}

export default AboutSection;