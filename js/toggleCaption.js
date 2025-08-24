// ------------------------------
// ① 詳細開閉ボタンの処理（下部ボタン付き）
// ------------------------------
document.addEventListener('click', (e) => {
  const button = e.target.closest('.toggle-button');
  if (!button) return;

  const caption = button.nextElementSibling;
  if (!caption || !caption.classList.contains('caption')) return;

  const expanding = !caption.classList.contains('expanded');

  if (expanding) {
    caption.style.maxHeight = 'none';
    const h = caption.scrollHeight;
    caption.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      caption.classList.add('expanded');
      caption.style.maxHeight = h + 'px';
      button.textContent = '▲ 閉じる';
      button.setAttribute('aria-expanded', 'true');

      // ▼ ここで下部閉じるボタンを追加
      const bottomCloseBtn = document.createElement("button");
      bottomCloseBtn.textContent = "▲ 閉じる";
      bottomCloseBtn.className = "bottom-close-button";
      bottomCloseBtn.style.marginTop = "20px";
      bottomCloseBtn.style.display = "block";
      bottomCloseBtn.style.marginLeft = "auto";
      bottomCloseBtn.style.marginRight = "auto";

      bottomCloseBtn.addEventListener("click", () => {
        button.click(); // 上のボタンをクリックしたのと同じ動作
      });

      caption.appendChild(bottomCloseBtn); // ← 追加！

    });
  } else {
    const h = caption.scrollHeight;
    caption.style.maxHeight = h + 'px';
    requestAnimationFrame(() => {
      caption.classList.remove('expanded');
      caption.style.maxHeight = '0px';
      button.textContent = '▼ 詳細を見る';
      button.setAttribute('aria-expanded', 'false');

      // 下部ボタンがあれば削除
      const closeBtn = caption.querySelector('.bottom-close-button');
      if (closeBtn) closeBtn.remove();
    });
  }

  const tidy = (ev) => {
    if (ev.propertyName === 'max-height' && caption.classList.contains('expanded')) {
      caption.style.maxHeight = 'none';
    }
    caption.removeEventListener('transitionend', tidy);
  };
  caption.addEventListener('transitionend', tidy);
});



// ------------------------------
// ② ブログ記事の自動生成＋開閉機能
// ------------------------------

// ブログ記事01

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
      <li>HTML / CSS（見た目を作る）
　　　<p>→ 成果がすぐ見えるので、楽しく始められる。　</p></li>
      <li>JJavaScript（動きをつける）
　　<p>→ Webサイトにボタンや表示切替などの動きを加えられる。　</p></li>
      <li>Git / GitHub（コードを管理する）
　　<p>→ 作ったものを安全に保存・公開でき、実務にも役立つ。　</p></li>
      <li>ミニアプリ制作（ToDoリストなど）
　　<p>→ 習った知識を自分の作品にし、自信と実績につなげる。　</p></li>
      <li>進路を決めて特化（フロント / バックエンド / モバイル）
　　<p>→ 作りたいもの・働きたい方向に合わせて深堀りしていく。　</p></li>
    </ol>

  `
 },


// ブログ記事02
  { 
   title: "未経験から始める学習ステップガイド",
  body: `
      <h2>学習ステップ詳細：未経験から最短で結果を出すには</h2>
      <p>未経験者がエンジニアになるには、順番と戦略がとても大事です。特に「挫折しない順番」で取り組むことで、最速でポートフォリオにたどりつき、チャンスを得ることができます。</p>

      <h3>サイト構成＆制作スタイル完全ガイド（HTMLとJSどちらが向くか）</h3>
      <pre><code>my-portfolio/
├── assets/
├── css/
├── js/
├── music/
├── videos/
├── pages/
│   ├── blog01.html
│   ├── blog02.html
│   ├── contact.html
│   └── about.html
├── index.html
      </code></pre>

      <h4>HTML / CSS / JS の役割まとめ（初心者向け）</h4>
      <ul>
        <li><strong>HTML:</strong> 骨組み・構造（タイトル、段落、リストなど）</li>
        <li><strong>※意味を持つタグ（&lt;section&gt;, &lt;article&gt;, &lt;nav&gt;など）も使えるとSEO的にも有利。</strong></li>
        <li><strong>CSS:</strong> 見た目を整える（色、サイズ、位置など）</li>
        <li><strong>JS:</strong> 動きをつける（開閉、動的生成、フォーム操作など）</li>
      </ul>

      <h4>記述スタイル別の比較</h4>
      <ul>
        <li>静的ページ → <strong>HTMLで直書き</strong>（SEOに強くて管理が簡単）</li>
        <li>更新が多いブログ → <strong>JSで配列＋自動表示</strong></li>
        <li>SEOが重要 → <strong>HTMLで明示的に記述</strong></li>
      </ul>

      <h3>ステップ0：最低限の理解（1日〜3日）</h3>
      <ul>
        <li>VSCode、Chromeなどの開発環境を整える</li>
