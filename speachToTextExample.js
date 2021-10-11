
const Main = require('./src/Main');
const yargs = require('yargs')(process.argv.slice(2));
const main = new Main();
const wordDistinct = new Set();

if (! process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.log('環境変数にGOOGLE_APPLICATION_CREDENTIALSを設定してください')
  process.exit(1);
}

for ( w of yargs.argv._ ) {
  wordDistinct.add(w)
}

main.audio = yargs.argv.f;
main.words = wordDistinct;

(async () =>{
  await main.audioToText();
  main.searchWordPositions();
  const resultsOfReduced = await main.getResult();
  console.log(resultsOfReduced)
})();

yargs
  .alias('f', 'file')
  .nargs('f', 1)
  .usage('利用方法: $0 -f [filePath] -w [単語,単語]')
  .example('$0 -f audio.mp3 -w word word word')
  .describe('f', '検証対象とするmp3ファイルを指定します')
  .describe('w', '検証したい言葉をスペース区切りで記述します')
  .demandOption(['f','w'])
  .argv

