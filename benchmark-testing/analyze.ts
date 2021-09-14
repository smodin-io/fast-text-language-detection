const fs = require('fs')
const { version } = require('../package.json')
const csv = require('csvtojson')
const franc = require('franc')
const { asyncPoolForEach, getTSVsInDir } = require('./helpers')
const { tatoeba2Languages, fastTextLanguages } = require('./constants')
const LanguageDetection = require('../src/index.ts')
const lid = new LanguageDetection()

const getFileNameAndPath = (iso3Code: string) => `data/${iso3Code}_sentences.tsv`

const getTsvSentences = (iso3Code: string, limit: number, minSentenceLength: number, maxSentenceLength: number) => {
  const content = fs.readFileSync(getFileNameAndPath(iso3Code), 'utf8')
  const rows = content.split('\n').slice(0, limit)
  const filteredRows = rows.filter((row: string) => {
    const columns = row.split('\t')
    if (columns.length !== 3) {
      return false
    } else {
      const sentenceLength = columns[2].length
      if (sentenceLength < minSentenceLength || sentenceLength > maxSentenceLength) {
        return false
      }
    }

    return true
  })

  const sentences = filteredRows.map((row: string) => row.split('\t')[2])

  return sentences
}

const buildData = async (
  limit: number,
  minSentenceLength: number,
  maxSentenceLength: number,
  includeOnly?: string[]
) => {
  const TSVFiles = getTSVsInDir('data')
  const iso3Langs = tatoeba2Languages.map((lang: any) => lang.iso3)
  const iso3LangsWithData = TSVFiles.filter((file: string) => iso3Langs.includes(file.substring(0, 3))).map(
    (file: string) => file.substring(0, 3)
  )

  let sentenceCount: number = 0
  const DATA: any[] = []
  await asyncPoolForEach(iso3LangsWithData, async (iso3Lang: string) => {
    const tatoeba2Language = tatoeba2Languages.find((lang: any) => lang.iso3 === iso3Lang)
    const { fastTextSymbol, alternativeSymbols } = tatoeba2Language
    if (!includeOnly || includeOnly.includes(fastTextSymbol)) {
      const sentences = getTsvSentences(iso3Lang, limit, minSentenceLength, maxSentenceLength)

      if (sentences.length > 0) {
        console.info(`${fastTextSymbol}: ${sentences.length} sentences`)
        sentenceCount = sentenceCount + sentences.length
        DATA.push({
          language: fastTextSymbol,
          alternativeSymbols,
          texts: sentences,
        })
      }
    }
  })

  console.info(`FINAL: ${DATA.length} languages & ${sentenceCount} sentences`)

  return [DATA, sentenceCount]
}

const predict = async (text: string) => {
  const predictions = await lid.predict(text)

  return Array.isArray(predictions) && predictions[0] ? predictions[0].lang : null
}

const createResultsMDFile = (
  results: any[],
  languageCount: number,
  sentenceCount: number,
  minSentenceLength: number,
  maxSentenceLength: number
) => {
  // const results = require('./results/benchmark_results_0.2.1.json') // optionally create from existing file
  const sortedResults = Object.keys(results)
    .map((lang: string) => ({ fastTextSymbol: lang, ...results[lang] }))
    .sort((a, b) => {
      if (a.accuracy === b.accuracy) {
        return b.count - a.count
      }
      return a.accuracy < b.accuracy ? 1 : -1
    })

  const getResultsMDDisplayRow = (result: any) => {
    const tatoeba2Language = tatoeba2Languages.find((l: any) => l.fastTextSymbol === result.fastTextSymbol)
    const { language, alternativeSymbols } = tatoeba2Language

    return `| ${language} | ${result.fastTextSymbol}${alternativeSymbols ? ` (${alternativeSymbols})` : ''} | ${
      result.count
    } | ${result.accuracy} | ${result.addedAccuracy} | ${result.falsePositives} |`
  }
  const getResultsCSVRow = (result: any) => {
    const tatoeba2Language = tatoeba2Languages.find((l: any) => l.fastTextSymbol === result.fastTextSymbol)
    const { language, alternativeSymbols } = tatoeba2Language

    return [
      language.replace(/,/g, '|'),
      `${result.fastTextSymbol}${alternativeSymbols ? ` (${alternativeSymbols})` : ''}`,
      result.count,
      result.accuracy,
      result.mislabels.map((label: any) => label.lang).join('|'),
      result.falsePositives,
      result.lowestProbability,
      result.highestFalseProbability,
      result.correctAvgConfidence,
      result.incorrectAvgConfidence,
    ]
      .map((item: any) => (item === undefined ? ' ' : item))
      .join(',')
  }

  const resultsMD = [
    `| Language (${languageCount}) | Symbol (alternates) | Count (${sentenceCount})| Accuracy (${minSentenceLength} - ${maxSentenceLength} chars) | addedAccuracy | False Positives |`,
    '| -------- | ----------- | ------------ | -------------- | ---------- | --------- |',
    ...sortedResults.map(getResultsMDDisplayRow),
  ].join('\n')

  fs.writeFileSync(`./results/RESULTS.md`, resultsMD, 'utf-8')

  const resultsCSV = [
    [
      `Language (${languageCount})`,
      `Symbol (alternates)`,
      `Count (${sentenceCount})`,
      `Accuracy (${minSentenceLength} - ${maxSentenceLength} chars)`,
      'Mislabels',
      `False Positives`,
      `Lowest Probability of Correct`,
      `Highest Probability of Incorrect`,
      'Correct Average Probability Difference',
      'Incorrect Average Probability Difference',
    ].join(','),
    ...sortedResults.map(getResultsCSVRow),
  ].join('\n')
  fs.writeFileSync(`./results/RESULTS_with_metadata.csv`, resultsCSV, 'utf-8')
}

