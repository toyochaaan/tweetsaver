# TweetSaver

**TweetSaver** は、ツイートのURLを使ってツイートの情報を抽出し、JSON形式に変換して保存するツールです。
## 技術スタック
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

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
    npm init -y
    npm install electron --save-dev
    npm install fs
    ```

## 使い方

### 1. GUIを起動

    ```bash
    npm start
    ```
![GUI](https://github.com/user-attachments/assets/2c2c1d00-1312-4e7b-83a1-7202473eca34)


### 2. 
