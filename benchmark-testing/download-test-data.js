const https = require('https')
const fs = require('fs')
const bz2 = require('unbzip2-stream')
const { asyncPoolForEach } = require('./helpers')
const { tatoeba2Languages } = require('./constants')

const languages = tatoeba2Languages.filter((l) => !!l.fastTextSymbol)

const extract_bz2_file = (file) => {
  return fs
    .createReadStream(file)
    .pipe(bz2())
    .pipe(fs.createWriteStream(`${file.split('.bz2')[0]}`))
}

const getFileNameAndPath = (iso3Code) => `data/${iso3Code}_sentences.tsv.bz2`

const downloadAndSaveFile = (iso3Code) => {
  const url = `https://downloads.tatoeba.org/exports/per_language/${iso3Code}/${iso3Code}_sentences.tsv.bz2`

  const fileNameAndPath = getFileNameAndPath(iso3Code)
  const file = fs.createWriteStream(fileNameAndPath)
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 404) {
        console.error('Missing language:', iso3Code)
        reject()
      } else {
        const stream = response.pipe(file)

        stream.on('finish', () => {
          resolve()
        })
      }
    })
  })
}

const downloadExtractAndDelete = async (iso3Code) => {
  try {
    await downloadAndSaveFile(iso3Code)
    await extract_bz2_file(getFileNameAndPath(iso3Code))
    await fs.unlinkSync(getFileNameAndPath(iso3Code))
  } catch (e) {
    // delete, it's likely it was a 404 and missing
    await fs.unlinkSync(getFileNameAndPath(iso3Code))
    return
  }
}

// will download and instlal only ones that fastText has and tatoeba2 dataset has
const downloadAndSaveAllLanguages = async () => {
  console.info(`Downloading ${languages.length} languages.`)

  await asyncPoolForEach(
    languages,
    async (language) => {
      await downloadExtractAndDelete(language.iso3)
    },
    10
  )

  console.info(`Finished Downloading Languages.`)
}

// downloadExtractAndDelete('ava') // bak

downloadAndSaveAllLanguages()
