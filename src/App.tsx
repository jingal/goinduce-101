import React, { useState } from 'react';
import { PageState, WorryResult, WorrySubmission } from './types';
import { StartPage } from './components/pages/StartPage';
import { InputPage } from './components/pages/InputPage';
import { LoadingPage } from './components/pages/LoadingPage';
import { ResultPage } from './components/pages/ResultPage';
import { IntroModal } from './components/pages/IntroModal';
import { SparkleDecor } from './components/common/SparkleDecor';
import { matchWorryQuote } from './utils/quoteMatcher';
import { CATEGORIES } from './data/categories';

export const App: React.FC = () => {
  const [pageState, setPageState] = useState<PageState>('START');
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [submission, setSubmission] = useState<WorrySubmission | null>(null);
  const [currentResult, setCurrentResult] = useState<WorryResult | null>(null);

  // Navigate to Input Screen
  const handleStart = () => {
    setPageState('INPUT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Worry from Input Screen
  const handleSubmitWorry = (newSubmission: WorrySubmission) => {
    setSubmission(newSubmission);
    // Generate match
    const result = matchWorryQuote(newSubmission);
    setCurrentResult(result);
    setPageState('LOADING');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When loading finishes
  const handleLoadingComplete = () => {
    setPageState('RESULT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Request different quote for the same worry/category
  const handleRefreshQuote = () => {
    if (!submission) return;
    const nextResult = matchWorryQuote(submission, { previousResult: currentResult });
    setCurrentResult(nextResult);
    setPageState('LOADING');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset and return to Home
  const handleGoHome = () => {
    setSubmission(null);
    setCurrentResult(null);
    setPageState('START');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCategoryLabel = submission
    ? CATEGORIES.find((c) => c.id === submission.category)?.label
    : undefined;

  return (
    <div className="app-wrapper">
      {/* Background Floating Sparkles and Stars */}
      <SparkleDecor />

      {/* Main Glass/Tactile Card Frame */}
      <main className="app-container">
        {/* Top Lace Trim */}
        <div className="lace-top-banner" />

        {/* Page Routing */}
        {pageState === 'START' && (
          <StartPage
            onStart={handleStart}
            onOpenIntro={() => setIsIntroOpen(true)}
          />
        )}

        {pageState === 'INPUT' && (
          <InputPage
            onBack={() => setPageState('START')}
            onSubmit={handleSubmitWorry}
          />
        )}

        {pageState === 'LOADING' && (
          <LoadingPage
            onComplete={handleLoadingComplete}
            categoryLabel={currentCategoryLabel}
          />
        )}

        {pageState === 'RESULT' && currentResult && (
          <ResultPage
            result={currentResult}
            onRefreshQuote={handleRefreshQuote}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* Intro Modal (PAGE-05) */}
      <IntroModal
        isOpen={isIntroOpen}
        onClose={() => setIsIntroOpen(false)}
      />
    </div>
  );
};

export default App;
