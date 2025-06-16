import React from 'react';

export default function AboutMe() {
  return (
    <div className="about-me">
      {/* 横書きに切り替えて表示 */}
      <img
        src="/avater.png"
        alt="プロフィール"
        className="about-me__avatar"
      />
      <div className="about-me__text">
        <p>imtanization</p>
        <p>Programmer</p>
      </div>
    </div>
  );
}
