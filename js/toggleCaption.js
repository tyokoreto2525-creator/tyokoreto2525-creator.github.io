/* =========================================================
   GrapheneOSページ用：ブログ自動生成 + 詳細開閉（統合版）
   - 重複リスナー排除
   - data-no-close：下部「▲ 閉じる」を出さない
   - .no-close-toggle：上部ボタンの文言を変えない
   - #blog-list があれば blogPosts を自動レンダリング
   ========================================================= */

/* ------------------------------
   0) ユーティリティ
------------------------------ */

// 指定ボタンに対応する .caption を返す（ボタン直後の要素）
function getCaptionFor(button) {
  if (!button) return null;
  const el = button.nextElementSibling;
  return el && el.classList.contains('caption') ? el : null;
}

// アコーディオン展開（高さアニメ）
function expand(caption, button, withBottomClose) {
  // すでにボトムボタンがあれば増殖しない
  const ensureBottomCloseButton = () => {
    if (!withBottomClose) return;
    if (caption.querySelector('.bottom-close-button')) return;

    const bottom = document.createElement('button');
    bottom.className = 'bottom-close-button';
    bottom.textContent = '▲ 閉じる';
    bottom.addEventListener('click', () => button.click());
    caption.appendChild(bottom);
  };

  caption.style.maxHeight = 'none';
  const h = caption.scrollHeight;
  caption.style.maxHeight = '0px';
  requestAnimationFrame(() => {
    caption.classList.add('expanded');
    caption.style.maxHeight = h + 'px';
    button.setAttribute('aria-expanded', 'true');

    // .no-close-toggle が **付いていない** 場合だけ文言を変える
    if (!button.classList.contains('no-close-toggle')) {
      button.textContent = '▲ 閉じる';
    }

    ensureBottomCloseButton();
  });

  // アニメ後に max-height を解除して中身の高さ変化に追従
  const tidy = (ev) => {
    if (ev.propertyName === 'max-height' && caption.classList.contains('expanded')) {
      caption.style.maxHeight = 'none';
    }
    caption.removeEventListener('transitionend', tidy);
  };
  caption.addEventListener('transitionend', tidy);
}

// アコーディオン収納（高さアニメ）
function collapse(caption, button) {
  const h = caption.scrollHeight;
  caption.style.maxHeight = h + 'px';
  requestAnimationFrame(() => {
    caption.classList.remove('expanded');
    caption.style.maxHeight = '0px';
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '▼ 詳細を見る';

    const closeBtn = caption.querySelector('.bottom-close-button');
    if (closeBtn) closeBtn.remove();
  });
}

/* ------------------------------
   1) 詳細開閉（イベントデリゲーション1本）
------------------------------ */
document.addEventListener('click', (e) => {
  const button = e.target.closest('.toggle-button');
  if (!button) return;

  const caption = getCaptionFor(button);
  if (!caption) return;

  // 記事単位の設定：data-no-close（下部ボタン抑止）
  const article = button.closest('article');
  const noCloseArticle = article?.hasAttribute('data-no-close');

  const expanding = !caption.classList.contains('expanded');
  if (expanding) {
    expand(caption, button, !noCloseArticle);
  } else {
    collapse(caption, button);
  }
});

