/*  internal requirements  */
const path = require('path')

/*  external requirements  */
const { Classifier } = require('fast-text')

// Some characters can misconstrude the results
// Removing \n and : because of this issue: https://github.com/indix/whatthelang/issues/12
function formatInput(text: string) {
  return text.replace(/[\n:]/g, '')
}

/*  the API class  */
class LanguageDetection {
  constructor(options = {}) {
    this.options = Object.assign(
      {},
      {
        model: path.join(__dirname, '..', 'model', 'fast-text-lid-model.bin'),
      },
      options
    )
    this.classifier = new Classifier(this.options.model)
  }
  predict(text: string, k = 1) {
    return new Promise((resolve, reject) => {
      this.classifier.predict(formatInput(text), k, (err, res) => {
        if (err) reject(err)
        else {
          res = res.map((item) => {
            return {
              lang: item.label.replace(/^__label__/, ''),
              prob: item.value,
            }
          })
          resolve(res)
        }
      })
    })
  }
}

module.exports = LanguageDetection
