import React from 'react';
import EyeIcon from './icons/EyeIcon';
import ZapIcon from './icons/ZapIcon';
import CustomizeIcon from './icons/CustomizeIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import RefreshIcon from './icons/RefreshIcon';
import ArrowsUpDownIcon from './icons/ArrowsUpDownIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-neutral-800 h-full">
    <div className="flex items-center gap-3 mb-3">
      <div className="bg-gray-100 dark:bg-neutral-800 p-2 rounded-lg">
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{children}</p>
  </div>
);

const FeaturesPage: React.FC = () => {
    return (
        <section id="features" className="pt-24 md:pt-32 pb-16">
            <div className="text-center max-w-3xl mx-auto use-scroll-animation">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Features</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Nolthren is packed with powerful features to make README generation effortless and highly effective.
                </p>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="use-scroll-animation" style={{ transitionDelay: '100ms' }}>
                        <FeatureCard icon={<ZapIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Intelligent Analysis">
                            Automatically scans your repository, identifying languages, libraries, key functions, and important files to create context-aware content.
                        </FeatureCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '200ms' }}>
                         <FeatureCard icon={<ShieldCheckIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Comprehensive Badges">
                            Generates a full suite of professional tech stack and repository statistic badges to showcase your project's vitals.
                        </FeatureCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '300ms' }}>
                        <FeatureCard icon={<CustomizeIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Fully Customizable">
                           Easily toggle sections, edit badge colors, and tailor every part of the generated output to your exact needs.
                        </FeatureCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '400ms' }}>
                        <FeatureCard icon={<RefreshIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Section Regeneration">
                            Don't like a section? Regenerate its content with a single click without losing any of your other edits or customizations.
                        </FeatureCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '500ms' }}>
                        <FeatureCard icon={<ArrowsUpDownIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Drag-and-Drop Reordering">
                            Effortlessly change the layout and flow of your README by dragging and dropping sections and badges in the sidebar.
                        </FeatureCard>
                    </div>
                    <div className="use-scroll-animation" style={{ transitionDelay: '600ms' }}>
                        <FeatureCard icon={<EyeIcon className="w-6 h-6 text-gray-600 dark:text-violet-400" />} title="Live GitHub Preview">
                            Instantly see your changes rendered in a live, GitHub-style preview, ensuring it looks perfect before you export.
                        </FeatureCard>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesPage;