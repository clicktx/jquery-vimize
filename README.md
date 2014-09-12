# jQuery.Vimize
ブラウザでもvimしたい


## 使い方

```
<script src="_path_to_/jquery.min.js"></script>
<script src="_path_to_/jquery.vimize.js"></script>
<script>
    $(function(){
        $().vimize({
            homePagePath: '/', // Path or URL
            searchBoxSelector: 'input#se',
            selectors: {
                0: '.posttitle a, .navigationpost a',
                1: '#sidebar a',
            },
            defaultSelectors: 0
        });
    });
</script>
```


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

### 履歴・他
- `-` トップページへ
- `b` ブラウザの戻る
- `n` ブラウザの進む


## その他

[gpkey](http://ginpen.com/jquery/gpkey/)ってプラグインもあるみたい