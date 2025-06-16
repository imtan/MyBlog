import React from 'react';
import AboutMe from './AboutMe';

export default function Sidebar() {

  return (
    <aside className="sidebar">
      {/* ① AboutMe を先頭に */}
      <AboutMe />

        {/* ③ その他固定ボタン */}
        <div className="nav-buttons">
          <a href="#/posts" className="nav-button">
            記事一覧
          </a>
        </div>
    </aside>
  );
}