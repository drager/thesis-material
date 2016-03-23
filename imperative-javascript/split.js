'use strict'

const split = (xs) => {
  const obj = {even: [], odd: []}

  for (let i = 0; i < xs.length; i++) {
    if (xs[i] % 2 === 0) {
      obj.even.push(xs[i])
    } else {
      obj.odd.push(xs[i])
    }
  }

  return obj
}
