
## Google TextSpeach for Example

MP3として保存されいてる日本語の会話を録音したデータを読み込み、  
引数として複数指定するワード毎の発生箇所を検索し、コンソール上に結果を出力する事ができます

## 使い方

### 実行環境の構築:
- nvm
[nvm導入参考手順](https://github.com/nvm-sh/nvm)
環境に合わせて公式の導入方法をご利用ください。  
＊開発時のstableでの稼働のみ確認しています （免疫事項参照）

### 前提:
- APIを利用可能にしてあるサービスアカウントの鍵を利用します。
サービスアカウントがGoogle , Cloud Speech-to-textのAPIの利用を可能な状態にしてご利用ください。
[参考手順参照](https://cloud.google.com/speech-to-text/docs/libraries?hl=ja)

- 鍵ファイルはJSON版をダウンロードいただき、プログラムから参照可能な任意の箇所（KEY_PATH）に配置してください。
- 配置したKEY_PATHを、次のコマンドを用いて環境変数GOOGLE_APPLICATION_CREDENTIALSとして読めるようにしてください。

  export GOOGLE_APPLICATION_CREDENTIALS='KEY_PATH'

## 実行準備:

- 適切なバージョンのnode.jsを導入する
＊nvmが導入済みである必要があります（実行環境の構築参照）

  nvm install 16
  nvm use 16

- how to install packages:

  npm install

### 実行方法:

  node speachToTextExample.js -f <fileName> -w <word> <word> ………

```
  例
  node speachToTextExample.js -f sample.mp3 -w お求め 潤い
```

### 留意点：
依存パッケージにoraを用いていますが、Ver6からESM専用となっております。  
現在ではESMとCJSの同居は困難であるため、oraのバージョンを落としております。  
package-lock.jsonを内包しておりますが、latestに上げないようご注意ください。  
