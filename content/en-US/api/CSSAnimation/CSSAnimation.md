---
recipe: api-feature
title: 'CSSAnimation'
mdn_url: /en-US/docs/Web/API/CSSAnimation
specifications: https://drafts.csswg.org/css-animations-2/#the-CSSAnimation-interface
browser_compatibility: api.CSSAnimation

---

## Description

The `CSSAnimation` interface of the [CSS Animations Level
2](https://drafts.csswg.org/css-animations-2/) represents a CSS animation as an
[`Animation`](/en-US/docs/Web/API/Animation/Animation) object in the
[Web Animations API](/en-US/docs/Web/API/Web_Animations_API) model.

As such it extends the [`Animation`](/en-US/docs/Web/API/Animation/Animation)
interface and provide playback controls and the ability to change various
aspects of the CSS animation.


## Constructor

None.

It is not possible to construct a `CSSAnimation` in JavaScript. Instead instance
of this class may be obtained via
[`Element.getAnimations()`](/en-US/docs/Web/API/Element/getAnimations) or
[`Document.getAnimations()`](/en-US/docs/Web/API/Document/getAnimations).

## Properties

**`CSSAnimation.animationName`**

Returns the value of the `'animation-name'` property that created the CSS
animation and caused this object to be generated.

## Methods

__No specific methods; inherits methods from its ancestor, {{domxref('Animation')}}.__
## Examples

The following example first creates a CSS animation by updating the specified
style of an element. Then a handle to the created `CSSAnimation` is obtained
which can be used to introspect and control the actual CSS animation from
script.

```js
elem.style.animation = 'fadeOut 1s';
const animation = elem.getAnimations()[0];
console.log(animation.animationName); // prints 'fadeOut'
animation.pause();
```

## See also

-   [`Animation`](/en-US/docs/Web/API/Animation/Animation) class
