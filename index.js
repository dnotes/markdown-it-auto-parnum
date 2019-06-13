'use strict'

class Counter {
  constructor(state, options = {}) {
    this.state = state
    this.options = options
    this._elements = ['p']
    this._value = []
    this._headingLevels = typeof options.headingLevels === 'undefined' ? 1 : options.headingLevels
  }

  /**
   * Inserts a paragraph number token after token[i]
   * @param {number} i the index of the token which should be followed by a paragraph number
   */
  insertAfter(i) {
    let token = new this.state.Token('paragraph_number', 'a', 0)
    token.content = this.value
    token.attrPush([this.options.sign, this.value])
    token.attrPush(['id', this.options.sign + this.value])
    this.state.tokens.splice(i + 1, 0, token)
    this.state.tokens[i].block = false
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
    this._value = num.split(/(\d+)/).filter(v => v.length).reverse()
  }

  get value() {
    return [...this._value].reverse().join('')
  }

  set headingLevels(x) {
    this._headingLevels = x
    x++ // number of elements
    this._elements = this._elements.filter(v => v)
    if (this._elements.length < x + 1) {
      this._elements.fill(false, this._elements.length, x - this._elements.length)
    }
    this.value = '0'.repeat(x).split('').join(this.options.delimiter)
  }

  get headingLevels() {
    return this._headingLevels
  }

  get elements() {
    return this._elements.filter(v => v)
  }
}

function autoParNum(state, options = {}) {

  // OPTIONS

  // numberedElements: A comma-separated string of elements to be numbered.
  let numberedElements = options.numberedElements || 'paragraph_open,blockquote_open'

  // sign: The sign used for paragraph numbering attributes.
  let sign = options.sign = options.sign || '¶'

  // delimiter: The delimiter that will be used for multi-level numbering,
  // unless explicitly specified in the document with ¶= attributes.
  let delimiter = options.delimiter = options.delimiter || '.'

  // Variables for parsing
  let num = new Counter(state, options)
  let setNum
  let headingCount = { p:0, h1:0, h2:0, h3:0, h4:0, h5:0, h6:0 }
  let scheme = { p:'', h1:'', h2:'', h3:'', h4:'', h5:'', h6:'' }
  let tag
  let numbersOn = true
  let schemeLevels

  // Parse headers and paragraphs to determine numbering scheme
  for (let i = 0; i < state.tokens.length; i++) {
    // We should check all tokens of types that can be numbered, as well as all headers
    if ((numberedElements + ',heading_open').indexOf(state.tokens[i].type) > -1) {
      tag = /^h\d$/.test(state.tokens[i].tag) ? state.tokens[i].tag : 'p'
      if ((setNum = state.tokens[i].attrGet(sign)) && /\d/.test(setNum)) {
        setNum = setNum.replace(/[0-9]+/g, '0')
        if (scheme[tag] && scheme[tag] !== setNum) {
          throw new Error(`Inconsistent numbering for <${tag}>: ${scheme[tag]} <> ${setNum}`)
        }
        scheme[tag] = setNum
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
      if (!scheme.p) {
        scheme.p = scheme[tag] + delimiter + '0'
        num.headingLevels = schemeLevels
      }
      num.addHeadingElement(tag, schemeLevels)
    }
  })
  if (!scheme.p) {
    scheme.p = '0'.repeat(num.headingLevels + 1).split('').join(delimiter)
  }
  if (num.elements.length <= num.headingLevels) {
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].some((tag) => {
      if (headingCount[tag] > 1) {
        num.addHeadingElement(tag)
      }
      if (num.elements.length > num.headingLevels) return true
    })
  }
  num.headingLevels = num.elements.filter(v => v).length - 1


  for (let i = 0; i < state.tokens.length; ++i) {
    setNum = state.tokens[i].attrGet(sign)

    // Tags that may be numbered
    /* eslint no-fallthrough: 0 */
    if (numberedElements.indexOf(state.tokens[i].type) > -1) {
      switch (setNum) {
        case null:
          if (numbersOn) num.increment()
          break
        case 'stop':
        case 'off':
          numbersOn = false
        case 'none':
        case 'skip':
          continue
        case 'auto':
        case 'on':
        case 'start':
          numbersOn = true
          num.increment()
          break
        default:
          if (/\d/.test(setNum)) {
            num.value = setNum
            numbersOn = true
          }
          else if (numbersOn) num.increment()
          break
      }
      if (numbersOn) {
        num.insertAfter(i)
      }
    }

    // Tags that may affect numbering
    else if (state.tokens[i].type === 'heading_open') {
      num.increment(state.tokens[i].tag)
    }

  }

}

module.exports = function plugin(md, options) {
  md.renderer.rules.paragraph_number = function (tokens, idx, options, env, slf) {
    return `<a${slf.renderAttrs(tokens[idx])}>${tokens[idx].content}</a>`
  }
  md.core.ruler.push('autoParNum', autoParNum, options)
}
