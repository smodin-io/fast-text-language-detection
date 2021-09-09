// Some characters can misconstrude the results
// Removing \n and : because of this issue: https://github.com/indix/whatthelang/issues/12
module.exports = function (text: string) {
  return text.replace(/[\n:]/g, '')
}
