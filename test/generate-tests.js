#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const md = require('markdown-it')('commonmark', { typographer: true })
  .enable(['linkify', 'smartquotes', 'replacements'])
  .use(require('../'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-footnote'))
const cm = require('markdown-it')('commonmark', { typographer: true })
  .enable(['linkify', 'smartquotes', 'replacements'])
  .use(require('../'))
const manifesto = fs.readFileSync(path.resolve(__dirname, '../manifesto.md'), 'utf8').toString()

function htmlize(html) {
  return `<html><head><link rel="stylesheet" type="text/css" href="./styles.css" /></head><body>
${html}
</body></html>`
}

fs.writeFileSync(
  path.resolve(__dirname, 'fixtures/html/manifesto-extended.html'),
  htmlize(md.render(manifesto)))

fs.writeFileSync(
  path.resolve(__dirname, 'fixtures/html/manifesto-commonmark.html'),
  htmlize(cm.render(manifesto)))