　      <li>Chromeの開発者ツール（F12）を使って、HTML構造やスタイル、JavaScriptのエラーなどを確認する習慣をつける。</li>
        <li>.html / .css / .js ファイルの違いを理解し手を動かす</li>
  </ul>

      <h3>ステップ1：HTML/CSSでページ制作（〜7日）</h3>
      <ul>
        <li>HTMLの構造 → 見出し、段落、リスト</li>
        <li>CSSの装飾 → 色・背景・フォント・枠線</li>
        <li>FlexboxやGridでレイアウト構成</li>
      </ul>

      <h3>ステップ2：JavaScriptで動きを追加（7〜14日）</h3>
      <ul>
        <li>変数・関数・イベント → ボタンクリックやカウント機能</li>
        <li>DOM操作 → HTML要素を動かす</li>
        <li>条件分岐・ループ → 表やリストの自動生成</li>
      </ul>

      <h3>ステップ3：Git/GitHub（並行して習得）</h3>
      <ul>
        <li>Gitでローカル履歴管理（git init / commit）</li>
        <li>GitHubで公開（push / pull / branch）</li>
        <li>READMEでプロジェクト説明</li>
      </ul>

      <h3>ステップ4：簡単なアプリ制作</h3>
      <ul>
        <li>ToDoリスト（JS＋DOM）</li>
        <li>お問い合わせフォーム（JS＋バリデーション）</li>
        <li>カウントダウンタイマー（イベント＋日時）</li>
      </ul>

      <h3>ステップ5：進路分岐と特化（21日以降〜）</h3>
      <ul>
        <li>フロント特化：React / Vue / TypeScript</li>
        <li>バックエンド特化：Node.js / Python / DB</li>
        <li>モバイル：React Native / Flutter</li>
      </ul>

      <h4>補足：1ヶ月でやり切るコツ</h4>
      <ul>
        <li>毎日1〜3時間、写経ではなく自作で</li>
        <li>動いたらGitHubにアップして見える化</li>
        <li>週1回、小さな完成作品を出す</li>
      </ul>
    `
  },


// ブログ記事03
{
  title: "HTMLタグとレイアウトの基本",
  body: `
    <h2>HTMLとは？</h2>
    <p>HTML（エイチティーエムエル）とは、Webページの構造（骨組み）を作るマークアップ言語です。テキストや画像、リンク、見出しなどをどこにどう表示するかを指示するために使います。</p><br>

    <h3>HTMLテンプレートの基本構造（最小構成）</h3>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ja"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8" /&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
  &lt;title&gt;ページタイトル&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;こんにちは、HTML！&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;
    </code></pre><br>

    <h4> 各タグ・属性の意味</h4>
    <table border="1" cellpadding="6">
      <thead><tr><th>タグ・属性</th><th>説明</th></tr></thead>
      <tbody>
        <tr><td>&lt;!DOCTYPE html&gt;</td><td>HTML5で書かれた文書であることを宣言（必須）</td></tr>
        <tr><td>&lt;html lang="ja"&gt;</td><td>HTML文書の開始。lang="ja" は「日本語の文書」という意味</td></tr>
        <tr><td>&lt;head&gt;</td><td>ページの情報（文字コード、タイトル、CSSなど）を定義する場所</td></tr>
        <tr><td>&lt;meta charset="UTF-8"&gt;</td><td>文字化け防止。全世界共通の文字エンコード</td></tr>
        <tr><td>&lt;meta name="viewport" ...&gt;</td><td>スマホ・タブレットでも自動調整する指示</td></tr>
        <tr><td>&lt;title&gt;</td><td>ページのタブに表示されるタイトル</td></tr>
        <tr><td>&lt;body&gt;</td><td>ユーザーが実際に見る内容（本文）</td></tr>
      </tbody>
    </table>

    <p>この6行は、日本語HTMLページでは必ず入れるテンプレートです。</p><br>

    <h3>HTMLは3つの主要タグで構成されている</h3>
    <table border="1" cellpadding="6">
      <thead><tr><th>タグ</th><th>役割</th></tr></thead>
      <tbody>
        <tr><td>&lt;html&gt;</td><td>HTML文書全体を囲む</td></tr>
        <tr><td>&lt;head&gt;</td><td>ページ情報（裏方）</td></tr>
        <tr><td>&lt;body&gt;</td><td>表示する本文</td></tr>
      </tbody>
    </table><br>

    <h3>よく使う基本タグまとめ（コード＋表示セット）</h3>
    <table border="1" cellpadding="6">
      <thead><tr><th>タグ</th><th>意味</th><th>コード例</th><th>表示例</th></tr></thead>
      <tbody>
        <tr><td>&lt;h1&gt;</td><td>見出し</td><td>&lt;h1&gt;大見出し&lt;/h1&gt;</td><td><h1>大見出し</h1></td></tr>
        <tr><td>&lt;p&gt;</td><td>段落</td><td>&lt;p&gt;文章です。&lt;/p&gt;</td><td><p>文章です。</p></td></tr>
        <tr><td>&lt;a&gt;</td><td>リンク</td><td>&lt;a href="#"&gt;リンク&lt;/a&gt;</td><td><a href="#">リンク</a></td></tr>
        <tr><td>&lt;img&gt;</td><td>画像</td><td>&lt;img src="img.jpg" alt="画像"&gt;</td><td>（画像が表示されます）</td></tr>
        <tr><td>&lt;ul&gt;</td><td>箇条書き</td><td>&lt;ul&gt;&lt;li&gt;項目&lt;/li&gt;&lt;/ul&gt;</td><td><ul><li>項目</li></ul></td></tr>
        <tr><td>&lt;ol&gt;</td><td>番号リスト</td><td>&lt;ol&gt;&lt;li&gt;一番目&lt;/li&gt;&lt;/ol&gt;</td><td><ol><li>一番目</li></ol></td></tr>
        <tr><td>&lt;br&gt;</td><td>改行</td><td>テキスト&lt;br&gt;改行</td><td>テキスト<br>改行</td></tr>
        <tr><td>&lt;hr&gt;</td><td>区切り線</td><td>&lt;hr&gt;</td><td><hr></td></tr>
        <tr><td>&lt;strong&gt;</td><td>太字</td><td>&lt;strong&gt;重要&lt;/strong&gt;</td><td><strong>重要</strong></td></tr>
      </tbody>
    </table>
    <h3>よく使う基本タグまとめ（コード＋表示セット）</h3>
    <table border="1" cellpadding="6">
      <thead><tr><th>タグ</th><th>意味</th><th>用途例</th></tr></thead>
      <tbody>
        <tr><td>&lt;section&gt;</td><td>セクションのまとまり</td><td>コンテンツの区分け</td></td></tr>
        <tr><td>&lt;article&gt;</td><td>独立した記事</td><td>ブログ・ニュースなど</td></td></tr>
        <tr><td>&lt;nav&gt;</td><td>ナビゲーション</td><td>メニュー・リンク一覧</td></td></tr>
             </tbody>
    </table>


