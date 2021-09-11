const fs = require('fs')
const { version } = require('../package.json')
const PromisePool = require('@supercharge/promise-pool')
const LanguageDetection = require('../src/index.ts')
const lid = new LanguageDetection()

const asyncPoolForEach = (array: any[], callback: Function, concurrency = 3) => {
  return PromisePool.for(array).withConcurrency(concurrency).process(callback)
}

const data = [
  {
    language: 'en',
    texts: ['This is an english sentence', 'this is another english sentence'],
  },
]

const predict = async (text: string) => {
  const predictions = await lid.predict(text)

  return Array.isArray(predictions) && predictions[0] ? predictions[0].lang : null
}

const analyzeDatasets = async (data: any[]) => {
  const results: any = {}
  await asyncPoolForEach(data, async ({ language, texts }: { language: string; texts: string[] }) => {
    let count = 0
    let accuratePredictions = 0

    await asyncPoolForEach(
      texts,
      async (text: string) => {
        const prediction = await predict(text)
        count = count + 1
        if (prediction === language) {
          accuratePredictions = accuratePredictions + 1
        }
      },
      10
    )

    results[language] = {
      count,
      accuratePredictions,
      accuracy: accuratePredictions / count,
    }
  })

  // save results file
  fs.writeFileSync(`./results/benchmark_results_${version}.json`, JSON.stringify(results), 'utf-8')
}

analyzeDatasets(data)
