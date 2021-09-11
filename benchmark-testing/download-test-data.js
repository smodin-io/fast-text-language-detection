const https = require('https')
const fs = require('fs')
const bz2 = require('unbzip2-stream')
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
  return https.get(url, (response) => {
    response.pipe(file)
  })
}

// will download and instlal only ones that fastText has and tatoeba2 dataset has
const downloadAndSaveAllLanguages = () => {
  console.info(`Downloading ${languages.length} languages.`)

  languages.slice(0, 5).forEach((language) => {
    const iso3Code = language.iso3
    downloadAndSaveFile(iso3Code)
    extract_bz2_file(getFileNameAndPath(iso3Code))
    fs.unlinkSync(getFileNameAndPath(iso3Code))
  })

  console.info(`Finished Downloading Languages.`)
}

downloadAndSaveAllLanguages()
