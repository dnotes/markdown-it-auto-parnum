'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('assert')
const cm = require('markdown-it')('commonmark').use(require('../'))
const manifesto = fs.readFileSync(path.resolve(__dirname, '../manifesto.md'), 'utf8').toString()
const rendered = {
  commonmark: '',
  extended: '',
}
;['commonmark', 'extended'].forEach((x) => {
  rendered[x] = fs.readFileSync(path.resolve(__dirname, `fixtures/manifesto-${x}.html`), 'utf8').toString()
})

/*eslint-env mocha*/
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
