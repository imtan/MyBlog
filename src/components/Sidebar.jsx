import React from 'react';
import AboutMe from './Aboutme';

export default function Sidebar() {

  return (
    <aside className="sidebar">
      {/* ① AboutMe を先頭に */}
      <AboutMe />

        {/* ③ その他固定ボタン */}
        <div className="nav-buttons">
          <a href="/" className="nav-button"
             onClick={(e) => {
               e.preventDefault();
               window.history.pushState(null, '', '/');
               window.dispatchEvent(new PopStateEvent('popstate'));
             }}>
            記事一覧
          </a>
        </div>
    </aside>
  );
}