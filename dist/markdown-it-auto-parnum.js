/*! markdown-it-auto-parnum 1.1.0  @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownItAutoParnum = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

class Counter {
  constructor(state, options) {
    this.state = state
    this.options = options
    this._elements = ['p']
    this._value = []
    this._headingLevels = options.headingLevels
  }

  /**
   * Inserts a paragraph number token inside the tag for token[i],
   * or just before the tag if the token is not nesting.
   * @param {number} i the index of the token which should be numbered
   */
  insertAt(i, heading = false) {
    let sign = heading ? this.options.headingSign : this.options.sign
    let token = new this.state.Token('paragraph_number', 'a', 0)
    token.content = this.value
    token.attrPush([this.options.sign, this.value])
    token.attrPush(['id', sign + this.value])
    if (this.options.addLinks) token.attrPush(['href', `#${sign}${this.value}`])
    if (this.state.tokens[i].nesting === 1) {
      this.state.tokens.splice(i + 1, 0, token)
      this.state.tokens[i].block = false
    }
    else {
      // For non-nesting tags (e.g. fence) the paragraph number must go before the tag
      this.state.tokens.splice(i, 0, token)
    }
  }

  /**
   * Increment the paragraph number at the headingLevel provided.
   * For multi-level numbering, headingLevel go backwards, e.g. 2.1.0
   * @param {number} headingLevel the level to increment; 0 = paragraph, 1+ = headings
   */
  increment(tag = 'p') {
    let level = this._elements.indexOf(tag)
    if (level > -1) {
      this._value[level * 2]++
      while (level > 0) {
        level--
        this._value[level * 2] = 0
      }
    }
  }

  /**
   * Add a heading element to the numbering counter.
   * If level is not specified, the header will be added at the topmost (highest) possible level.
   * For example, if a numbering scheme is 0.0.0.0, addHeadingElement('h1') will try to set 'h1'
   * elements as the first 0 (level 3), then the second 0 (level 2), then the third 0 (level 1).
   * Level 0 is reserved for the actual paragraphs.
   * @param {string} tag The tag to add, e.g. h1
   * @param {number} level The level at which the tag should affect paragraph numbering.
   */
  addHeadingElement(tag, level = false) {
    if (typeof level === 'number') {
      this._elements[level] = tag
    }
    else {
      for (let x = this._headingLevels; x > 0; x--) {
        if (!this._elements[x]) {
          this._elements[x] = tag
          break
        }
      }
    }
  }

  set value(num) {
    let newValue = [...this._value].reverse().join('').replace(/\d+/g, 0).split(/(\d+)/).filter(v => v.length)
    num.split(/(\d+)/).filter(v => v.length).forEach((v, i) => {
      newValue[i] = v
    })
    this._value = newValue.reverse()
  }

  get value() {
    return [...this._value].reverse().join('').replace(/(?:^[0\D]+|(?:[\D]+0)+$)/, '')
  }

  set headingLevels(x) {
    this._headingLevels = x // Number of headings
    x++ // Number of elements (including the paragraph numbers)
    this._elements = this._elements.filter(v => v)
    if (this._elements.length < x) {
      this._elements.fill(false, this._elements.length, x - this._elements.length)
    }
    this._value = '0'.repeat(x).split('').join(this.options.delimiter).split(/(0)/).filter(v => v.length)
  }

  get headingLevels() {
    return this._headingLevels
  }

  get elements() {
    return this._elements.filter(v => v)
  }
}

