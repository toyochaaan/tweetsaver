# TweetSaver

**TweetSaver** は、ツイートのURLを使ってツイートの情報を抽出し、JSON形式に変換して保存するツールです。
## 技術スタック
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

## 機能

- ツイートのURLからユーザー名とツイートIDを取得
- ツイートの内容をtweetTextとして保存。改行されたツイートにも対応。
- GUIでの入力に対応

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


### 2. XからポストとURLをコピペ
![GUI2](https://github.com/user-attachments/assets/90dc144c-8754-4960-a956-57244b4cd9d5)

### 3. 保存(save)ボタンをクリック

### 4. tweets.jsonを確認

    ```bash
    {
        "tweets": [
            {
            "text": "ツイート内容1",
            "link": "https://x.com/username1/status/1234567890",
            "username": "username1",
            "tweetId": "1234567890"
            },
            {
            "text": "ツイート内容2",
            "link": "https://x.com/username2/status/0987654321",
            "username": "username2",
            "tweetId": "0987654321"
            }
        ]
    }

    ```
