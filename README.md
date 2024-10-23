# TweetSaver

**TweetSaver** は、ツイートのURLを使ってツイートの情報を抽出し、JSON形式に変換して保存するツールです。

## 機能

- ツイートのURLをCSVまたはJSONファイルから読み込み
- ツイートの内容（ユーザー名、ツイート内容、日時など）を抽出
- 抽出したデータをMongoDBに保存
- CLIでの手動入力にも対応

## インストール方法

1. このリポジトリをクローンします。

    ```bash
    git clone https://github.com/toyochaaan/tweetsaver.git
    cd tweetsaver
    ```

2. 必要な依存関係をインストールします。

    ```bash
    npm install
    ```

3. `.env`ファイルを作成してMongoDBの接続URLを設定します。

    ```bash
    touch .env
    ```

    `.env`ファイルの内容例:

    ```
    MONGODB_URI=your-mongodb-uri
    ```

## 使い方

### 1. CSVまたはJSONファイルからツイートを読み込む



### 3. MongoDBに保存されたデータ例
