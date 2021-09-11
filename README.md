# Fast-Text Language Detection

In a search for the _best_ option for predicting a language from text which didn't require a large machine learning model, it appeared that fast-text, created by FaceBook, was the best option (https://towardsdatascience.com/benchmarking-language-detection-for-nlp-8250ea8b67c).

## Improving Accuracy

Most incorrect suggestions are due to non-text characters (i.e. punctuation) that should be filtered out to provide better results. Please submit an issue for incorrect suggestions so we can work on improving the accuracy.

## Installation

```
npm i --save @smodin/fast-text-language-detection
```

**Note: This will install the fast-text model by facebook which is about 150MB**

## Usage

### Prediction

_Testing_

```js
;(async () => {
  const LanguageDetection = require('@smodin/fast-text-language-detection')
  const lid = new LanguageDetection()

  console.log(await lid.predict('FastText-LID provides a great language identification'))
  console.log(await lid.predict('FastText-LID bietet eine hervorragende Sprachidentifikation'))
  console.log(await lid.predict('FastText-LID fornisce un ottimo linguaggio di identificazione'))
  console.log(await lid.predict('FastText-LID fournit une excellente identification de la langue'))
  console.log(await lid.predict('FastText-LID proporciona una gran identificación de idioma'))
  console.log(await lid.predict('FastText-LID обеспечивает отличную идентификацию языка'))
  console.log(await lid.predict('FastText-LID提供了很好的語言識別'))
})()
```

_Output_

```
[ { lang: 'en', prob: 0.6313226222991943 } ]
[ { lang: 'de', prob: 0.9137916564941406 } ]
[ { lang: 'it', prob: 0.974501371383667 } ]
[ { lang: 'fr', prob: 0.7358829975128174 } ]
[ { lang: 'es', prob: 0.9211937189102173 } ]
[ { lang: 'ru', prob: 0.9899846911430359 } ]
[ { lang: 'zh', prob: 0.8515647649765015 } ]
```

### Other Helpers

```js
const LanguageDetection = require('@smodin/fast-text-language-detection')
const lid = new LanguageDetection()
const languageIsoCodes = lid.languageIsoCodes // ['af', 'als', 'am', 'an', 'ar', ...]
```

## Similar Libaries

FastText has been used and implemented in other computer languages.

