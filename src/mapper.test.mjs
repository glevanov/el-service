import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { mapData, mapPoint } from './mapper.mjs';
import parsed from './__fixtures__/parsed.mjs'

test('mapData', () => {
  const result = mapData(parsed)

  assert.equal(
    result,
    [{
      start: '2023-12-02T23:00Z',
      points: [
        { hour: 0, price: 105.15 },
        { hour: 1, price: 99.7 },
        { hour: 2, price: 94.97 },
        { hour: 3, price: 88.83 },
        { hour: 4, price: 92.35 },
        { hour: 5, price: 89.52 },
        { hour: 6, price: 88.86 },
        { hour: 7, price: 92.13 },
        { hour: 8, price: 97.02 },
        { hour: 9, price: 100.15 },
        { hour: 10, price: 104.96 },
        { hour: 11, price: 105.07 },
        { hour: 12, price: 103.68 },
        { hour: 13, price: 102.46 },
        { hour: 14, price: 105.68 },
        { hour: 15, price: 117.83 },
        { hour: 16, price: 125.2 },
        { hour: 17, price: 131.72 },
        { hour: 18, price: 132.22 },
        { hour: 19, price: 126.07 },
        { hour: 20, price: 112.33 },
        { hour: 21, price: 101.95 },
        { hour: 22, price: 99.09 },
        { hour: 23, price: 91.12 },
      ]
    }]
  )
})

test('mapPoint', () => {
  const result = mapPoint({
    position: 1,
    'price.amount': 105.15,
  })

  assert.equal(result, {
    hour: 0,
    price: 105.15,
  })
})

test.run()
