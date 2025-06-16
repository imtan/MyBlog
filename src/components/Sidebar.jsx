import React from 'react';
import AboutMe from './Aboutme';

export default function Sidebar({ navigateToList }) {

  return (
    <aside className="sidebar">
      {/* ① AboutMe を先頭に */}
      <AboutMe />

        {/* ③ その他固定ボタン */}
        <div className="nav-buttons">
          <a href="/" className="nav-button"
             onClick={(e) => {
               e.preventDefault();
               navigateToList();
             }}>
            記事一覧
          </a>
        </div>
    </aside>
  );
}