'use strict'

const isEven = x => x % 2 === 0
const split = (isEven, list) => [list.filter(n => isEven(n)), list.filter(n => !isEven(n))]
const result = split(isEven, [1, 2, 3, 4, 5])

const fsplit = (isEven, list, tuple) => {
  const x = list[0]
  const xs = list.slice(1)
  tuple = [].concat(tuple)

  if (xs.length === 0) {
    return isEven(x) ? tuple[0].concat([x]) : tuple[1].concat([x])
  }
  else {
    fsplit(isEven, xs, tuple)
  }
}
const fresult = fsplit(isEven, [1, 2, 3, 4, 5], [[], []])

console.log('result: ', result)
