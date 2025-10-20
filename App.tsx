import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { generateReadme, Section, Badge, buildBadgeUrl, regenerateReadmeSection, regenerateTagline, regenerateBadges } from './services/geminiService';
import { getRepoData, RepoData, getUserRepos, UserRepo } from './services/githubService';
import Header from './components/Header';
import RepoInput from './components/RepoInput';
import ReadmeDisplay from './components/ReadmeDisplay';
import Loader from './components/Loader';
import Sidebar from './components/Sidebar';
import RepoGrid from './components/RepoGrid';
import OnboardingTip from './components/OnboardingTip';
import ApiKeysModal from './components/ApiKeysModal';
import ProgressLoader from './components/ProgressLoader';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import FAQPage from './components/FAQPage';
import ApiKeysGuidePage from './components/ApiKeysGuidePage';
import SampleReposPage from './components/SampleReposPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import Footer from './components/Footer';
import { Theme } from './components/ThemeToggle';
import PlusIcon from './components/icons/PlusIcon';

type Status = 'idle' | 'fetchingRepos' | 'fetching' | 'generating' | 'success' | 'error';
type ModalTab = 'github' | 'gemini';
export type View = 'home' | 'generator' | 'about' | 'faq' | 'apiKeysGuide' | 'sampleReadme' | 'privacy';


interface ProgressState {
  currentStepId: string | null;
  completedStepIds: string[];
}

const LOADING_STEPS = [
  { id: 'fetching_repo_details', text: 'Fetching repository details...' },
  { id: 'scanning_file_tree', text: 'Scanning file structure...' },
  { id: 'retrieving_source_code', text: 'Retrieving source code...' },
  { id: 'analyzing_code_with_ai', text: 'Analyzing repository & preparing context...' },
  { id: 'generating_readme_with_ai', text: 'Generating & structuring README...' },
  { id: 'finalizing_readme', text: 'Finalizing and preparing your view...' },
];


const slugify = (text: string) =>
  text
    .toLowerCase()
    // remove markdown heading characters and any potential html
    .replace(/^(#+\s*)|(<[^>]+>)/g, '')
    .trim()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w-]+/g, ''); // remove all non-word chars

const generateTocContent = (sections: Section[]): string => {
  const tocItems = sections
    .filter(s => s.isVisible && !['project_title', 'project_tagline', 'project_badges', 'table_of_contents'].includes(s.id))
    .map(s => `* [${s.title}](#${slugify(s.title)})`)
    .join('\n');

  if (tocItems.length === 0) {
    return `## Table of Contents\n\n*(Enable sections to build the Table of Contents)*`;
  }
  return `## Table of Contents\n\n${tocItems}`;
};


