import { compareAsc, getDate } from 'date-fns'

const mapPoint = (point) => ({
  hour: point.position - 1,
  price: point['price.amount'],
})

export const mapData = (data) => {
  const periods = data.Publication_MarketDocument.TimeSeries
    .map(ts => ts.Period)
    .sort((a, b) => compareAsc(new Date(a.timeInterval.start), new Date(b.timeInterval.start)))
  const points = periods.map(period => ({
    day: getDate(new Date(period.timeInterval.start)),
    points: period.Point.map(mapPoint),
  }))
  return points
}