- Python[https://github.com/indix/whatthelang]

## Reference Documents

- FastText model 176: https://fasttext.cc/docs/en/language-identification.html

## Accuracy from Benchmark Testing

| Language (97)                    | Symbol | Count (546461) | Accuracy (30 - 250 chars) |
| -------------------------------- | ------ | -------------- | ------------------------- |
| English                          | en     | 22428          | 1                         |
| Greek                            | el     | 12039          | 1                         |
| Hebrew                           | he     | 8616           | 1                         |
| Japanese                         | ja     | 2169           | 1                         |
| Georgian                         | ka     | 1973           | 1                         |
| Bengali                          | bn     | 1164           | 1                         |
| Thai                             | th     | 572            | 1                         |
| Malayalam                        | ml     | 517            | 1                         |
| Korean                           | ko     | 482            | 1                         |
| Burmese                          | my     | 216            | 1                         |
| Tamil                            | ta     | 205            | 1                         |
| Kannada                          | kn     | 118            | 1                         |
| Telugu                           | te     | 102            | 1                         |
| Punjabi (Eastern)                | pa     | 88             | 1                         |
| Lao                              | lo     | 70             | 1                         |
| Gujarati                         | gu     | 57             | 1                         |
| Tibetan                          | bo     | 20             | 1                         |
| Divehi, Dhivehi, Maldivian       | dv     | 15             | 1                         |
| Sinhala                          | si     | 9              | 1                         |
| Amharic                          | am     | 3              | 1                         |
| German                           | de     | 22014          | 0.9998637230853094        |
| Polish                           | pl     | 17768          | 0.999718595227375         |
| Russian                          | ru     | 17329          | 0.9997114663281205        |
| Hungarian                        | hu     | 17942          | 0.9996655891204994        |
| Hindi                            | hi     | 5362           | 0.999627004848937         |
| Vietnamese                       | vi     | 13000          | 0.9996153846153846        |
| Turkish                          | tr     | 19919          | 0.9995983734123199        |
| Esperanto                        | eo     | 17841          | 0.999551594641556         |
| French                           | fr     | 23076          | 0.999523314265904         |
| Marathi                          | mr     | 10461          | 0.9995220342223496        |
| Uyghur                           | ug     | 3692           | 0.9991874322860238        |
| Finnish                          | fi     | 17406          | 0.9990807767436516        |
| Italian                          | it     | 18326          | 0.9989632216522972        |
| Spanish                          | es     | 18227          | 0.998134635430954         |
| Armenian                         | hy     | 518            | 0.9980694980694981        |
| Ukrainian                        | uk     | 14285          | 0.9963598179908996        |
| Macedonian                       | mk     | 14465          | 0.9959903214656066        |
| Dutch                            | nl     | 19626          | 0.9934780393355752        |
| Lithuanian                       | lt     | 13835          | 0.9933501987712324        |
| Portuguese                       | pt     | 20174          | 0.9933082184990581        |
| Khmer                            | km     | 379            | 0.9920844327176781        |
| Urdu                             | ur     | 963            | 0.9906542056074766        |
| Czech                            | cs     | 10863          | 0.9898738838258307        |
| Swedish                          | sv     | 12188          | 0.9886773875943551        |
| Romanian                         | ro     | 13560          | 0.9886430678466077        |
| Bulgarian                        | bg     | 11144          | 0.9869885139985642        |
| Ossetian                         | os     | 59             | 0.9830508474576272        |
| Icelandic                        | is     | 6364           | 0.9803582652419862        |
| Kazakh                           | kk     | 2232           | 0.9802867383512545        |
| Tagalog                          | tl     | 10351          | 0.9737223456670853        |
| Tatar                            | tt     | 8178           | 0.9680851063829787        |
| Basque                           | eu     | 2999           | 0.9676558852950984        |
| Tajik                            | tg     | 30             | 0.9666666666666667        |
| Belarusian                       | be     | 6253           | 0.9625779625779626        |
| Chuvash                          | cv     | 460            | 0.9543478260869566        |
| Breton                           | br     | 2451           | 0.9543043655650755        |
| Bashkir                          | ba     | 120            | 0.95                      |
| Indonesian                       | id     | 9372           | 0.949637217242851         |
| Danish                           | da     | 15299          | 0.948035819334597         |
| Latin                            | la     | 11437          | 0.9206085511934948        |
| Irish                            | ga     | 867            | 0.9065743944636678        |
| Scottish Gaelic                  | gd     | 542            | 0.8966789667896679        |
| Welsh                            | cy     | 619            | 0.8917609046849758        |
| Catalan                          | ca     | 4725           | 0.8833862433862434        |
| Kyrgyz                           | ky     | 66             | 0.8787878787878788        |
| Cornish                          | kw     | 426            | 0.8779342723004695        |
| Assamese                         | as     | 960            | 0.8635416666666667        |
| Volapük                          | vo     | 806            | 0.8511166253101737        |
| Serbian                          | sr     | 13494          | 0.8489699125537276        |
| Slovak                           | sk     | 4370           | 0.8263157894736842        |
| Maltese                          | mt     | 52             | 0.8076923076923077        |
| Afrikaans                        | af     | 1632           | 0.7879901960784313        |
| Occitan                          | oc     | 2861           | 0.7679133170220203        |
| Interlingua                      | ia     | 18782          | 0.7500798636992866        |
| Sanskrit                         | sa     | 11             | 0.7272727272727273        |
| Chechen                          | ce     | 7              | 0.7142857142857143        |
| Slovenian                        | sl     | 372            | 0.6774193548387096        |
| Frisian                          | fy     | 107            | 0.6635514018691588        |
| Javanese                         | jv     | 260            | 0.6461538461538462        |
| Yoruba                           | yo     | 5              | 0.6                       |
| Luxembourgish                    | lb     | 217            | 0.5944700460829493        |
| Galician                         | gl     | 2618           | 0.5790679908326967        |
| Turkmen                          | tk     | 3793           | 0.5710519377801213        |
| Croatian                         | hr     | 2222           | 0.5333033303330333        |
| Norwegian Nynorsk                | nn     | 657            | 0.5220700152207002        |
| Aragonese                        | an     | 4              | 0.5                       |
| Ido                              | io     | 2905           | 0.48055077452667816       |
| Interlingue                      | ie     | 2007           | 0.4718485301444943        |
| Limburgan, Limburger, Limburgish | li     | 3              | 0.3333333333333333        |
| Walloon                          | wa     | 16             | 0.3125                    |
| Somali                           | so     | 32             | 0.21875                   |
| Corsican                         | co     | 5              | 0.2                       |
| Sundanese                        | su     | 11             | 0.18181818181818182       |
| Haitian Creole                   | ht     | 15             | 0.06666666666666667       |
| Romansh                          | rm     | 16             | 0.0625                    |
| Bosnian                          | bs     | 139            | 0.03597122302158273       |
| Manx                             | gv     | 6              | 0                         |

## TODO List

- Improve accuracy by replicating the test analysis from https://towardsdatascience.com/benchmarking-language-detection-for-nlp-8250ea8b67c and attempt to improve the `formatText()` function by strategically choosing punctuation / non-text characters.

_This is an improved modification of https://www.npmjs.com/package/fasttext-lid_

Created with <3 for https://smodin.io
