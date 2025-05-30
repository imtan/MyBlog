import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import { getPostBySlug, getNextPost, getPreviousPost } from '../utils/posts';

export default function Article({ slug }) {
  // slugが指定されていない場合は最新の記事（post3）を表示
  const targetSlug = slug || 'post3';
  const post = getPostBySlug(targetSlug);
  const nextPost = getNextPost(targetSlug);
  const prevPost = getPreviousPost(targetSlug);

  if (!post) {
    return <div className="content">記事が見つかりませんでした。</div>;
  }

  return (
    <main className="content">
      <div className="content-header">
        <h1 className="title">{post.frontmatter.title}</h1>
        <div className="post-date">{post.frontmatter.date}</div>
      </div>

      <div className="content-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="text">{children}</p>,
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              if (!inline && match) {
                return (
                  <CodeBlock
                    code={String(children).replace(/\n$/, '')}
                    language={match[1]}
                  />
                );
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>

        {/* 記事ナビゲーションをcontent-body内に移動 */}
        <div className="article-navigation">
          {prevPost && (
            <a href={`#post/${prevPost.slug}`} className="nav-button prev-button">
              ← 次の記事: <span>{prevPost.frontmatter.title}</span>
            </a>
          )}
          <a href="#/posts" className="nav-button home-button">
            記事一覧
          </a>
          {nextPost && (
            <a href={`#post/${nextPost.slug}`} className="nav-button next-button">
              前の記事: <span>{nextPost.frontmatter.title}</span> →
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
