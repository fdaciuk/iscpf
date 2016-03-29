'use strict'

const isCpf = require('../dist/is-cpf.min.js')

console.assert(isCpf() === false)
console.assert(isCpf('000.000.000-00') === false)
console.assert(isCpf('111111111 11') === false)
console.assert(isCpf('22222222222') === false)
console.assert(isCpf('33333333333') === false)
console.assert(isCpf('44444444444') === false)
console.assert(isCpf('55555555555') === false)
console.assert(isCpf('66666666666') === false)
console.assert(isCpf('77777777777') === false)
console.assert(isCpf('88888888888') === false)
console.assert(isCpf('99999999999') === false)

console.assert(isCpf('12312312312') === false)
console.assert(isCpf('379.472.401-16') === true)
console.assert(isCpf('93362180345') === true)

console.log('All tests passed!')
