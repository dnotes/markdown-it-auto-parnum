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

### Options

This library has several options, most of which should not be needed under normal circumstances. These are (with their default values):

- sign ('¶'): The sign used in Markdown files for manual numbering of paragraphs, and rendered as html attributes in the resulting html. **Changing this setting will break cross-compatibility for Markdown documents.**
- delimiter ('.'): The character that will separate multi-level numbering schemes when none is explicitly provided in the Markdown.
- addLinks (true): Whether the anchors for paragraphs should be rendered as links.
- headingLevels (1): The maximum number of headings to include in multi-level paragraph numbers, unless explicitly specified in a document.
- headingSign (''): A symbol or text that should be placed in the html id attribute given to numbered headings. For example, if this is set to "sec", the headers will be rendered with `id="sec1"`.
- numberedElements ('paragraph'): A comma-separated list of markdown-it token types which should receive paragraph numbers.
- skippedElements ('footnote_block'): A comma-separted list of markdown-it token types inside which any paragraphs should not be numbered.

### Multi-level numbering

If no numbering scheme is explicitly set within a document, this library will try to determine the best numbering scheme based on its headings. The algorithm for this is to number:
- ...the lowest-level heading, i.e. h1, then h2, etc.
- ...which occurs more than once in the document
- ...up to the headingLevels setting.

So, by default a document with a single `h1` and multiple `h2` and `h3` elements will receive paragraph numbers like `1.1`, where the first number is incremented with each `h2` element.

### Explicit numbering within a document

Within a markdown document, numbering for a given paragraph or heading may be explicitly specified by adding the html attribute "¶". Using the [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs) plugin, this would look like `{¶=123}` at the end of a block of text. For multi-level numbering, any non-numeric characters in a specified paragraph number will set the scheme for subsequent paragraph numbering; for example, if the first paragraph is numbered as `{¶=1:1}` then the next paragraph will automatically be numbered `1:2`, and the next numbered heading will be `2`, and the following paragraph `2:1`, etc.

There are also a few control words for altering the automated paragraph numbering:

- `¶=manual`: For subsequent paragraphs, number only the ones that are explicitly specified in the Markdown.
- `¶=auto` or `¶=start` or `¶=on`: Number subsequent paragraphs automatically.
- `¶=stop` or `¶=off`: Do not number subsequent paragraphs until numbering is turned on with an explicit number or `auto`, `start`, or `on`.
- `¶=skip` or `¶=none`: Skip numbering for the specified paragraph only.