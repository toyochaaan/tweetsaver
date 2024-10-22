const fs = require('fs');
const readline = require('readline');

// `tweets.json` のパス
const jsonFilePath = 'tweets.json';

// 入力を受け取るインターフェースを設定
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// テキスト入力を受け取って、改行で終わったら入力終了
let tweetText = '';
console.log('Enter the tweet text (end with a blank line):');

rl.on('line', (line) => {
  if (line === '') {
    // 空行が入力されたら、URLを尋ねる
    rl.question('Enter the tweet URL: ', (tweetURL) => {
      // tweetTextから日付を検出して `tweetDateJP` として保存
      const tweetDateJP = extractTweetDate(tweetText);

      if (!tweetDateJP) {
        console.error('Failed to extract the tweet date from the text.');
        return rl.close();
      }

      // ユーザーネームとツイートIDを抽出
      const tweetId = tweetURL.split('/').pop();
      const username = tweetURL.split('/')[3];

      // JSONに書き込むためのデータ
      const newTweetData = {
        text: tweetText.trim(),
        link: tweetURL,
        username: username,
        tweetId: tweetId,
        tweetDateJP: tweetDateJP  // 日付を保存
      };

      // JSONファイルを更新
      updateJsonFile(jsonFilePath, newTweetData);
      rl.close();
    });
  } else {
    tweetText += line + '\n'; // 改行を追加してテキストを保持
  }
});

// ツイートのテキストから日付を抽出する関数
function extractTweetDate(tweetText) {
  // 「午前」または「午後」を含む日付を正規表現で抽出
  const dateMatch = tweetText.match(/(午前|午後)\d{1,2}:\d{2} · \d{4}年\d{1,2}月\d{1,2}日/);
  return dateMatch ? dateMatch[0] : null;
}

// JSONファイルを更新する関数
function updateJsonFile(filePath, newData) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file, initializing new data:', err);
      // ファイルがない場合、新しいJSONデータを作成
      const newJsonData = { tweets: [newData] };
      fs.writeFile(filePath, JSON.stringify(newJsonData, null, 2), (err) => {
        if (err) console.error('Error writing to JSON file:', err);
        else console.log('Tweet saved to new tweets.json');
      });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      jsonData.tweets.push(newData);

      // JSONファイルを上書き
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) console.error('Error writing to JSON file:', err);
        else console.log('Tweet saved to tweets.json');
      });
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
    }
  });
}
