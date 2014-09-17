# jQuery Vimize
ブラウザでもvimしたい

[Gunma.web #17 - Gunma.web](http://gunmaweb.doorkeeper.jp/events/14049) のLTネタ用プラグイン。実用性あるかな？！


## 使い方

```
<script src="_path_to_/jquery.min.js"></script>
<script src="_path_to_/jquery.vimize.js"></script>
<script>
    jQuery(function($){
        $().vimize();
    });
</script>
```

### 設定

```rb
$().vimize({
    homePagePath: '/',
    searchBoxSelector: 'input#se',
    selectors: {
        0: '.posttitle a, .navigationpost a',
        1: '#sidebar a',
    },
    defaultSelectors: 0,
    command: {
        CAT: function(){
            window.location.href = 'https://www.google.co.jp/search?tbm=isch&q=cat';
        }
    }
});
```

- `homePagePath` ホームページのURLまたはpath（絶対path推奨）
- `searchBoxSelector` 検索のinput要素を指定。
- `selectors` hjklで移動出来る要素を指定。
- `defaultSelectors` 複数カラム時、さいしょにjkで移動できるカラム。
- `command` :cmd で実行できるコマンド。keyは大文字のひつようがある

## コマンド

### 検索
- `/`or`?` 検索フォームへ移動（フォーカス）
- `ctrl+w` 入力した文字の削除

### 移動
- `j` 下のエレメント
- `k` 上のエレメント
- `h` 左のカラム（複数カラムのページ）
- `l` 右のカラム（複数カラムのページ）
- `0` 最初のエレメント
- `$` 最後のエレメント

### スクロール
- `gg` ページ最上部へ
- `G` ページ最下部へ
- `d`or`ctrl+d` 下へ
- `u`or`ctrl+u` 上へ

### 履歴
- `-` (`homePagePath`で指定された)ホームページへ
- `b` ブラウザの戻る
- `n` ブラウザの進む

### 他
- `:cat` catの画像を検索
- `:neko` 猫の画像を検索
- `:nyan` にゃんの画像を検索


## その他

[gpkey](http://ginpen.com/jquery/gpkey/)ってプラグインもあるみたい