# iscpf

> Validate CPF numbers (for NodeJS and browsers)

[![Build Status][travis-image]][travis-url]
[![License][license-image]][license-url]

## Installation

**NPM module:**

```console
npm install --save iscpf
```

**CDN:**

```console
<script src="//cdn.rawgit.com/fdaciuk/iscpf/<VERSION>/dist/is-cpf.min.js"></script>
```

_Remember to change "<VERSION>" entry before add on your HTML file_

## Usage

Import the lib:

**ES6 Modules:**

```js
import isCpf from 'iscpf'
```

**CommonJS:**

```js
const isCpf = require('iscpf')
```

**AMD:**

```js
define(['isCpf'], function (isCpf) {
  // ...
})
```

**Global (window):**

```js
;(function (isCpf) {
  // ...
})(window.isCpf)
```

Don't worry about pontuation:

```js
console.log(isCpf('75300153206')) // true
console.log(isCpf('462.498.462-55')) // true
```

## License

[MIT][license-url] &copy; Fernando Daciuk

[travis-image]: https://img.shields.io/travis/fdaciuk/iscpf.svg?style=flat-square
[travis-url]: https://travis-ci.org/fdaciuk/iscpf
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/fdaciuk/licenses/blob/master/MIT-LICENSE.md
