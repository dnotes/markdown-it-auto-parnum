# Changelog

All notable changes will be documented in this file. This library follows semantic versioning.

## 2.0

* `numberedElements` option now accepts tags (`p`) as well as markdown-it token types (`paragraph`)
* `numberedElements` option now defaults to `p`
* Semantic versioning will be used from this release

Since the different default for `numberedElements` amounts to a change in the API, version 2.0.0 is being released. It is possible that this change would result in different output if you use a plugin that changes either the `token.type` or `token.tag` but not both. However, most implementations will be unaffected.

## 1.x

* Initial release with usage and options as documented in README.md.
