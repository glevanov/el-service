import { compareAsc } from 'date-fns'

const mapPoint = (point) => ({
  hour: point.position - 1,
  price: point['price.amount'],
})

export const mapData = (data) => {
  const timeSeries = data.Publication_MarketDocument.TimeSeries
  const periods = (Array.isArray(timeSeries) ? timeSeries : [timeSeries])
    .map(ts => ts.Period)
    .sort((first, second) => compareAsc(new Date(first.timeInterval.start), new Date(second.timeInterval.start)))
  const points = periods.reduce((flattened, current) => [...flattened, ...current.Point.map(mapPoint)], [])
  return points
}
