'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function (runner) {
  runner.on('fail', function (test, err) {
    let suffix = ((test.title.match(/^(.+?):/) || ['empty', ''])[1] || '').toLowerCase()
    fs.writeFileSync(path.resolve(__dirname, `fixtures/manifesto-${suffix}.html`), err.actual)
  })
}
