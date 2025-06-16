import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Article from './components/Article';
import ArticleList from './components/ArticleList';

export default function App() {
  const [view, setView] = useState('list'); // 'list' or 'article'
  const [currentSlug, setCurrentSlug] = useState('');

  // URLハッシュの変更を監視
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      console.log('Hash changed to:', hash); // デバッグ用

      if (hash.startsWith('#post/')) {
        const slug = hash.replace('#post/', '');
        if (slug && slug !== currentSlug) {
          setCurrentSlug(slug);
          setView('article');
        }
      } else if (hash === '#/posts' || hash === '' || hash === '#') {
        setView('list');
      }
    };

    // 初期ロード時にもハッシュをチェック
    handleHashChange();

    // ハッシュ変更イベントリスナーを追加
    window.addEventListener('hashchange', handleHashChange);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentSlug]);

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
