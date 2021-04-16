const add = (nb1, nb2) => {
  return result = nb1 + nb2
}
const sub = (nb1, nb2) => {
  return result = nb1 - nb2
}
const mul = (nb1, nb2) => {
  return result = nb1 * nb2
}
const div = (nb1, nb2) => {
  return result = nb1 / nb2
}
const mod = (nb1, nb2) => {
  return result = nb1 % nb2
}

const calc = (op, nb1, nb2) => {

  if (isNaN(nb1) || isNaN(nb2)) {
    throw new Error('nb1 and nb2 should be numbers')
  }

  switch (op) {
    case 'add':
      return add(nb1, nb2)
    case 'sub':
      return sub(nb1, nb2)
    case 'mul':
      return mul(nb1, nb2)
    case 'div':
      return div(nb1, nb2)
    case 'mod':
      return mod(nb1, nb2)
    default:
      throw new Error('operator is not valid')
  }
}

exports.calc = calc