---
recipe: api-interface
title: 'URLPattern'
mdn_url: /en-US/docs/Web/API/URLPattern
specifications: https://github.com/WICG/urlpattern/blob/main/explainer.md
browser_compatibility: api.URLPattern
---

// For newer or recently updated specs, the preferred heading anchor is one
// beginning with 'dom'.

// Please do the following:
// 1. Replace all [[tokens]] with the specified information. Be sure to remove
// the brackets.
// 2. Answer all questions in comments.
// 3. Remove all comments.

**When this feature ships, the content below will live on MDN under
[developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API).**

// Example interface page at: https://developer.mozilla.org/en-US/docs/Web/API/ContentIndex

## Description

// Complete the sentence below with a basic description of the API.
// You may add more sentences if needed.

The `URLPattern` interface provides a web platform primitive for matching
URLs.  The pattern syntax is adopted from the popular [path-to-regexp][]
javascript library and is more ergonomic than using regular expressions.

## Constructor

**`URLPattern.URLPattern()`**

Creates a new `URLPattern` object. The constructor takes an initialization 
object with the following properties:

<dl>
  <dt>protocol</dt>
  <dd>The protocol in a URL to match.</dd>
  <dt>username</dt>
  <dd></dt>
</dl>

## Properties

**`URLPattern.protocol`**

Returns the URL protocol pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

**`URLPattern.username`**

Returns the URL username pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

**`URLPattern.password`**

Returns the URL username pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

**`URLPattern.hostname`**

Returns the URL username pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

**`URLPattern.port`**

Returns the URL username pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

**`URLPattern.pathname`**

Returns the URL username pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

**`URLPattern.search`**

Returns the URL username pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

**`URLPattern.hash`**

Returns the URL username pattern set during construction.  This value may
be differ from the input to the constructor due to normalization.

## Events

None

## Methods

**`URLPattern.test()`**

Matches the input against the pattern returning true on success and false
otherwise.

**`URLPattern.exec()`**

Matches the input against the pattern returning a URLPatternResult object on
success and null otherwise.

## Examples

### Example: Construct a URLPattern to filter on a specific URL component.

The following example shows how a URLPattern can be used to filter on a
specific URL component.  When the URLPattern constructor is called with a
structured object of component patterns any missing components default to
the `*` wildcard value.

```js
// Construct a URLPattern that matches a specific domain and its subdomains.
// All other URL components default to the wildcard `*` pattern.
const pattern = new URLPattern({
  hostname: {*.}?example.com
});

// `{*.}?example.com`
pattern.hostname;

// `*`
pattern.protocol;
pattern.username;
pattern.password;
pattern.pathname;
pattern.search;
pattern.hash;

// true
pattern.test("https://example.com/foo/bar");

// true
pattern.test({ hostname: "cdn.example.com" });

// true
pattern.test("custom-protocol://example.com/other/path?q=1");

// false because the hostname component does not match
pattern.test("https://cdn-example.com/foo/bar");
```

### Example: Construct a URLPattern from a full URL string.

The following example shows how a URLPattern can be constructed from a full
URL string with patterns embedded.  If there is no ambiguity between whether
a character is a URL separate or a pattern character then it just works.

