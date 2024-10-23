window.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = require('electron');
  let alertShown = false;  // アラートが一度だけ表示されるようにするフラグ

  document.getElementById('saveButton').addEventListener('click', () => {
    const tweetText = document.getElementById('tweetText').value;
    const tweetUrl = document.getElementById('tweetUrl').value;

    // ツイートURLからユーザーネームとツイートIDを抽出
    const tweetParts = tweetUrl.match(/https:\/\/x\.com\/([^\/]+)\/status\/(\d+)/);
    if (!tweetParts || tweetParts.length < 3) {
      alert('Invalid tweet URL format.');
      return;
    }

    const username = tweetParts[1];
    const tweetId = tweetParts[2];

    // データを送信
    ipcRenderer.send('save-tweet', {
      text: tweetText,
      link: tweetUrl,
      username: username,
      tweetId: tweetId
    });
  });

  // メインプロセスからツイート保存成功の通知を受け取ったら入力欄をクリア
  ipcRenderer.on('tweet-saved', () => {
    document.getElementById('tweetText').value = '';  // テキストをクリア
    document.getElementById('tweetUrl').value = '';   // URLをクリア

    // アラートがまだ表示されていない場合のみ表示
    if (!alertShown) {
      alert('Tweet saved successfully!');
      alertShown = true;  // アラートが一度だけ表示されるようにする
    }
  });
});
