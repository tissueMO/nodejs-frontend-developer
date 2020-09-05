汎用フロントエンド開発キット on Dockerコンテナ
====

## Summary

Node.jsをDockerコンテナで動かしてフロントエンド開発できるようにするお手軽キットです。  


## Dependency

- Docker
  - Node.js LTS版
    - 開発環境
  - Apache2
    - 本番稼働用Webサーバー

- Node.js
  - Yarn
    - JavaScriptパッケージマネージャー
  - ESLint
    - JavaScript静的コード解析ツール
  - Babel
    - JavaScriptトランスパイラー
  - Sass
    - CSSメタ言語
  - Webpack
    - モジュールバンドラー


## Setup

### Dockerイメージビルド

本リポジトリーを git clone したディレクトリーに移動している前提とします。  

#### 開発向け

`$ docker build -t nodejs-frontend-developer:dev --target dev .`

#### 本番向け

`$ docker build -t nodejs-frontend-developer:prod --target prod .`


## Usage

### 開発向け

#### Node.js パッケージインストール

以下のコマンドを実行すると、必要なパッケージが一式 `node_module` ディレクトリーにインストールされます。  
`package.json` を更新した際は毎回実行する必要があります。  

`$ docker run --rm -v $(pwd):/src nodejs-frontend-developer:dev install`  

新たにNode.jsパッケージを追加する場合は以下コマンドを実行します。  

`$ docker run --rm -v $(pwd):/src nodejs-frontend-developer:dev add {PACKAGE_NAME}`  


#### 開発用Webサーバー起動

以下のコマンドを実行すると、Webpack内蔵のWebサーバーを起動できます。

`$ docker run --rm -p 3000:3000 -it -v $(pwd):/src nodejs-frontend-developer:dev start`


#### 開発用ビルド

以下のコマンドを実行すると、Minifyされた状態のHTML/CSS/JavaScriptをソースマップ付きで `dist` ディレクトリーにビルドします。

`$ docker run --rm -v $(pwd):/src nodejs-frontend-developer:dev dev`


#### 本番用ビルド

以下のコマンドを実行すると、Minifyされた状態のHTML/CSS/JavaScriptをソースマップ無しで `dist` ディレクトリーにビルドします。

`$ docker run --rm -v $(pwd):/src nodejs-frontend-developer:dev build`


### 本番向け

#### Webサーバー起動

- Dockerコンテナを起動します。
  - `$ docker run --rm -p 8080:80 nodejs-frontend-developer:prod`
- Webブラウザーからページを開きます。
  - `http://localhost:8080/`
- HTML/CSS/JavaScriptがそれぞれMinimfyされた状態で出力されていることが確認できます。
- 任意のコンテナ対応サービスにデプロイすることで、そのままWebサイトとして本番稼働させることができます。

#### GitHub PackagesにDockerコンテナイメージをプッシュ

- GitHub Actionsページの `GitHub Packages` から Run workflow して手動でワークフローを起動します。  
- ワークフローの処理が完了すると、同リポジトリーのPackagesにビルドされたDockerイメージが保管されます。  

#### GitHub PagesにWebサイトをデプロイ

- GitHub Actionsページの `GitHub Pages` から Run workflow して手動でワークフローを起動します。  
- ワークフローの処理が完了すると、 `gh-pages` ブランチが作成されていることが確認できます。
- GitHubリポジトリーのSettingsからGitHub PagesのSourceブランチに `gh-pages` を指定します。
- >Your site is published at ...
  - ... に続くURLに、Webサイトがデプロイされていることが確認できます。


## License

[MIT](LICENSE.md)


## Author

[tissueMO](https://github.com/tissueMO)
