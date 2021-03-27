type MultiplyDigits = (digit: string, index: number) => number

function validateCpf (cpf: string): boolean {
  const cleanCpf = String(cpf).replace(/\D+/g, '')
  return cleanCpf.length === 11 && isValidCpf(cleanCpf)
}

function isValidCpf (cpf: string): boolean {
  const isSameNumber = cpf.match(/^(\d)\1{10}$/)
  if (isSameNumber) {
    return false
  }
  const brokenCpf = cpf.match(/^(\d{9})(\d{2})$/)
  const withoutDigits = brokenCpf![1].split('')
  const digits = brokenCpf![2]

  const tempFirstDigit = withoutDigits
    .map(multiplyDigits(10))
    .reduce(sumDigits, 0)

  const firstDigit = getVerificationDigit(tempFirstDigit)

  const tempSecondDigit = withoutDigits.concat(String(firstDigit))
    .map(multiplyDigits(11))
    .reduce(sumDigits, 0)

  const secondDigit = getVerificationDigit(tempSecondDigit)

  return `${firstDigit}${secondDigit}` === digits
}

function multiplyDigits (factor: number): MultiplyDigits {
  return function (digit, index) {
    return Number(digit) * (factor - index)
  }
}

function sumDigits (first: number, second: number): number {
  return first + second
}

function getVerificationDigit (value: number): number {
  const rest = value % 11
  return rest < 2 ? 0 : 11 - rest
}

export { validateCpf as isCpf }
