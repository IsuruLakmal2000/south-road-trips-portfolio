import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Page = 'home' | 'article';

interface PageContextType {
  currentPage: Page;
  articleId: string | null;
  navigateToArticle: (articleId: string) => void;
  goHome: () => void;
}

export const PageContext = createContext<PageContextType | undefined>(undefined);

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [articleId, setArticleId] = useState<string | null>(null);

  const navigateToArticle = (id: string) => {
    setArticleId(id);
    setCurrentPage('article');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setCurrentPage('home');
    setArticleId(null);
    window.scrollTo(0, 0);
  };

  return (
    <PageContext.Provider value={{ currentPage, articleId, navigateToArticle, goHome }}>
      {children}
    </PageContext.Provider>
  );
};

export const useNavigation = () => {
  const context = React.useContext(PageContext);
  if (!context) {
    throw new Error('useNavigation must be used within PageProvider');
  }
  return context;
};
