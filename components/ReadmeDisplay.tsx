import React, { useState, useEffect, useMemo, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import ClipboardIcon from './icons/ClipboardIcon';
import DownloadIcon from './icons/DownloadIcon';

interface ReadmeDisplayProps {
  readmeContent: string;
  isBare?: boolean;
}

// Local icons for the thank you message
const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// Slugify function to create IDs for headings that match the Table of Contents links.
const slugify = (textContent: string) =>
  textContent
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // strip html tags
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');


const ReadmeDisplay: React.FC<ReadmeDisplayProps> = ({ readmeContent, isBare = false }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Markdown');
  const [view, setView] = useState<'preview' | 'markdown'>('preview');
  const [showThankYouMessage, setShowThankYouMessage] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showThankYouMessage) {
        const timer = setTimeout(() => {
            setShowThankYouMessage(false);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }
  }, [showThankYouMessage]);

  const renderedContent = useMemo(() => {
    if (readmeContent) {
      const renderer = new marked.Renderer();
      
      // Override the heading renderer to add an 'id' attribute for anchor links
      renderer.heading = (token) => {
        const id = slugify(token.text);
        return `<h${token.depth} id="${id}">${token.text}</h${token.depth}>`;
      };

      // Override html renderer ONLY to catch embedded videos.
      renderer.html = (token) => {
        const html = token.text;
        const isVideo = /<iframe|<video/i.test(html);

        if (isVideo) {
          const videoIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24" 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block mr-1 align-middle text-gray-500 dark:text-gray-400 flex-shrink-0"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`;
          return `
            <span class="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 not-prose">
              ${videoIconSvg}
              <span class="align-middle">Embedded Video</span>
            </span>`;
        }
        
        // Return original HTML for other cases (like contributor avatars, badges). 
        // It will be sanitized by DOMPurify.
        return html;
      };
        
      const parsedHtml = marked.parse(
        readmeContent, 
        { 
          renderer, // Use the custom renderer
          async: false,
          gfm: true,
          breaks: false,
          pedantic: false,
        }
      ) as string;
      // Allow 'id' attributes so they are not stripped out by the sanitizer
      return DOMPurify.sanitize(parsedHtml, { ADD_ATTR: ['id'] });
    }
    return '';
  }, [readmeContent]);

  // Effect to handle smooth scrolling for anchor links within the preview
  useEffect(() => {
    const previewEl = previewRef.current;
    if (!previewEl) return;

    const handleLinkClick = (event: MouseEvent) => {
        const link = (event.target as HTMLElement).closest('a');
        
        // Not a link, not an internal link, or a link to the top
        if (!link || !link.hash || link.hash === '#') {
            return;
        }

        // Check if the link points to an element within our preview container
        try {
            const targetId = decodeURIComponent(link.hash.substring(1));
            const targetElement = previewEl.querySelector(`#${CSS.escape(targetId)}`);

            if (targetElement) {
                event.preventDefault(); // Prevent the default browser jump
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } catch (e) {
            console.warn('Could not process anchor link', e);
        }
    };

    previewEl.addEventListener('click', handleLinkClick);

    return () => {
        previewEl.removeEventListener('click', handleLinkClick);
    };
  }, [renderedContent]); // Rerun when content changes to re-attach listener

  const handleCopy = () => {
    navigator.clipboard.writeText(readmeContent).then(() => {
      setCopyButtonText('Copied!');
      setShowThankYouMessage(true);
      setTimeout(() => setCopyButtonText('Copy Markdown'), 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        setCopyButtonText('Copy Failed');
        setTimeout(() => setCopyButtonText('Copy Markdown'), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([readmeContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowThankYouMessage(true);
  };
  
  const tabButtonClasses = (isActive: boolean) => 
    `px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
      isActive
        ? 'bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-gray-100'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800/50'
    }`;

  const containerClasses = isBare 
    ? "" 
    : "bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800";


  return (
    <div className={containerClasses}>
      <div className="px-6 py-3 border-b border-gray-200 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-black/20 p-1 rounded-lg">
          <button onClick={() => setView('preview')} className={tabButtonClasses(view === 'preview')}>
            Preview
          </button>
          <button onClick={() => setView('markdown')} className={tabButtonClasses(view === 'markdown')}>
            Markdown
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            aria-label="Copy Markdown to clipboard"
          >
            <ClipboardIcon className="w-4 h-4" />
            {copyButtonText}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            aria-label="Download README.md file"
          >
            <DownloadIcon className="w-4 h-4" />
            Download .md
          </button>
        </div>
      </div>
      <div className="p-6 md:p-8">
        {view === 'preview' ? (
          <div
            ref={previewRef}
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
        ) : (
          <pre className="bg-gray-50 dark:bg-neutral-950/50 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono overflow-x-auto">
            <code>{readmeContent}</code>
          </pre>
        )}
      </div>

      {showThankYouMessage && (
        <div 
            className="fixed bottom-5 left-1/2 z-50 w-full max-w-md p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-700 flex items-start gap-4 animate-slide-up-fade-in"
            role="alert"
        >
            <div className="flex-shrink-0 text-yellow-400 dark:text-yellow-300 pt-0.5">
                <StarIcon className="w-6 h-6" />
            </div>
            <div className="flex-grow">
                <p className="font-semibold text-gray-800 dark:text-gray-100">Thanks for using Nolthren!</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    If you found this useful, please consider starring the repo. It helps a lot!
                </p>
                <a 
                    href="https://github.com/amarapurkaryash/Nolthren" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setShowThankYouMessage(false)}
                    className="mt-2 inline-block text-sm font-bold text-gray-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
                >
                    Star on GitHub &rarr;
                </a>
            </div>
            <div className="flex-shrink-0">
                <button 
                    onClick={() => setShowThankYouMessage(false)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700"
                    aria-label="Dismiss message"
                >
                    <CloseIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
      )}

    </div>
  );
};

export default ReadmeDisplay;