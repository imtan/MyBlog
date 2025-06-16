import React from 'react';
import { getAllPosts } from '../utils/posts';

export default function ArticleList() {
  const posts = getAllPosts();

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
            <a
              href={`#post/${post.slug}`}
              className="post-link"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.hash = `post/${post.slug}`;
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
            >
              続きを読む
            </a>
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
