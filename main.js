const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Electronのウィンドウを作成する関数
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false  // 必須、これでNode.jsモジュールが使える
    }
  });

  // HTMLファイルをロード
  win.loadFile('index.html');
}

// アプリの準備ができたらウィンドウを作成
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// すべてのウィンドウが閉じたらアプリを終了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// メインプロセスでJSONデータの保存処理
ipcMain.on('save-tweet', (event, tweetData) => {
  fs.readFile('tweets.json', 'utf8', (err, data) => {
    let tweets = { tweets: [] };

    if (err) {
      if (err.code === 'ENOENT') {
        console.log('tweets.json not found, creating a new one.');
      } else {
        console.error('Error reading file:', err);
        return;
      }
    } else {
      try {
        tweets = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing JSON data, initializing new data:', parseError);
      }
    }

    // 新しいツイートを追加
    tweets.tweets.push(tweetData);

    // JSONファイルに保存
    fs.writeFile('tweets.json', JSON.stringify(tweets, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Tweet saved to tweets.json');
        event.sender.send('tweet-saved');  // ツイート保存成功イベントを送信
      }
    });
  });
});

