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
        console.log('Extracted slug:', slug); // デバッグ用
        if (slug && slug.trim() !== '') {
          setCurrentSlug(slug);
          setView('article');
          console.log('Switched to article view with slug:', slug); // デバッグ用
        }
      } else if (hash === '#/posts' || hash === '' || hash === '#') {
        console.log('Switched to list view'); // デバッグ用
        setView('list');
      }
    };

    // 初期ロード時にもハッシュをチェック
    handleHashChange();

    // ハッシュ変更イベントリスナーを追加
    window.addEventListener('hashchange', handleHashChange);

    // ポップステートイベントも監視（戻るボタン対応）
    window.addEventListener('popstate', handleHashChange);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []); // dependencyを空配列に戻す

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
