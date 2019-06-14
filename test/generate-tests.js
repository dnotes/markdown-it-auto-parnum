'use strict'

const fs = require('fs')
const path = require('path')

function htmlize(html) {
  return `<html><head><link rel="stylesheet" type="text/css" href="./styles.css" /></head><body>
${html}
</body></html>`
}

module.exports = function (runner) {
  runner.on('fail', function (test, err) {
    let suffix = ((test.title.match(/^(.+?):/) || ['empty', ''])[1] || '').toLowerCase()
    let filename = path.resolve(__dirname, `fixtures/html/manifesto-${suffix}.html`)
    // only overwrite existing files - don't want new test fixtures for every failing test.
    if (fs.existsSync(filename)) fs.writeFileSync(filename, htmlize(err.actual))
  })
}
