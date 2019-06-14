'use strict'

/*eslint-env mocha*/
// RUN REGULAR TESTS
const path = require('path')
const generate = require('markdown-it-testgen')
const md = require('markdown-it')('commonmark')
  .use(require('../'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-footnote'))
describe('Run test fixtures', function () {
  generate(path.join(__dirname, 'fixtures/multilevel.txt'), { header: true }, md)
  generate(path.join(__dirname, 'fixtures/control.txt'), { header: true }, md)
  generate(path.join(__dirname, 'fixtures/containers.txt'), { header: true }, md)
  generate(path.join(__dirname, 'fixtures/footnotes.txt'), { header: true }, md)
})

// TESTING A LARGE FILE
const fs = require('fs')
const assert = require('assert')
const cm = require('markdown-it')('commonmark', { typographer: true })
  .enable(['linkify', 'smartquotes', 'replacements'])
  .use(require('../'))
const manifesto = fs.readFileSync(path.resolve(__dirname, '../manifesto.md'), 'utf8').toString()
const rendered = {
  commonmark: '',
  extended: '',
}
;['commonmark', 'extended'].forEach((x) => {
  rendered[x] = fs.readFileSync(path.resolve(__dirname, `fixtures/html/manifesto-${x}.html`), 'utf8')
    .toString()
    .replace(/(.+<body>\n|\n<\/body>.+)/gm, '')
})
// In order to work with the test generator, each it() must begin with a word and colon, e.g. "Word:"
// which must also be used as a suffix for the html file, e.g. fixtures/manifesto-word.html
describe('Compare rendering of Manifesto to expectations', function () {
  it('Commonmark: straight Commonmark', function () {
    assert.equal(cm.render(manifesto), rendered.commonmark)
  })
  it('Extended: Commonmark with footnotes and attrs', function () {
    cm.use(require('markdown-it-footnote')).use(require('markdown-it-attrs'))
    assert.equal(cm.render(manifesto), rendered.extended)
  })
})
