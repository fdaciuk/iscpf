;(function (root, factory) {
  'use strict'
  /* eslint-disable no-undef */
  if (typeof define === 'function' && define.amd) {
    define(factory)
  } else if (typeof exports === 'object') {
    exports = module.exports = factory()
  } else {
    root.isCpf = factory()
  }
  /* eslint-disable no-undef */
})(this, function () {
  'use strict'

  function getVerificationDigit (value) {
    var rest = value % 11
    return rest < 2 ? 0 : 11 - rest
  }

  function sumDigits (first, second) {
    return first + second
  }

  function multiplyDigits (factor) {
    return function (digit, index) {
      return Number(digit) * (factor - index)
    }
  }

  function isValidCpf (cpf) {
    var isSameNumber = cpf.match(/^(\d)\1{10}$/)
    if (isSameNumber) {
      return false
    }
    var brokenCpf = cpf.match(/^(\d{9})(\d{2})$/)
    var withoutDigits = brokenCpf[1].split('')
    var digits = brokenCpf[2]

    var tempFirstDigit = withoutDigits
      .map(multiplyDigits(10))
      .reduce(sumDigits)

    var firstDigit = getVerificationDigit(tempFirstDigit)

    var tempSecondDigit = withoutDigits.concat(firstDigit)
      .map(multiplyDigits(11))
      .reduce(sumDigits)

    var secondDigit = getVerificationDigit(tempSecondDigit)

    return (String(firstDigit) + secondDigit) === digits
  }

  function validateCpf (cpf) {
    var cleanCpf = String(cpf).replace(/\D/g, '')
    return cleanCpf.length === 11 && isValidCpf(cleanCpf)
  }

  return validateCpf
})
