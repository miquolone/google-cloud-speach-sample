
const Base = require('./Base');
const speech = require('@google-cloud/speech').v1p1beta1;
const fs = require('fs');

module.exports = class Main extends Base {

  constructor() {
    super();
  }

  audio = 'sampleInputVoiceJA.mp3';
  words = [];
  text = "";
  results = [];

  hash = {}
  set audio (v) {
    this.audio = v;
  }

  set words (v) {
    this.words = v;
  }

  set text(v) {
    this.text = v;
  }

  get text() {
    return this.text;
  }

  /**
   * 文字列の検索を行う
   */
  searchWordPositions() {
    this.cli('Google Recogniz mp3 2/3');
    for (let word of this.words) {
      this.getPosition(word, 0);
    }
  }

  /**
   * getPosition
   *
   * 前提：文字起こし後に実行
   *
   * 単語に対し、文字起こし済み文字列内の全出現箇所を特定
   *
   * @params word {String} 検索対象の単語
   *
   */
  getPosition(word, currentPosition) {
    this.cli( 'search Word  3/3');
    let text = this.text.substr(currentPosition)
    let position = text.search(word)
    let seekedPosition = currentPosition + position;

    if (position >= 0 ) {

      var st = position -5;
      var en = position + word.length +5;

      if (st < 0) { st = 0 }

      this.results.push({
        position: position,
        word: word,
        sentence: text.slice(st, en)
      })

      this.getPosition(word, word.length + seekedPosition)
    }
  }

  /**
   * getResult
   *
   * 結果を取り出す
   *
   */
  async getResult() {
    this.cli()
    return this.results.reduce((accumulator, currentValue) => {
      if (accumulator[currentValue.word]) {
        accumulator[currentValue.word].push( currentValue)
      } else {
        accumulator[currentValue.word] = [currentValue]
      }
      return accumulator
    }, {})
  }

  /**
   *
   * audioToText
   * 文字起こしを実行する
   *
   */
  async audioToText() {
    this.cli('initializing Google Recognize 1/3');
    const audio = { content: fs.readFileSync(this.audio).toString('base64'), };
    const config = { encoding: 'MP3', sampleRateHertz: 16000, languageCode: 'ja-JP', };
    const request = { audio: audio, config: config, };
    const client = new speech.SpeechClient();
    const [response] = await client.recognize(request);

    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    this.text = transcription;
  }

}
