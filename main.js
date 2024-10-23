const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Electronアプリを起動
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ツイートの保存イベントをリスン
ipcMain.on('save-tweet', (event, tweetData) => {
  const { text, link, username, tweetId } = tweetData;

  // ここでツイートをJSONファイルに保存
  const jsonFilePath = 'tweets.json';
  const newTweetData = {
    text,
    link,
    username,
    tweetId,
    tweetDateJP: extractTweetDate(text)  // 日付を抽出
  };

  updateJsonFile(jsonFilePath, newTweetData)
    .then(() => {
      // 成功した場合、フロントエンドに通知
      event.reply('tweet-saved');
    })
    .catch((err) => {
      console.error('Error saving tweet:', err);
    });
});

// ツイートのテキストから日付を抽出する関数
function extractTweetDate(tweetText) {
  // 「午前」または「午後」を含む日付を正規表現で抽出
  const dateMatch = tweetText.match(/(午前|午後)\d{1,2}:\d{2} · \d{4}年\d{1,2}月\d{1,2}日/);
  return dateMatch ? dateMatch[0] : null;
}

const tweetsFilePath = path.join(__dirname, 'tweets.json');

// JSONファイルを更新する関数
function updateJsonFile(filePath, newData) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      let tweets = { tweets: [] }; // デフォルトの空のJSONデータ

      if (err && err.code !== 'ENOENT') {
        // ファイル読み込みに失敗し、ファイルが存在しない（ENOENTエラー）以外のエラーの場合
        console.error('Error reading JSON file:', err);
        return reject(err);
      }

      // ファイルが存在して内容があれば解析
      if (!err && data) {
        try {
          tweets = JSON.parse(data); // JSONデータを解析
        } catch (parseError) {
          console.error('Error parsing JSON data:', parseError);
          // ファイルが不正な場合、初期化して続行
          tweets = { tweets: [] };
        }
      }

      // 新しいツイートデータを追加
      tweets.tweets.push(newData);

      // JSONデータをファイルに書き込み
      fs.writeFile(filePath, JSON.stringify(tweets, null, 2), (err) => {
        if (err) {
          console.error('Error writing to JSON file:', err);
          return reject(err);
        } else {
          console.log('Tweet saved successfully!');
          resolve();
        }
      });
    });
  });
}