module.exports = function plugin(md, options = {}) {

  function autoParNum(state) {

    // OPTIONS

    // numberedElements: A comma-separated string of markdown-it token types
    // which should receive paragraph numbers.
    let numberedElements = (options.numberedElements || 'paragraph')
      .replace(/(.+?)(,|$)+/g, '$1,$1_open$2').split(',').filter(v => v)

    // skippedElements: A comma-separated list of markdown-it token types
    // inside which NO ELEMENTS should be numbered
    let skippedElements = (options.skippedElements || 'footnote_block')
      .replace(/(.+?)(,|$)+/g, '$1_open,$1_close$2').split(',').filter(v => v)

    // sign: The sign used for paragraph numbering attributes.
    let sign = options.sign = options.sign || '¶'

    // headingSign: The sign used for the ids generated for heading numbers
    options.headingSign = options.headingSign || ''

    // numberHeadings: Whether to number the headers
    let numberHeadings = options.numberHeadings === false ? false : true

    // headingLevels: The maximum number of headings to include in multi-level
    // paragraph numbers, unless explicitly specified in a document.
    options.headingLevels = typeof options.headingLevels === 'undefined' ? 1 : options.headingLevels

    // delimiter: The delimiter that will be used for multi-level numbering,
    // unless explicitly specified in the document with ¶= attributes.
    let delimiter = options.delimiter = options.delimiter || '.'

    // addLinks: Whether to add href to paragraph number anchors
    options.addLinks = typeof options.addLinks !== 'undefined' ? Boolean(options.addLinks) : true

    // Variables for parsing
    let num = new Counter(state, options)
    let setNum
    let headingCount = { p:0, h1:0, h2:0, h3:0, h4:0, h5:0, h6:0 }
    let scheme = { p:'', h1:'', h2:'', h3:'', h4:'', h5:'', h6:'' }
    let schemeLevels
    let tag
    let token
    let numbersOn = true
    let nesting = 0
    let manual = false

    // Parse headers and paragraphs to determine numbering scheme
    for (let i = 0; i < state.tokens.length; i++) {
      // We should check all tokens of types that can be numbered, as well as all headers
      if ((numberedElements + ',heading_open').indexOf(state.tokens[i].type) > -1) {
        tag = /^h\d$/.test(state.tokens[i].tag) ? state.tokens[i].tag : 'p'
        if ((setNum = state.tokens[i].attrGet(sign)) && /\d/.test(setNum)) {
          setNum = setNum.replace(/[0-9]+/g, '0')
          if (!scheme[tag]) {
            scheme[tag] = setNum
            if (scheme.p.length < scheme[tag].length) scheme.p = scheme[tag] + delimiter + '0'
          }
        }
        headingCount[tag]++
      }
    }
    // If numbering scheme is set by attrs, set headingElements here:
    // paragraphs only: [p]
    // h1.h2.p [p, h2, h1]
    // h2.h4.p [p, h4, h2]
    /* eslint no-shadow: 0 */
    /* eslint consistent-return: 0 */
    if (scheme.p) {
      num.headingLevels = scheme.p.split(/[^0-9]+/).length - 1
    }
    ['h6', 'h5', 'h4', 'h3', 'h2', 'h1'].forEach((tag) => {
      if (scheme[tag]) {
        schemeLevels = scheme[tag].split(/[^0-9]+/).length
        num.addHeadingElement(tag, schemeLevels)
      }
    })
    if (!scheme.p) {
      scheme.p = '0'.repeat(num.headingLevels + 1).split('').join(delimiter)
    }
    if (num.elements.length <= num.headingLevels) {
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].some((tag) => {
        if (headingCount[tag] > 1 && (
          num.elements.length === 1 || (
            num.elements.indexOf(tag) === -1 &&
            num.elements[num.elements.length - 1] < tag
          )
        )) {
          num.addHeadingElement(tag)
        }
        if (num.elements.length > num.headingLevels) return true
      })
    }
    num.headingLevels = num.elements.filter(v => v).length - 1

    for (let i = 0; i < state.tokens.length; ++i) {
      if (state.tokens[i].type === 'paragraph_number' ||
          (i > 0 && state.tokens[i - 1].type === 'paragraph_number')) continue
      token = state.tokens[i]
      setNum = state.tokens[i].attrGet(sign)

      switch (setNum) {
        case null:
          break
        case 'manual':
          manual = true
        case 'stop':
        case 'off':
          numbersOn = false
        case 'none':
        case 'skip':
          continue
        case 'auto':
          manual = false
        case 'on':
        case 'start':
          numbersOn = true
          break
        default:
          if (/\d/.test(setNum)) {
            num.value = setNum
            numbersOn = true
            // If the number has been specified, it must be added immediately to avoid incrementing
            num.insertAt(i, /^h\d$/.test(token.tag))
            continue
          }
      }

      // Tags that may be numbered
      /* eslint no-fallthrough: 0 */
      if (nesting === 0 && numberedElements.indexOf(token.type) > -1) {
        // Don't number if the numbering is off
        if (!numbersOn) continue
        // Don't number if the numbering is on manual
        if (manual) continue
        // Don't number if the element is completely empty
        if (state.tokens[i + 2].tag === state.tokens[i].tag &&
            state.tokens[i + 1].type === 'inline' &&
            state.tokens[i + 1].children.length === 1 &&
            state.tokens[i + 1].children[0].type === 'text' &&
            state.tokens[i + 1].children[0].content.trim() === ''
        ) continue
        // Don't number if paragraphs are hidden, as in tight lists
        if (token.hidden &&
            // ...but number if there is a control text on the paragraph
            !['auto', 'on', 'start'].indexOf(setNum) > -1 &&
            // ...or on the previous tag which is a list item
            (i === 0 ||
              !(state.tokens[i - 1].type === 'list_item_open' &&
                ['auto', 'on', 'start'].indexOf(state.tokens[i - 1].attrGet(sign)) > -1)
            )
        ) continue

        num.increment()
        num.insertAt(i)
      }

      // Tags that may affect numbering
      else if (nesting === 0 && numbersOn && token.type === 'heading_open') {
        num.increment(state.tokens[i].tag)
        if (numberHeadings && num.elements.indexOf(token.tag) > 0) num.insertAt(i, true)
      }

      if (skippedElements.indexOf(token.type) > -1) {
        nesting += token.nesting
      }

    }

  }

  md.renderer.rules.paragraph_number = function (tokens, idx, options, env, slf) {
    return `<a${slf.renderAttrs(tokens[idx])}>${tokens[idx].content}</a>`
  }
  if (md.core.ruler.__find__('autoParNum') > -1) {
    md.core.ruler.at('autoParNum', autoParNum)
  }
  else {
    md.core.ruler.push('autoParNum', autoParNum)
  }
}

},{}]},{},[1])(1)
});
