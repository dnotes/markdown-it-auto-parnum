#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const md = {
  extended: require('markdown-it')('commonmark', { typographer: true })
    .enable(['linkify', 'smartquotes', 'replacements'])
    .use(require('../'))
    .use(require('markdown-it-attrs'))
    .use(require('markdown-it-footnote')),
  commonmark: require('markdown-it')('commonmark', { typographer: true })
    .enable(['linkify', 'smartquotes', 'replacements'])
    .use(require('../')),
}
const manifesto = fs.readFileSync(path.resolve(__dirname, '../manifesto.md'), 'utf8').toString()

function htmlize(html) {
  return `<html><head><link rel="stylesheet" type="text/css" href="./styles.css" /></head><body>
${html}
</body></html>`
}

module.exports = function () {
  ['commonmark', 'extended'].forEach(suffix => {
    let filename = path.resolve(__dirname, `fixtures/html/manifesto-${suffix}.html`)
    if (fs.existsSync(filename)) fs.writeFileSync(filename, htmlize(md[suffix].render(manifesto)))
  })
}
