# Manifesto

Esteemed reader, {.greeting ¶=none}

This is a manifesto about the importance of numbering paragraphs.
It is part of a markdown-it plugin for rendering
[automatic paragraph numbering in markdown texts], 
and it also functions as part of the test suite for that plugin.[^1]

[automatic paragraph numbering in markdown texts]: 
https://github.com/dnotes/markdown-it-auto-parnum

[^1]: This text uses [markdown footnotes] and [markdown attributes].
These are extensions to Markdown and the Commonmark spec,
and they are not supported in all contexts (e.g. on Github).
If you see constructions like "\[^1]" or {.class}, this is why.

[markdown footnotes]: https://github.com/markdown-it/markdown-it-footnote
[markdown-it-footnote]: https://github.com/markdown-it/markdown-it-footnote
[markdown attributes]: https://github.com/arve0/markdown-it-attrs
[markdown-it-attrs]: https://github.com/arve0/markdown-it-attrs

## The purpose and nature of paragraphs {¶=1.0}

Written texts are created to convey an author's ideas to a reader.
Generally a written text contains ideas organized around a theme,
and that theme may be broken down into smaller pieces:
volumes, sections, chapters, paragraphs, sentences and words.

Words and sentences are the primary repositories of meaning,
but paragraphs are most basic element for conveying a complete idea[^2].
With proper usage, each paragraph contains an idea that is discrete and atomic:
discrete in that the author believed the idea could be properly understood 
without reference to information not previously provided,
and atomic in that the author did not believe the idea could
reasonably be broken down into smaller ideas.
A paragraph is as large as it needs to be and as small as it can be
in order to convey a discrete, atomic idea.

[^2]: Sentences can, of course, convey a complete idea,
in which case one sentence may comprise an entire paragraph,
but such completeness is not expected of sentences.

## Reference schemes, and why we should number paragraphs

Paragraph numbering is one of several schemes of reference for text,
including page number, line number, section, and complete work.
The aim of this manifesto is to convince everyone that in many cases
paragraph numbering is more beneficial than any other scheme,
and that therefore we should always support this scheme---
by numbering paragraphs in written works.

Reference schemes are important for two reasons,
which can be summarized as follows:

1.  Comprehension: references form a scaffold for comprehension
    that helps a reader to understand and remember a text.
2.  Connection: references provide points of consensus
    for sharing texts with other people.

All of the reference schemes listed above fulfil these two functions,
and they benefit individual and collective understanding to the extent
that they effectively balance competing concerns:

- being specific
- being concise
- being portable
- being meaningful

The following sections detail each of the reference schemes mentioned above,
giving a few examples of each, exploring cases in which each may have utility,
and rating each for specificity, conciseness, portability, and meaningfulness.
[^3]

[^3]: In the grand and time-honored tradition of all manifestos,
the sections below make expansive and prescriptive declarations
based solely on the opinions and inductive reasoning of the authors,
no doubt giving free rein to cultural and personal bias,
without reference to any studies conducted in accordance with
the rigorous standards of proper science.

    Therefore, a reader may simply agree---on your own peril
    ---while a scientifically-minded reader may consider this
    a recommendation for future study and consideration.

    Please note that disagreement is not an option.

### Complete work

- All citations in most news stories, e.g. "A recent study..." {¶=auto}
- All citations in most social media posts
- Most hyperlinks
- Citations for paraphrased ideas in academic writing (APA)
- Citations of auditory works, e.g. podcast episodes
- Citations of stories in oral traditions?

**Specificity: 1** \
It's hard to get less specific than citing a whole work.
Perhaps one could accomplish this by citing an author without
specifying a work, e.g. "Thomas Jefferson once wrote that..."

**Conciseness: 10** \
Every reference must contain the full work, so there is no 
reasonable way to obtain a more concise reference.

**Portability: 7** \
Citing a complete work is quite portable, although some issues
arise when a work has multiple editions. For example, "the Bible"
is sometimes cited without reference to a particular translation.

