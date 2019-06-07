![build](https://travis-ci.org/dnotes/markdown-it-auto-parnum.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/dnotes/markdown-it-auto-parnum/badge.svg?branch=master)](https://coveralls.io/github/dnotes/markdown-it-auto-parnum?branch=master)

# Paragraph numbering for Markdown

This markdown-it plugin numbers paragraphs automatically. 

## Installation

`yarn add markdown-it-auto-parnum`

## Usage

```
const md = require('markdown-it')()
  .use(require('markdown-it-auto-parnum'))
md.render('This is a paragraph.')
```
