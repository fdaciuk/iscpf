# iscpf

> Validate CPF numbers (for Node.js and browsers)

[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

## Installation

**NPM:**

```console
npm install --save iscpf
```

**Yarn:**

```console
yarn add iscpf
```

## Usage

Import the lib:

**ES6 Modules:**

```js
import { isCpf } from 'iscpf'
```

**CommonJS:**

```js
const { isCpf } = require('iscpf')
```

Don't worry about pontuation:

```js
console.log(isCpf('75300153206')) // true
console.log(isCpf('462.498.462-55')) // true
```

Enjoy ;)

## License

[MIT][license-url] &copy; Fernando Daciuk

[build-image]: https://img.shields.io/travis/fdaciuk/iscpf.svg?style=flat-square
[build-url]: https://github.com/fdaciuk/iscpf/actions/workflows/npm-publish.yml
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/fdaciuk/licenses/blob/master/MIT-LICENSE.md