/* ------------------------------
   2) ブログ自動生成（#blog-list があれば）
------------------------------ */
const blogPosts = [
  {
    title: "エンジニア職種と必要スキルマップ",
    body: `
      <p>未経験からエンジニアを目指す人のための総合マップとスキルガイドです。</p>

      <h4>ステップ①：あなたに合うエンジニア職種はどれ？</h4>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr>
            <th>職種名</th><th>主な役割</th><th>必要なスキル例</th><th>未経験者へのおすすめ度</th><th>学ぶ言語・技術</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>フロントエンド</td><td>見た目や操作（UI）をつくる</td><td>HTML, CSS, JavaScript, Reactなど</td><td>★★★★★</td><td>HTML/CSS → JS → React/Vue</td></tr>
          <tr><td>バックエンド</td><td>サーバー処理やデータ処理</td><td>Python, PHP, SQL, API, Node.js</td><td>★★★★☆</td><td>JavaScript or Python → SQL/API</td></tr>
          <tr><td>Webエンジニア</td><td>フロントもバックも対応</td><td>HTML/CSS, JS, DB, フレームワーク</td><td>★★★★☆</td><td>フロント + バックを順に学ぶ</td></tr>
          <tr><td>モバイルアプリ</td><td>iPhone/Androidアプリ制作</td><td>Swift, Kotlin, React Native</td><td>★★★☆☆</td><td>HTML/CSS → JS → React Native</td></tr>
          <tr><td>データ/AIエンジニア</td><td>データ分析や機械学習</td><td>Python, Pandas, SQL</td><td>★★★☆☆</td><td>Python → Pandas/Numpy → ML</td></tr>
          <tr><td>インフラ/DevOps</td><td>サーバーやクラウドを整備</td><td>Linux, AWS, Docker</td><td>★★☆☆☆</td><td>CLI → Linux → Docker → AWS</td></tr>
        </tbody>
      </table>

      <h4>ステップ②：未経験者のための学習ステップ</h4>
      <ol>
        <li>HTML / CSS（Webの見た目）</li>
        <li>JavaScript（動きをつける）</li>
        <li>Git / GitHub（コード管理）</li>
        <li>VSCode（開発環境）</li>
        <li>ミニアプリを作成して実践</li>
      </ol>

      <h4>スキル説明と習得順</h4>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr><th>スキル名</th><th>説明</th><th>習得順</th><th>ポイント</th></tr>
        </thead>
        <tbody>
          <tr><td>HTML/CSS</td><td>Webの構造と見た目を作る</td><td>最初</td><td>挫折しにくく、成果が出やすい</td></tr>
          <tr><td>JavaScript</td><td>インタラクティブな動き</td><td>HTML/CSSの後</td><td>実用的なUIが作れる</td></tr>
          <tr><td>Git/GitHub</td><td>コードの保存と共有</td><td>JSと並行</td><td>個人開発でも必須</td></tr>
          <tr><td>VSCode</td><td>開発用エディタ</td><td>初期</td><td>豊富な拡張機能</td></tr>
          <tr><td>API</td><td>外部サービス連携</td><td>JS後</td><td>天気や地図情報の取得など</td></tr>
          <tr><td>SQL</td><td>データの操作・検索</td><td>バックエンド後</td><td>検索・保存に活用</td></tr>
          <tr><td>React / Vue</td><td>UIライブラリ</td><td>JS後</td><td>効率的にUI構築</td></tr>
          <tr><td>Node.js / Python</td><td>サーバー処理・DB連携</td><td>フロント後</td><td>バックエンドの基礎</td></tr>
        </tbody>
      </table>
      <h5>※ポートフォリオ公開にも活用できる（GitHub Pagesなど）</h5>

      <h4>ミニアプリ例とスキル</h4>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead>
          <tr><th>アプリ名</th><th>得られるスキル</th><th>発展可能性</th></tr>
        </thead>
        <tbody>
          <tr><td>ToDoリスト</td><td>DOM操作, JS</td><td>基本動作と画面管理</td></tr>
          <tr><td>お問い合わせフォーム</td><td>HTML, JS</td><td>フォーム入力と送信</td></tr>
          <tr><td>天気表示アプリ</td><td>API連携</td><td>外部データとの接続</td></tr>
          <tr><td>メモ帳アプリ</td><td>ローカルストレージ</td><td>SPAの練習</td></tr>
          <tr><td>タスク管理アプリ</td><td>React / 状態管理</td><td>実務に近い構成</td></tr>
        </tbody>
      </table>

      <h4>おすすめ学習リソース</h4>
      <table border="1" cellspacing="0" cellpadding="6">
        <thead><tr><th>分野</th><th>サイト・サービス名</th></tr></thead>
        <tbody>
          <tr><td>全般</td><td>ドットインストール, Progate, MDN</td></tr>
          <tr><td>動画・実践</td><td>Udemy（セール時）, YouTube</td></tr>
          <tr><td>質問・記事</td><td>Qiita, Teratail, Zenn</td></tr>
          <tr><td>ポートフォリオ</td><td>GitHub, Netlify, Vercel</td></tr>
          <tr><td>案件練習</td><td>ココナラ, クラウドワークス</td></tr>
        </tbody>
      </table>

      <h4>最後に：これが実践的なおすすめ学習ステップ</h4>
      <ol>
        <li>HTML / CSS（見た目を作る）<p>→ 成果がすぐ見えるので、楽しく始められる。</p></li>
        <li>JavaScript（動きをつける）<p>→ サイトにボタンや表示切替などの動きを追加。</p></li>
        <li>Git / GitHub（コード管理）<p>→ 作ったものを安全に保存・公開できる。</p></li>
        <li>ミニアプリ制作（ToDoなど）<p>→ 学んだ知識を作品化して自信と実績に。</p></li>
        <li>進路を決めて特化<p>→ 目的に合わせて深掘り。</p></li>
      </ol>
    `
  },
  {
    title: "未経験から始める学習ステップガイド",
    body: `
      <h2>学習ステップ詳細：未経験から最短で結果を出すには</h2>
      <p>未経験者がエンジニアになるには、順番と戦略が大事。「挫折しない順番」で最速ポートフォリオへ。</p>
      <h3>サイト構成（例）</h3>
      <pre><code>my-portfolio/
├── assets/
├── css/
├── js/
├── pages/
│   ├── blog01.html
│   ├── blog02.html
│   ├── contact.html
│   └── about.html
├── index.html</code></pre>
      <h4>役割まとめ</h4>
      <ul>
        <li><strong>HTML:</strong> 構造</li>
        <li><strong>CSS:</strong> 見た目</li>
        <li><strong>JS:</strong> 動き</li>
      </ul>
      <h4>進め方</h4>
      <ol>
        <li>環境整備（VSCode / DevTools）</li>
        <li>HTML/CSS 基本〜レイアウト</li>
        <li>JS 基本〜DOM/イベント</li>
        <li>Git/GitHub 並行</li>
      </ol>
      <h4>1ヶ月でやり切るコツ</h4>
      <ul>
        <li>毎日1〜3時間、自作する</li>
        <li>動いたらGitHubで見える化</li>
        <li>週1で小さな完成物</li>
      </ul>
    `
  },
  {
    title: "HTMLタグとレイアウトの基本",
    body: `
      <h2>HTMLとは？</h2>
      <p>Webページの骨組みを作る言語。見出し・段落・画像・リンクなどを配置する。</p>
      <h3>最小テンプレ</h3>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ja"&gt;
&lt;head&gt;&lt;meta charset="UTF-8"&gt;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;&lt;title&gt;ページ&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;&lt;h1&gt;こんにちは！&lt;/h1&gt;&lt;/body&gt;
&lt;/html&gt;</code></pre>
      <h3>主要タグ</h3>
      <table border="1" cellpadding="6">
        <thead><tr><th>タグ</th><th>役割</th></tr></thead>
        <tbody>
          <tr><td>&lt;html&gt;</td><td>文書全体</td></tr>
          <tr><td>&lt;head&gt;</td><td>メタ情報</td></tr>
          <tr><td>&lt;body&gt;</td><td>本文</td></tr>
        </tbody>
      </table>
      <h3>レイアウトの型</h3>
      <pre><code>&lt;header&gt;…&lt;/header&gt;
&lt;nav&gt;…&lt;/nav&gt;
&lt;main&gt;…&lt;/main&gt;
&lt;aside&gt;…&lt;/aside&gt;
&lt;footer&gt;…&lt;/footer&gt;</code></pre>
    `
  }
];

function renderBlogList() {
  const list = document.getElementById('blog-list');
  if (!list) return; // ページに #blog-list が無ければ何もしない

  blogPosts.forEach(({ title, body }) => {
    const article = document.createElement('article');
    article.className = 'blog-post panel';

    const h3 = document.createElement('h3');
    h3.textContent = title;

    const btn = document.createElement('button');
    btn.className = 'toggle-button';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '▼ 詳細を見る';

    const cap = document.createElement('div');
    cap.className = 'caption';
    cap.innerHTML = body;

    article.appendChild(h3);
    article.appendChild(btn);
    article.appendChild(cap);
    list.appendChild(article);
  });
}

document.addEventListener('DOMContentLoaded', renderBlogList);