**Meaningfulness: 3** \
For sharing information, it is quite meaningful to know the work
from which an idea came. However, it is also quite possible to 
convey a lot *more* meaning in a reference when collaborating.
Additionally, a whole work reference does not provide any 
scaffolding to help an individual understand or remember the text.

### Section headings

- Citations of literary works with multiple editions, in academic writing (MLA) {¶=auto}
- Citations of theatric works (scenes)
- Citations of legal code

**Specificity: 4-8** \
Section headers can be quite specific, but it really depends on the size of
the sections.

**Conciseness: 4-9** \
There is a wide range on the conciseness of section header references,
generally inversely related to the meaningfulness and specificity of the 
reference: if the headers are short and specific, e.g. "Chapter 1", then
they are relatively meaningless and probably not very specific, but if
they are meaningful and specific, then the citations will clutter the
citing work to the point of unreadability.

**Portability: 9** \
Section headers generally apply quite well across all versions or editions
of a text, since changes over time and differences between formats are rare.

**Meaningfulness: 6-10** \
Section headers can be an extremely meaningful referencing scheme, in that
each reference contains within itself a complete meaning. This is why some
reading coaches have recommended that when reading a book for information,
one should read the table of contents first; understanding the whole provides
a framework in which an understanding of each of the parts can develop.
However, as mentioned above, the meaningfulness of a section reference is
usually the inverse of its conciseness.

### Page numbers

- Citations of direct quotes in academic writing (APA, MLA) {¶=auto}
- Citations of paraphrased ideas in academic writing (MLA)

**Specificity: 8** \
Page numbers can get you within a few lines of a small selection from a
large text.

**Conciseness: 8** \
Page references are concise.

**Portability: 0** \
Page numbers simply aren't portable. Online sources are rarely paginated
and new editions of print texts change page numbers.

**Meaningfulness: 3** \
Page numbers *might* mean something to people with very visual memory, and
they do give some indication whether a work might be very long, but since
the format of a page is not in any way related to the meaning of its content,
the page number itself is inherently meaningless as a reference.

### Line numbers

- Citations of computer programs {¶=auto}
- Citations of financial instruments, e.g. receipts, budgets

**Specificity: 9** \
The only way to get more specific is to number the characters in the line
---which is also used in referencing computer programs, e.g. when debugging.

**Conciseness: 8** \
Line number references are concise.

**Portability: 2** (8 for computer programs) \
Line numbers are portable for computer programs, because computer programs
are stored in files of arbitrary width and length and are organized into 
small statements that are most conveniently delineated by line breaks.
For most other written works, line numbers would not be portable at all,
because content of the lines would be determined by the width of the media
or rendering device.

**Meaningfulness: 2** (8 for computer programs) \
Line numbers are meaningful for computer programs because they generally
contain discreet statements. For other texts, While line numbers may convey
some understanding of the probable length of a work and the position of an
idea inside of it, that really doesn't add much to existing understanding.

### Paragraph numbers

- Citations of religious works, e.g. John 3:16 {¶=auto}
- Citations of legal code, e.g. 501.c.3
- Citations of theatric works (not numbered, but as in "To be or not to be...")

**Specificity: 8** \
Paragraph references will get you within a few sentences of any passage.

**Conciseness: 8** \
Paragraph references are concise.

**Portability: 9** \
Paragraph numbers can change between editions of written works or versions
of online documents, but this is quite rare. Format and medium does not
affect paragraph numbering.

**Meaningfulness: 4-10** \
The meaningfulness of paragraph numbers begins at a relatively low level,
but it grows in proportion to a reader's familiarity with the content. 
For content that is expected to be mastered and memorized, paragraph 
references can be the glue that powerfully binds together an understanding 
of each part into a comprehension of the whole. Paragraph numbered works
are surely the most widely memorized, cited, and recognized works ever;
considering only the examples above, you will probably know the general
meaning and at least a few words of each one, even if you are neither a
Christian, nor a lawyer or accountant, nor a thespian.

