import React from 'react';
import { getAllPosts } from '../utils/posts';

export default function ArticleList() {
  const posts = getAllPosts();

  // スマホ用のナビゲーション関数
  const navigateToPost = (slug) => {
    console.log('navigateToPost called with slug:', slug);

    const newHash = `#post/${slug}`;
    console.log('Setting hash to:', newHash);

    // 現在のハッシュをクリア
    if (window.location.hash) {
      window.location.hash = '';
    }

    // 少し遅延してから新しいハッシュを設定
    setTimeout(() => {
      window.location.hash = newHash;
      console.log('Hash set to:', window.location.hash);

      // さらにイベントを手動で発火
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }, 50);
  };

  return (
    <div className="article-list">
      <div className="content-header">
        <h1 className="title">いつも函数を味噌で煮る</h1>
      </div>

      <div className="posts-container">
        {posts.map((post) => (
          <article key={post.slug} className="post-card">
            <h2 className="post-title">{post.frontmatter.title}</h2>
            <div className="post-date">{post.frontmatter.date}</div>
            <p className="post-excerpt">
              {post.content.substring(0, 100)}...
            </p>
            <button
              className="post-link"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigateToPost(post.slug);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              type="button"
            >
              続きを読む
            </button>
          </article>
        ))}
      </div>

      {/* モバイル用のフッターナビゲーション */}
      <div className="article-navigation list-navigation">
        <div className="nav-button home-button disabled">
          記事一覧
        </div>
      </div>
    </div>
  );
}
