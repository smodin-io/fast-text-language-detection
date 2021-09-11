const fs = require('fs')
const PromisePool = require('@supercharge/promise-pool')

const asyncPoolForEach = (array, callback, concurrency = 3) => {
  return PromisePool.for(array).withConcurrency(concurrency).process(callback)
}

const getTSVsInDir = (source, extension = 'tsv') => {
  const files = fs.readdirSync(source)
  return files.filter((file) => file.match(new RegExp(`.*\.(${extension})`, 'ig')))
}

module.exports = {
  asyncPoolForEach,
  getTSVsInDir,
}