### Why we should number paragraphs

Put simply, among the various reference schemes in common use,
paragraph references have often provided the most beneficial balance
of specificity, conciseness, portability, and meaningfulness.
Whether by cause or by effect, paragraphs have been chosen as the 
frame of reference for all of the most easily recognizable 
content in history. Given all the benefits of paragraph references,
we should support their use, and we can do so simply by numbering
the paragraphs in our documents.

## Dealing with HTML: there are paragraphs, and then there are \<p>aragraphs

HTML has revolutionzied the creation of written works in many ways,
some of which raise difficult questions in relation to paragraph numbering.

### Paragraphs within block quotes and list items

Since block quotes and list items can contain multiple paragraphs,
is there a consistent way to number those paragraph elements?
For example, if this list item contains multiple distinct ideas, 
and if each idea is contained in its own paragraph, then 
paragraph numbering needs to account for this in some way.

There are several possible options, but for most cases we recommend
(and this library explicitly supports) numbering \<blockquote\> and 
\<li\> tags **only** if they contain actual \<p\> tags within.

In the case of a "tight list", where the list items are rendered
without paragraphs within, it may sometimes be appropriate to number
the first list item or the list itself, especially if the list functions 
as a paragraph in its own right.

### Paragraphs that contain lists or blockquotes

Paragraph elements in HTML cannot contain lists or blockquotes.
However, paragraphs in literary contexts can and often do.
How does one go about numbering the element that describes a paragraph 
which, in its original form, contained a block quote or list?

Consider that---as the American Psychological Association indicates---
in cases where a phrase leads directly into a long quotation
> you might choose to begin the block quote with a lowercase letter. 
> In this and the later examples we use “Lorem ipsum” text to ensure 
> that each block quotation contains 40 words or more. Lorem ipsum 
> dolor sit amet, consectetur adipiscing elit.
> ([APA Blog](https://blog.apastyle.org/files/block-quotations.pdf)) {¶=none}
>
> {¶=¶}

In HTML, one would be obliged to end this \<p> before the quote,
because \<blockquote\>s are not permitted within \<p> elements.
This does not make sense, because it's a *paragraph* and it needs
to contain a *complete idea* and then ***end with a period***!
---or perhaps an exclamation mark.

In any case, the quotation above is clearly a part of the paragraph,
and it probably should not receive its own paragraph number.

### Some paragraphs should not be numbered

There are a few cases in which paragraphs should not be numbered.[^4]
Along with the above-mentioned case of a block quote that should be
part of a paragraph, there are also the following examples:

1.  Quotations of poetry within other texts often do not receive
    separate paragraph numbers.

2.  The opening sentence of sections of religious texts, such as
    surahs in the Qur'an and many prayers, have an exhortation line
    that is not given its own verse or paragraph number.

3.  Certain paragraphs of letters do not receive their own number,
    including the greeting or salutation, the complimentary close,
    and the signature line. For example:

    > Dear reader, {.salutation ¶=none}
    >
    > I am very hopeful that you are finding this manifesto at once 
    > interesting, entertaining, and convincing, and that in the future
    > you will always make the utmost endeavor to number your paragraphs.
    >
    > Also, I'm reconsidering the part about never using paragraphs inside
    > list items.
    >
    > Sincerely, {¶=none}
    >
    > [Author McAuthorsson] {.signature ¶=none}
    >
    > {¶=¶}

[^4]: This library allows authors to skip paragraph numbering for a single
    paragraph using the html attributes ¶="none" or ¶="skip".
    For multiple paragraphs, authors may use the same attribute for control,
    viz. ¶="stop" or ¶="off" to stop, and ¶="start", ¶="on", or ¶="auto"
    to continue.

    Attributes are not part of Markdown, but can be added with an extension
    such as [markdown-it-attrs].