const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [userRepos, setUserRepos] = useState<UserRepo[]>([]);
  const [selectedRepoUrl, setSelectedRepoUrl] = useState<string>('');
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [regeneratingSectionId, setRegeneratingSectionId] = useState<string | null>(null);
  const [showOnboardingTip, setShowOnboardingTip] = useState<boolean>(false);
  const [showSupportWarning, setShowSupportWarning] = useState<boolean>(false);
  
  const [showApiKeysModal, setShowApiKeysModal] = useState<boolean>(false);
  const [initialModalTab, setInitialModalTab] = useState<ModalTab>('github');
  const [progress, setProgress] = useState<ProgressState>({ currentStepId: null, completedStepIds: [] });
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('nolthren_theme') as Theme) || 'light';
    } catch {
      return 'light';
    }
  });

  const [exampleIndex, setExampleIndex] = useState(0);

  const parallaxBg1Ref = useRef<HTMLDivElement>(null);
  const parallaxBg2Ref = useRef<HTMLDivElement>(null);

  const communityExamples = useMemo(() => [
    { repo: 'facebook/react', category: 'UI Library' },
    { repo: 'torvalds/linux', category: 'Operating System' },
    { repo: 'microsoft/vscode', category: 'Code Editor' },
    { repo: 'vercel/next.js', category: 'Web Framework' },
    { repo: 'freeCodeCamp/freeCodeCamp', category: 'Learning Platform' },
    { repo: 'tensorflow/tensorflow', category: 'Machine Learning' },
    { repo: 'kamranahmedse/developer-roadmap', category: 'Community Resource' },
    { repo: 'ohmyzsh/ohmyzsh', category: 'Developer Tool' },
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
        setExampleIndex(prevIndex => (prevIndex + 1) % communityExamples.length);
    }, 3000); // Cycle every 3 seconds
    return () => clearInterval(timer);
  }, [communityExamples.length]);

  // Apply theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    root.classList.toggle('dark', isDark);
    
    try {
      localStorage.setItem('nolthren_theme', theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage.', e);
    }
  }, [theme]);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.toggle('dark', mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);


  // Effect to manage body classes for different views
  useEffect(() => {
    document.body.classList.toggle('body-home-view', view === 'home');
    return () => {
      document.body.classList.remove('body-home-view');
    };
  }, [view]);


  const openApiKeysModal = (tab: ModalTab) => {
    setInitialModalTab(tab);
    setShowApiKeysModal(true);
  };

  const finalReadmeContent = useMemo(() => {
    // Dynamically build the badges section from the state
    const badgesHtml = badges
      .filter(b => b.isVisible)
      .map(b => `<img src="${buildBadgeUrl(b, repoData)}" alt="${b.label} Badge">`)
      .join('\n');
    const badgesContent = `<div align="center" class="gemini-badges">\n${badgesHtml}\n</div>`;

    return sections
      .filter(section => section.isVisible)
      .map(section => {
        if (section.id === 'project_badges') {
          return badges.filter(b => b.isVisible).length > 0 ? badgesContent : '';
        }
        
        // When a user enables an empty placeholder, show a default message.
        if (section.isPlaceholder && !section.content.trim()) {
            return `## ${section.title}\n\n*This section is a placeholder. You can add your content here.*`;
        }

        return section.content;
      })
      .join('\n\n')
      .trim();
  }, [sections, badges, repoData]);

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (parallaxBg1Ref.current) {
            parallaxBg1Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        if (parallaxBg2Ref.current) {
            parallaxBg2Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll Animation Effect for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // Add class if intersecting, remove it if not.
                entry.target.classList.toggle('visible', entry.isIntersecting);
            });
        },
        {
            threshold: 0.2, // Trigger when 20% of the element is visible
        }
    );

    const elements = document.querySelectorAll('.use-scroll-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
        elements.forEach((el) => observer.unobserve(el));
    };
  }, [view]); // Re-run when the view changes to hook up new elements


  useEffect(() => {
    // Check if there are sections and if a TOC section exists
    if (sections.length > 0 && sections.some(s => s.id === 'table_of_contents')) {
      const newTocContent = generateTocContent(sections);
      
      setSections(currentSections => {
        const tocSection = currentSections.find(s => s.id === 'table_of_contents');
        if (tocSection && tocSection.content !== newTocContent) {
          return currentSections.map(s =>
            s.id === 'table_of_contents'
              ? { ...s, content: newTocContent }
              : s
          );
        }
        return currentSections;
      });
    }
  }, [sections]); 

  const handleFetchRepos = useCallback(async (userToFetch: string) => {
    if (!userToFetch.trim()) {
      setError('Please enter a GitHub username.');
      setStatus('error');
      return;
    }
    setStatus('fetchingRepos');
    setError(null);
    setUserRepos([]);
    setSelectedRepoUrl('');
    setSections([]); // Clear previous results
    setBadges([]);
    setShowOnboardingTip(false);
    setShowSupportWarning(false);
    
    try {
      const repos = await getUserRepos(userToFetch);
      if (repos.length === 0) {
        setError(`No public repositories found for user "${userToFetch}".`);
        setStatus('idle');
      } else {
        setUserRepos(repos);
        setStatus('idle');
      }
    } catch (err: any) {
      const errorMessage = (err.message || '').toLowerCase();
      // This function only calls GitHub, so we only need to check for GitHub errors.
      if (errorMessage.includes('github')) {
        openApiKeysModal('github');
      }
      setError(err.message);
      setStatus('error');
    }
  }, []);

  const handleGenerate = useCallback(async (urlToProcess: string) => {
    if (!urlToProcess) {
      setError('Please select a repository or provide a URL.');
      setStatus('error');
      return;
    }
    
    try {
      const url = new URL(urlToProcess);
      if (url.hostname !== 'github.com' || url.pathname.split('/').filter(Boolean).length < 2) {
        throw new Error();
      }
    } catch (_) {
      setError('An invalid repository URL was provided.');
      setStatus('error');
      return;
    }

    setStatus('fetching');
    setError(null);
    setSections([]);
    setBadges([]);
    setRepoData(null);
    setUserRepos([]); // Hide repo grid
    setSelectedRepoUrl(urlToProcess); // For card loading state
    setGenerationTime(null);
    setShowOnboardingTip(false);
    setShowSupportWarning(false);
    setProgress({ currentStepId: 'fetching_repo_details', completedStepIds: [] }); // Start first step

    const startTime = performance.now();

    try {
      const onProgressUpdate = (stepId: string) => {
        // This filters out internal steps to ensure we only show 6 progress bars.
        if (stepId === 'preparing_final_prompt' || stepId === 'structuring_output') {
          return; // Do nothing, keep the current progress bar active.
        }

        setProgress(prev => {
          const completed = [...prev.completedStepIds];
          if (prev.currentStepId && !completed.includes(prev.currentStepId)) {
            completed.push(prev.currentStepId);
          }
          return {
            currentStepId: stepId,
            completedStepIds: completed,
          };
        });
      };
      
      const data = await getRepoData(urlToProcess, onProgressUpdate);
      setRepoData(data);
      setStatus('generating');
      
      const { sections: generatedSections, structuredBadges } = await generateReadme(data, onProgressUpdate);
      
      // Trigger the 6th and final step, and make it green instantly for a better UX.
      const finalStepId = 'finalizing_readme';
      setProgress(prev => {
         const completed = [...prev.completedStepIds];
         if (prev.currentStepId && !completed.includes(prev.currentStepId)) {
            completed.push(prev.currentStepId);
         }
         if (!completed.includes(finalStepId)) {
            completed.push(finalStepId);
         }
         return {
            currentStepId: finalStepId,
            completedStepIds: completed,
         };
      });

      // Wait 5 seconds on the final green bar as requested.
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const endTime = performance.now();
      setGenerationTime(endTime - startTime);

      const supportSection = generatedSections.find(s => s.id === 'support_the_project');
      if (supportSection && !supportSection.isPlaceholder) {
        setShowSupportWarning(true);
      }

      setSections(generatedSections);
      setBadges(structuredBadges);
      setStatus('success');
      setShowOnboardingTip(true);
    } catch (err: any) {
      const errorMessage = (err.message || '').toLowerCase();
      
      // Explicitly check for GitHub-related issues
      if (errorMessage.includes('github')) {
        openApiKeysModal('github');
      } 
      // Assume other API-related errors (rate limits, invalid keys) are from Gemini
      else if (
        errorMessage.includes('gemini') || 
        errorMessage.includes('api key') || 
        errorMessage.includes('429') || // "Too Many Requests" status
        errorMessage.includes('rate limit') ||
        errorMessage.includes('quota')
      ) {
        openApiKeysModal('gemini');
      }

      setError(err.message || 'An unknown error occurred. Please try again.');
      setStatus('error');
      console.error(err);
    } finally {
        setSelectedRepoUrl('');
    }
  }, []);
  
  const handleProcessInput = useCallback(async (valueToProcess?: string) => {
    const value = (valueToProcess || inputValue).trim();
    if (!value) {
      setError('Please enter a username or repository.');
      setStatus('error');
      return;
    }

    // Heuristic 1: Is it a URL?
    try {
      const url = new URL(value);
      if (url.hostname === 'github.com' && url.pathname.split('/').filter(Boolean).length >= 2) {
        handleGenerate(value);
        return;
      }
    } catch (_) {
      // Not a valid URL, continue to next checks
    }

    // Heuristic 2: Is it `user/repo` shorthand?
    if (value.includes('/') && value.split('/').length === 2 && !/\s/.test(value)) {
        const fullUrl = `https://github.com/${value}`;
        handleGenerate(fullUrl);
        return;
    }
    
    // Heuristic 3: Assume it's a username
    handleFetchRepos(value);

  }, [inputValue, handleGenerate, handleFetchRepos]);
  
  const handleExampleClick = (exampleValue: string) => {
    setInputValue(exampleValue);
    // Call handler with the value directly because state update is async
    handleProcessInput(exampleValue);
  };
  
  const handleReset = useCallback(() => {
    setInputValue('');
    setUserRepos([]);
    setSelectedRepoUrl('');
    setRepoData(null);
    setSections([]);
    setBadges([]);
    setStatus('idle');
    setError(null);
    setShowOnboardingTip(false);
    setShowSupportWarning(false);
    setGenerationTime(null);
    setProgress({ currentStepId: null, completedStepIds: [] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const handleToggleVisibility = (sectionId: string) => {
    setSections(prevSections =>
      prevSections.map(s =>
        s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s
      )
    );
  };

  const handleToggleBadgeVisibility = (badgeId: string) => {
    setBadges(prevBadges =>
      prevBadges.map(b => (b.id === badgeId ? { ...b, isVisible: !b.isVisible } : b))
    );
  };

  const handleChangeBadgeColor = (badgeId: string, newColor: string) => {
    setBadges(prevBadges =>
      prevBadges.map(b => (b.id === badgeId ? { ...b, color: newColor.replace('#', '') } : b))
    );
  };

  const handleReorderSections = (reorderedSections: Section[]) => {
    setSections(reorderedSections);
  };
  
  const handleReorderBadges = (reorderedBadges: Badge[]) => {
    setBadges(reorderedBadges);
  };

  const handleRegenerateSection = async (sectionId: string) => {
    if (!repoData) return;
    setRegeneratingSectionId(sectionId);
    setError(null);
    try {
      if (sectionId === 'project_badges') {
        const newBadges = await regenerateBadges(repoData);
        setBadges(newBadges);
      } else if (sectionId === 'project_tagline') {
        const newContent = await regenerateTagline(repoData);
        setSections(prevSections =>
          prevSections.map(s =>
            s.id === sectionId ? { ...s, content: newContent, hasData: true, isVisible: true, isPlaceholder: false } : s
          )
        );
      } else {
        const newContent = await regenerateReadmeSection(repoData, sectionId);
        setSections(prevSections =>
          prevSections.map(s =>
            s.id === sectionId ? { ...s, content: newContent, hasData: true, isVisible: true, isPlaceholder: false } : s
          )
        );
      }
    } catch (err: any) {
      const errorMessage = (err.message || '').toLowerCase();
      
      // Explicitly check for GitHub-related issues
      if (errorMessage.includes('github')) {
        openApiKeysModal('github');
      } 
      // Assume other API-related errors are from Gemini
      else if (
        errorMessage.includes('gemini') || 
        errorMessage.includes('api key') || 
        errorMessage.includes('429') || // "Too Many Requests" status
        errorMessage.includes('rate limit') ||
        errorMessage.includes('quota')
      ) {
        openApiKeysModal('gemini');
      }
      
      console.error(`Failed to regenerate section ${sectionId}:`, err);
      setError(err.message || `An unknown error occurred while regenerating the section.`);
    } finally {
      setRegeneratingSectionId(null);
    }
  };
  
  const isBusy = status === 'fetchingRepos' || status === 'fetching' || status === 'generating';
  const showContent = status === 'success' && sections.length > 0;
  const showInput = !isBusy && userRepos.length === 0 && !showContent;

  const mainClasses = 'container mx-auto px-4 max-w-7xl relative z-10 flex-grow';
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 font-sans text-gray-800 dark:text-gray-200 antialiased overflow-x-hidden relative flex flex-col">
      <div ref={parallaxBg1Ref} className="parallax-bg bg-gray-400/10 dark:bg-violet-400/5" style={{ width: '200px', height: '200px', top: '20%', left: '5%' }}></div>
      <div ref={parallaxBg2Ref} className="parallax-bg bg-gray-400/10 dark:bg-violet-400/5" style={{ width: '300px', height: '300px', top: '60%', right: '10%' }}></div>
      
      <Navbar 
        onOpenApiKeysModal={() => openApiKeysModal('github')} 
        currentView={view}
        onNavigate={setView}
        theme={theme}
        setTheme={setTheme}
      />
      <ApiKeysModal 
        isOpen={showApiKeysModal} 
        onClose={() => setShowApiKeysModal(false)}
        initialTab={initialModalTab}
      />
      
      {view === 'home' ? (
        <HomePage onNavigateToGenerator={() => setView('generator')} />
      ) : (
        <main className={mainClasses}>
          {view === 'generator' && (
             <>
              <section id="generator" className="pt-24 md:pt-32">
                <Header />
                {showInput && (
                  <div className="bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                      Generate a README by entering a GitHub username, repository URL, or shorthand (user/repo).
                    </p>
                    <RepoInput
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      onSubmit={() => handleProcessInput()}
                      isBusy={isBusy}
                    />
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 space-y-2">
                      <p>
                        Try with a username like{' '}
                        <button onClick={() => handleExampleClick('amarapurkaryash')} className="font-semibold text-gray-700 hover:text-gray-900 dark:text-violet-400 dark:hover:text-violet-300 focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed" disabled={isBusy}>
                          amarapurkaryash
                        </button>
                        {' or a repository like '}
                        <button onClick={() => handleExampleClick('amarapurkaryash/QRlyph')} className="font-semibold text-gray-700 hover:text-gray-900 dark:text-violet-400 dark:hover:text-violet-300 focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed" disabled={isBusy}>
                          amarapurkaryash/QRlyph
                        </button>
                      </p>
                      <p>
                        Community example:{' '}
                        <span className="font-normal text-gray-500 dark:text-gray-400 mr-1">
                            ({communityExamples[exampleIndex].category})
                        </span>
                        <button 
                            key={communityExamples[exampleIndex].repo}
                            onClick={() => handleExampleClick(communityExamples[exampleIndex].repo)} 
                            className="font-semibold text-gray-700 hover:text-gray-900 dark:text-violet-400 dark:hover:text-violet-300 focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed transition-opacity duration-300 animate-[fade-in_0.5s_ease-in-out]" 
                            disabled={isBusy}
                        >
                          {communityExamples[exampleIndex].repo}
                        </button>
                      </p>
                    </div>
                     {status === 'error' && error && (
                      <div className="mt-4 text-center text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-3">
                        {error}
                      </div>
                    )}
                  </div>
                )}
              </section>
                
                {isBusy && status === 'fetchingRepos' && <Loader message="Fetching repositories..." />}
  
                {userRepos.length > 0 && !isBusy && (
                  <div className="mt-8">
                      <RepoGrid
                        repos={userRepos}
                        onSelectRepo={handleGenerate}
                        isGenerating={isBusy}
                        selectedRepoUrl={selectedRepoUrl}
                      />
                  </div>
                )}
                
                {isBusy && (status === 'fetching' || status === 'generating') && (
                  <ProgressLoader 
                    steps={LOADING_STEPS}
                    progress={progress}
                  />
                )}
  
                {showContent && (
                   <div className="mt-8">
                     {showOnboardingTip && (
                        <div className="mb-6">
                            <OnboardingTip 
                              onDismiss={() => setShowOnboardingTip(false)} 
                              showSupportWarning={showSupportWarning}
                              generationTime={generationTime}
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <aside className="lg:col-span-3 sidebar-sticky">
                        <Sidebar 
                          sections={sections}
                          onToggleVisibility={handleToggleVisibility}
                          onRegenerate={handleRegenerateSection}
                          onReorder={handleReorderSections}
                          regeneratingSectionId={regeneratingSectionId}
                          badges={badges}
                          onToggleBadgeVisibility={handleToggleBadgeVisibility}
                          onChangeBadgeColor={handleChangeBadgeColor}
                          onReorderBadges={handleReorderBadges}
                          onReset={handleReset}
                        />
                      </aside>
                      <div className="lg:col-span-9">
                        <ReadmeDisplay readmeContent={finalReadmeContent} />
                      </div>
                    </div>
                  </div>
                )}
             </>
          )}
          
          {view === 'about' && <AboutPage />}
          {view === 'faq' && <FAQPage />}
          {view === 'apiKeysGuide' && <ApiKeysGuidePage />}
          {view === 'sampleReadme' && <SampleReposPage />}
          {view === 'privacy' && <PrivacyPolicyPage />}
        </main>
      )}

      {view !== 'home' && <Footer />}
    </div>
  );
};

export default App;