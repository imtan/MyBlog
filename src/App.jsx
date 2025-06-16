import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Article from './components/Article';
import ArticleList from './components/ArticleList';

export default function App() {
  const [view, setView] = useState('list'); // 'list' or 'article'
  const [currentSlug, setCurrentSlug] = useState('');

  // URLパスの変更を監視
  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/post/')) {
        const slug = path.replace('/post/', '');
        setCurrentSlug(slug);
        setView('article');
      } else {
        setView('list');
      }
    };

    // 初期ロード時にもパスをチェック
    handlePathChange();

    // popstateイベントリスナーを追加（ブラウザの戻る/進むボタン用）
    window.addEventListener('popstate', handlePathChange);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      {view === 'list' ? (
        <ArticleList />
      ) : (
        <Article slug={currentSlug} />
      )}
    </div>
  );
}
