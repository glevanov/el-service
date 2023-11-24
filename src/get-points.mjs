import { get } from 'node:https'
import { XMLParser } from 'fast-xml-parser'
import { addDays, format, startOfDay } from 'date-fns'
import { mapData } from './mapper.mjs'

const domain = '10Y1001A1001A47J'
const start = startOfDay(new Date())
const end = addDays(start, 1)

const getQuery = () => [
  `securityToken=${process.env.ENTSOE_TOKEN}`,
  'documentType=A44',
  `in_Domain=${domain}`,
  `out_Domain=${domain}`,
  `periodStart=${format(start, "yyyyMMddHHmm")}`,
  `periodEnd=${format(end, "yyyyMMddHHmm")}`
].join('&')

const parser = new XMLParser()

export const getPoints = async (callback) => {
  const req = get(`https://web-api.tp.entsoe.eu/api?${getQuery()}`, (res) => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      try {
        const parsedData = parser.parse(data)
        const points = mapData(parsedData)
        callback({
          isSuccess: true,
          points,
        })
      } catch (error) {
        callback({
          isSuccess: false,
          error,
        })
      }
    })
  })

  req.on('error', (error) => {
    callback({
      isSuccess: false,
      error,
    })
  })

  req.end()
}
