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

## TODO List

- Improve accuracy by replicating the test analysis from https://towardsdatascience.com/benchmarking-language-detection-for-nlp-8250ea8b67c and attempt to improve the `formatText()` function by strategically choosing punctuation / non-text characters.

_This is an improved modification of https://www.npmjs.com/package/fasttext-lid_