<br>

    <h3>レイアウトの基本構成</h3>
    <pre><code>&lt;header&gt;ヘッダー&lt;/header&gt;
&lt;nav&gt;ナビゲーション&lt;/nav&gt;
&lt;main&gt;メインコンテンツ&lt;/main&gt;
&lt;aside&gt;サイドバー&lt;/aside&gt;
&lt;footer&gt;フッター&lt;/footer&gt;
    </code></pre>

    <table border="1" cellpadding="6">
      <thead><tr><th>部位</th><th>内容例</th></tr></thead>
      <tbody>
        <tr><td>&lt;header&gt;</td><td>サイトタイトル、ロゴなど</td></tr>
        <tr><td>&lt;nav&gt;</td><td>メニューやリンク一覧</td></tr>
        <tr><td>&lt;main&gt;</td><td>記事や商品などの主内容</td></tr>
        <tr><td>&lt;aside&gt;</td><td>補足情報（広告、関連リンクなど）</td></tr>
        <tr><td>&lt;footer&gt;</td><td>コピーライト、SNSリンクなど</td></tr>
      </tbody>
    </table><br>

    <h3>実践：HTMLを自分で書いて開いてみよう</h3>
    <ol>
      <li>メモ帳を開く。（Windowsなら「メモ帳」アプリ）</li>
      <li>以下のテンプレートコードを貼り付ける。</li>
      <li>「名前を付けて保存」→ ファイル名ここでは<strong>index.html</strong>と定義しながら拡張子をhtmlに変更する。</li>
      <li>ファイルの種類：<strong>すべてのファイル</strong>、文字コード：<strong>UTF-8</strong></li>
      <li>保存したら、<strong>ダブルクリックでブラウザが開く。</strong></li>
    </ol>

<h4>実務でもよく使う「基本テンプレート」例：</h4>
<pre><code>
&lt;!DOCTYPE html&gt;
&lt;html lang="ja"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;はじめてのHTML&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;こんにちは、HTML！&lt;/h1&gt;
  &lt;p&gt;これは段落です。&lt;/p&gt;
  &lt;a href="https://example.com"&gt;リンクはこちら&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;
  </code></pre>
<h3>ブラウザで以下のような文字が表示される。</h3>
<img src="../assets/html-template.webp" alt="テスト画像" width="600">

    <p><strong>※拡張子が見えない場合：</strong> エクスプローラーで「表示」→「ファイル名拡張子」にチェックを入れよう。</p><br>

<h3> 結論とポイント</h3> <ul> <li>HTMLは「意味ごと」にタグを使い分ける</li> <li>テンプレートは毎回同じでOK（再利用可能）</li> <li>&lt;head&gt; は裏方、&lt;body&gt; が画面に表示される部分</li> <li>「コード＋表示セット」で学ぶと理解しやすい！</li> </ul> `}

];