```js
// Construct a URLPattern that matches URLs to CDN servers loading jpg images.
// URL components not explicitly specified, like search and hash here, result
// in the empty string similar to the URL() constructor.
const pattern = new URLPattern("https://cdn-*.example.com/*.jpg");

// `https`
pattern.protocol;

// `cdn-*.example.com`
pattern.hostname;

// `/*.jpg`
pattern.pathname;

// empty string
pattern.username;
pattern.password;
pattern.search;
pattern.hash;

// true
pattern.test("https://cdn-1234.example.com/product/assets/hero.jpg");

// false because the search component does not match
pattern.test("https://cdn-1234.example.com/product/assets/hero.jpg?q=1");
```

### Example: Constructing a URLPattern with an ambiguous URL string.

The following example shows how a URLPattern constructed from an ambiguous
string will favor treating characters as part of the pattern syntax.  In
this case the `:` character could be the protocol component suffix or it
could be the prefix for a pattern named group.  The constructor chooses
to treat this as part of the pattern and therefore determines this is
a relative pathname pattern.  Since there is no base URL the relative
pathname cannot be resolved and it throws.

```js
// Throws because this is interpreted as a single relative pathname pattern
// with a ":foo" named group and there is no base URL.
const pattern = new URLPattern("data:foo*");
```

### Example: Escaping characters to disambiguate URLPattern constructor strings.

The following example shows how an ambiguous constructor string character
can be escaped to be treated as a URL separator instead of a pattern
character.  Here `:` is escaped as `\\:`.

```js
// Constructs a URLPattern treating the `:` as the protocol suffix.
const pattern = new URLPattern("data\\:foo*");

// `data`
pattern.protocol;

// `foo*`
pattern.pathname;

// empty string
pattern.username;
pattern.password;
pattern.hostname;
pattern.port;
pattern.search;
pattern.hash;

// true
pattern.test("data:foobar");
```

### Example: Using base URLs for `test()` and `exec()`.

The following example show how input values to `test()` and `exec()` can use
base URLs.

```js
const pattern = new URLPattern({ hostname: "example.com", pathname: "/foo/*" });

// True as the hostname based in the dictionary `baseURL` property matches.
pattern.test({ pathname: "/foo/bar", baseURL: "https://example.com/baz" });

// True as the hostname in the second argument base URL matches.
pattern.test("/foo/bar", "https://example.com/baz");

// Throws because the second argument cannot be passed with a dictionary input.
try {
  pattern.test({ pathname: "/foo/bar" }, "https://example.com/baz");
} catch (e) {}

// The `exec()` method takes the same arguments as `test()`.
const result = pattern.exec("/foo/bar", "https://example.com/baz");

// `/foo/bar`
result.pathname.input;

// `bar`
result.pathname.groups[0];

// `example.com`
result.hostname.input;
```

### Example: Using base URLs in the pattern constructor.

The follow example shows how base URLs can also be used to construct the
URLPattern.  Its important to note that the base URL in these cases is
treated strictly as a URL and cannot contain any pattern syntax itself.

Also, since the base URL provides a value for every component the resulting
URLPattern will also have a value for every component; even if its the
empty string.  This means you do not get the "default to wildcard" behavior.

```js
const pattern1 = new URLPattern({ pathname: "/foo/*",
                                  baseURL: "https://example.com" });

// `https`
pattern1.protocol;

// `example.com`
pattern1.hostname;

// `/foo/*`
pattern1.pathname;

// empty string
pattern1.username;
pattern1.password;
pattern1.port;
pattern1.search;
pattern1.hash;

// Equivalent to pattern1
const pattern2 = new URLPattern("/foo/*", "https://example.com" });

// Throws because a relative constructor string must have a base URL to resolve
// against.
try {
  const pattern3 = new URLPattern("/foo/*");
} catch (e) {}
```

### Example: Accessing matched group values.

The following example shows how input values that match pattern groups can later
be accessed from the `exec()` result object.  Unnamed groups are assigned index
numbers sequentially.

```js
const pattern = new URLPattern({ hostname: "*.example.com" });
const result = pattern.exec({ hostname: "cdn.example.com" });

// `cdn`
result.hostname.groups[0];

// `cdn.example.com`
result.hostname.input;

// [{ hostname: "cdn.example.com" }]
result.inputs;
```

### Example: Accessing matched group values using custom names.

The following example shows how groups can be given custom names which can
be used to accessed the matched value in the result object.

```js
// Construct a URLPattern using matching groups with custom names.  These
// names can then be later used to access the matched values in the result
// object.
const pattern = new URLPattern({ pathname: "/:product/:user/:action" });
const result = pattern.exec({ pathname: "/store/wanderview/view" });

// `store`
result.pathname.groups.product;

// `wanderview`
result.pathname.groups.user;

// `view`
result.pathname.groups.action;

// `/store/wanderview/view`
result.pathname.input;

// [{ pathname: "/store/wanderview/view" }]
result.inputs;
```

### Example: Custom regular expression groups.

The following example shows how a matching group can use a custom regular
expression.

```js
const pattern = new URLPattern({ pathname: "/(foo|bar)" });

// true
pattern.test({ pathname: "/foo" });

// true
pattern.test({ pathname: "/bar" });

// false
pattern.test({ pathname: "/baz" });

const result = pattern.exec({ pathname: "/foo" });

// `foo`
result.pathname.groups[0];
```

### Example: Named group with a custom regular expression.

The following example shows how a custom regular expression can be used with a
named group.

```js
const pattern = new URLPattern({ pathname: "/:type(foo|bar)" });
const result = pattern.exec({ pathname: "/foo" });

// `foo`
result.pathname.groups.type;
```

### Example: Making matching groups optional.

The following example shows how a matching group can be made optional by placing
a `?` modifier after it.  For the pathname component this also causes any
preceding `/` character to also be treated as an optional prefix to the group.

```js
const pattern = new URLPattern({ pathname: "/product/(index.html)?" });

// true
pattern.test({ pathname: "/product/index.html" });

// true
pattern.test({ pathname: "/product" });

const pattern2 = new URLPattern({ pathname: "/product/:action?" });

// true
pattern2.test({ pathname: "/product/view" });

// true
pattern2.test({ pathname: "/product" });

// Wildcards can be made optional as well.  This may not seem to make sense
// since they already match the empty string, but it also makes the prefix
// `/` optional in a pathname pattern.
const pattern3 = new URLPattern({ pathname: "/product/*?" });

// true
pattern3.test({ pathname: "/product/wanderview/view" });

// true
pattern3.test({ pathname: "/product" });

// true
pattern3.test({ pathname: "/product/" });
```

### Example: Making matching groups repeated.

The following example shows how a matching group can be made repeated by placing
a `+` modifier after it.  Again, in the pathname component this also treats the
`/` prefix as special.  It is repeated with the group.

```js
const pattern = new URLPattern({ pathname: "/product/:action+" });
const result = pattern.exec({ pathname: "/product/do/some/thing/cool" });

// `do/some/thing/cool`
result.pathname.groups.action;

// false
pattern.test({ pathname: "/product" });
```

### Example: Making matching groups optional and repeated.

The following example shows how a matching group can be made both optional and
repeated.  This is done by placing a `*` modifier after the group.  Again, the
pathname component treats the `/` prefix as special.  It both becomes optional
and is also repeated with the group.

```js
const pattern = new URLPattern({ pathname: "/product/:action*" });
const result = pattern.exec({ pathname: "/product/do/some/thing/cool" });

// `do/some/thing/cool`
result.pathname.groups.action;

// true
pattern.test({ pathname: "/product" });
```

### Example: Using a custom prefix or suffix for an optional or repeated modifier.

The following example shows how curly braces can be used to denote a custom
prefix and/or suffix to be operated on by a subsequent `?`, `*`, or `+`
modifier.

```js
const pattern = new URLPattern({ hostname: "{:subdomain.}*example.com" });

// true
pattern.test({ hostname: "example.com" });

// true
pattern.test({ hostname: "foo.bar.example.com" });

// false
pattern.test({ hostname: ".example.com" });

const result = pattern.exec({ hostname: "foo.bar.example.com" });

// `foo.bar`
result.hostname.groups.subdomain;
```

### Example: Making text optional or repeated without a matching group.

The following example shows how curly braces can be used to denote text
without a matching group can be made optional or repeated without a
matching group.

```js
const pattern = new URLPattern({ pathname: "/product{/}?" });

// true
pattern.test({ pathname: "/product" });

// true
pattern.test({ pathname: "/product/" });

const result = pattern.exec({ pathname: "/product/" });

// empty object
result.pathname.groups
```

### Example: Using multiple components and features at once.

The following example shows how many features can be combined across multiple
URL components.

```js
const pattern = new URLPattern({
  protocol: "http{s}?",
  username: ":user?",
  password: ":pass?",
  hostname: "{:subdomain.}*example.com",
  pathname: "/product/:action*",
});

const result = pattern.exec("http://foo:bar@sub.example.com/product/view?q=12345");

// `foo`
result.username.groups.user;

// `bar`
result.password.groups.pass;

// `sub`
result.hostname.groups.subdomain;

// `view`
result.pathname.groups.action;
```

[path-to-regexp]: https://github.com/pillarjs/path-to-regexp