const createIsReliableList = (results: any[], minAccuracy = 0.95, minTestCount = 10) => {
  const sortedResults = Object.keys(results)
    .map((lang: string) => ({ fastTextSymbol: lang, ...results[lang] }))
    .sort((a, b) => {
      if (a.accuracy === b.accuracy) {
        return b.count - a.count
      }
      return a.accuracy < b.accuracy ? 1 : -1
    })
    .filter(({ count, accuracy }) => accuracy >= minAccuracy && count >= minTestCount)
    .map((l: any) => l.fastTextSymbol)

  fs.writeFileSync(`./results/reliability_list_${version}.json`, JSON.stringify(sortedResults), 'utf-8')
}

const analyzeDatasets = async (
  includeOnly?: string[],
  perLanguageSentenceLimit = 30000,
  minSentenceLength = 30,
  maxSentenceLength = 250
) => {
  const [data, sentenceCount] = await buildData(
    perLanguageSentenceLimit,
    minSentenceLength,
    maxSentenceLength,
    includeOnly
  )
  fs.writeFileSync(`./results/benchmark_results_${version}_data.json`, JSON.stringify(data), 'utf-8')
  const results: any = {}
  const falsePositives: any = {}
  await asyncPoolForEach(
    data,
    async ({
      language,
      alternativeSymbols,
      texts,
    }: {
      language: string
      alternativeSymbols?: string[]
      texts: string[]
    }) => {
      let count = 0
      let accuratePredictions = 0
      let accurateFrancPredictions = 0
      let incorrectPredictions: { [key: string]: number } = {}
      let lowestProbability = 1
      let highestFalseProbability = 0
      let correctPredictionConfidences: number[] = []
      let incorrectPredictionConfidences: number[] = []

      await asyncPoolForEach(
        texts,
        async (text: string) => {
          // const prediction = await predict(text)
          const predictions: any[] = await lid.predict(text, 2)
          const { lang: prediction, prob: probability } = predictions[0]
          const probabilityDifference = probability - predictions[1].prob
          const minProbabilityDifferenceThreshold = 0.25
          let francPred

          // console.log('probabilityDifference', probabilityDifference)

          if (probabilityDifference < minProbabilityDifferenceThreshold) {
            const iso3Codes = predictions
              .map((pred: any) => {
                const lang = tatoeba2Languages.find((l: any) => l.fastTextSymbol === pred.lang)
                return lang ? lang.iso3 : null
              })
              .filter((code: string) => !!code)

            // console.log(iso3Codes)
            try {
              const francPredictions = franc.all(text, { only: iso3Codes })
              const francPrediction = francPredictions[0][0] // iso3Code
              const lang = tatoeba2Languages.find((l: any) => l.iso3 === francPrediction)
              if (lang && lang.fastTextSymbol) {
                francPred = lang.fastTextSymbol
              }
            } catch (e) {
              console.log('error', e)
            }
          }

          count = count + 1
          if (
            prediction === language ||
            (Array.isArray(alternativeSymbols) && alternativeSymbols.includes(prediction))
          ) {
            accuratePredictions = accuratePredictions + 1
            if (probability < lowestProbability) {
              lowestProbability = probability
            }
            correctPredictionConfidences.push(probabilityDifference)
          } else {
            if (probability > highestFalseProbability) {
              highestFalseProbability = probability
            }
            falsePositives[prediction] = falsePositives[prediction] ? falsePositives[prediction] + 1 : 1
            incorrectPredictions[prediction] = incorrectPredictions[prediction]
              ? incorrectPredictions[prediction] + 1
              : 1
            incorrectPredictionConfidences.push(probabilityDifference)
          }

          // franc prediction
          const accuratePrediction =
            prediction === language || (Array.isArray(alternativeSymbols) && alternativeSymbols.includes(prediction))
          if (
            (!francPred && accuratePrediction) ||
            francPred === language ||
            (Array.isArray(alternativeSymbols) && alternativeSymbols.includes(francPred))
          ) {
            accurateFrancPredictions = accurateFrancPredictions + 1
          }
        },
        10
      )

      results[language] = {
        count,
        accuratePredictions,
        mislabels: Object.keys(incorrectPredictions)
          .map((lang: string) => ({
            lang,
            count: incorrectPredictions[lang],
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5),
        accuracy: accuratePredictions / count,
        addedAccuracy: accurateFrancPredictions / count - accuratePredictions / count,
        falsePositives: falsePositives[language] || 0,
        lowestProbability,
        highestFalseProbability,
        correctAvgConfidence:
          correctPredictionConfidences.reduce((a, b) => a + b, 0) / correctPredictionConfidences.length,
        incorrectAvgConfidence:
          incorrectPredictionConfidences.reduce((a, b) => a + b, 0) / incorrectPredictionConfidences.length,
      }
    }
  )

  // save results file
  fs.writeFileSync(`./results/benchmark_results_${version}.json`, JSON.stringify(results), 'utf-8')

  createResultsMDFile(results, (data as any[]).length, sentenceCount as number, minSentenceLength, maxSentenceLength)
  createIsReliableList(results)

  console.info('Finished writing files.')
}

analyzeDatasets()
