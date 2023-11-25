import { compareAsc, getDate } from 'date-fns'

const flatten = (data) => data.reduce((flattened, current) => [...flattened, ...current.points], [])

const mapPoint = (point) => ({
  hour: point.position - 1,
  price: point['price.amount'],
})

export const mapData = (data) => {
  const timeSeries = data.Publication_MarketDocument.TimeSeries
  const periods = (Array.isArray(timeSeries) ? timeSeries : [timeSeries])
    .map(ts => ts.Period)
    .sort((a, b) => compareAsc(new Date(a.timeInterval.start), new Date(b.timeInterval.start)))
  const points = periods.map(period => ({
    day: getDate(new Date(period.timeInterval.start)),
    points: period.Point.map(mapPoint),
  }))
  return flatten(points)
}
