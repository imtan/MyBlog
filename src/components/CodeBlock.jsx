import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
// Theme is already imported in index.css

export default function CodeBlock({ code, language }) {
  const codeRef = useRef(null);
  const modalCodeRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (codeRef.current && language) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  useEffect(() => {
    if (isExpanded && modalCodeRef.current && language) {
      // モーダルが開いた時に少し遅延を入れてhighlightを適用
      const timer = setTimeout(() => {
        if (modalCodeRef.current) {
          hljs.highlightElement(modalCodeRef.current);
        }
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, code, language]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <div className="code-block" onClick={handleExpand}>
        <div className="code-block-expand-hint">クリックで拡大</div>
        <pre style={{ background: 'transparent' }}>
          <code
            ref={codeRef}
            className={language ? `language-${language} hljs` : 'hljs'}
            style={{ background: 'transparent' }}
          >
            {code}
          </code>
        </pre>
      </div>

      {isExpanded && (
        <div className="code-block-modal" onClick={handleClose}>
          <div className="code-block-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="code-block-close" onClick={handleClose}>
              ×
            </button>
            <pre style={{ background: 'transparent' }}>
              <code
                ref={modalCodeRef}
                className={language ? `language-${language} hljs` : 'hljs'}
                style={{ background: 'transparent' }}
              >
                {code}
              </code>
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
