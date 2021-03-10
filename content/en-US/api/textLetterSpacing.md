---
recipe: api-interface
title: 'CanvasRenderingContext2D.textLetterSpacing'
mdn_url: /en-US/docs/Web/API/CanvasRenderingContext2D/textLetterSpacing
specifications: [[specURL]]#[[HeadingAnchor]]
browser_compatibility: api.CanvasRenderingContext2D.textLetterSpacing
---

// For newer or recently updated specs, the preferred heading anchor is one
// beginning with 'dom'.

// Please do the following:
// 1. Replace all [[tokens]] with the specified information. Be sure to remove
// the brackets.
// 2. Answer all questions in comments.
// 3. Remove all comments.

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing](https://developer.mozilla.org/en-US/docs/Web/CanvasRenderingContext2D/textLetterSpacing).**

// Example property page at: https://developer.mozilla.org/en-US/docs/Web/API/ContentIndexEvent/id

## Description

// Complete the sentence below with a basic description of the propertyt.
// You may add more sentences if needed.

// If this is not a read-only property, delete 'read-only' from the sentence below.

The `textLetterSpacing` property of the `CanvasRenderingContext2D` interface
returns a double which represents horizontal spacing behavior between text
characters. `textLetterSpacing` sets to postive value causes characters to
spread farther apart, while negative value brings characters closer together.

## Syntax

// Base the variable name on the property name. Leave the underscores (markdown
// indicators for Italic text). Syntax descriptions are not code and MDN's standard
// requires that developer-defined identifiers be in Italics.

// Remove the second line if this is a read-only property.

`var textLetterSpacing = CanvasRenderingContext2D.textLetterSpacing`
`CanvasRenderingContext2D.textLetterSpacing = textLetterSpacing`

### Value

// Replace '[[Type]]' with the return type.

A `double` represents horizontal spacing behavior between text characters.

## Examples

// Provide one or more code examples showing the use of the property.
// Code samples from explainers or specs often work well for this.
// When creatting the examples, keep the following in mind:

// _ Each example should only illustrate one aspect of the interface's use.
// _ If you provide only one example, delete the subheadings.
// \* You may reuse examples from the parent interface page, if they're
// appropriate.

// Note: code examples are not applications. If you have never created a code
// example before you may skip this section, but you are incouraged to ask
// for help instead. If you skip this section, please delete it.

// Replace this title with a descriptive one.

### Example

This example demonstrates the various TextLetterSpacing property values.

```js
const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
const letterSpacings = [-3, 0, 3];
ctx.font = '36px serif';

letterSpacings.forEach(function (letterSpacing, index) {
  ctx.textLetterSpacing = letterSpacing;
  const y = 50 + index * 50;
  ctx.fillText('Hello World (textLetterSpacing: ' + letterSpacing + ')', 20, y);
});
```

