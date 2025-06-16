/**
 * シンプルなフロントマターパーサー
 * @param {string} content - Markdownコンテンツ
 * @returns {Object} - {data, content} オブジェクト
 */
function parseFrontMatter(content) {
  // フロントマターが存在するか確認（---で囲まれた部分）
  if (!content.startsWith('---')) {
    return { data: {}, content };
  }

  // 2つ目の---を探す
  const endOfFrontMatter = content.indexOf('---', 3);
  if (endOfFrontMatter === -1) {
    return { data: {}, content };
  }

  // フロントマター部分を抽出
  const frontMatter = content.substring(3, endOfFrontMatter).trim();
  // 残りのコンテンツを抽出
  const contentWithoutFrontMatter = content.substring(endOfFrontMatter + 3).trim();

  // フロントマターをパース
  const data = {};
  frontMatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      // 値の部分を結合して、前後の空白とクォートを削除
      let value = valueParts.join(':').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
      data[key.trim()] = value;
    }
  });

  return { data, content: contentWithoutFrontMatter };
}

// Viteの機能を使用して、postsディレクトリ内のすべてのMarkdownファイルをインポート
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

/**
 * すべての投稿を取得し、日付順にソートする
 * @returns {Array} 投稿の配列
 */
export function getAllPosts() {
  const posts = Object.entries(postFiles).map(([filepath, content]) => {
    // ファイル名を取得（パスから拡張子を除いたもの）
    const filename = filepath.split('/').pop().replace('.md', '');

    // front matterを解析
    const { data, content: markdownContent } = parseFrontMatter(content);

    return {
      slug: filename,
      frontmatter: data,
      content: markdownContent,
    };
  });

  // 日付でソート（新しい順）
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
}

/**
 * 特定の投稿を取得する
 * @param {string} slug - 投稿のスラッグ
 * @returns {Object|null} 投稿オブジェクトまたはnull
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}

/**
 * 次の投稿を取得する（日付が古い投稿）
 * @param {string} currentSlug - 現在の投稿のスラッグ
 * @returns {Object|null} 次の投稿オブジェクトまたはnull
 */
export function getNextPost(currentSlug) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);

  // 現在の投稿が見つからない、または最後の投稿の場合はnullを返す
  if (currentIndex === -1 || currentIndex >= posts.length - 1) {
    return null;
  }

  // 次の投稿を返す（日付順でソートされているため、インデックスが1つ大きい投稿が日付的に古い）
  return posts[currentIndex + 1];
}

/**
 * 前の投稿を取得する（日付が新しい投稿）
 * @param {string} currentSlug - 現在の投稿のスラッグ
 * @returns {Object|null} 前の投稿オブジェクトまたはnull
 */
export function getPreviousPost(currentSlug) {
  const posts = getAllPosts();
  const currentIndex = posts.findIndex(post => post.slug === currentSlug);

  // 現在の投稿が見つからない、または最初の投稿の場合はnullを返す
  if (currentIndex <= 0) {
    return null;
  }

  // 前の投稿を返す（日付順でソートされているため、インデックスが1つ小さい投稿が日付的に新しい）
  return posts[currentIndex - 1];
}
