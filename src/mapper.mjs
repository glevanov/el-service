import { compareAsc, getDate, getHours } from 'date-fns'

export const trimByCurrentHour = (data) => {
  const today = new Date()
  const hour = getHours(today)
  const day = getDate(today)
  
  return data.reduce((trimmed, current) => {
    if (current.day === day) {
      const index = current.points.findIndex((point) => point.hour === hour)
      const twoHoursBeforeIndex = index - 2
      return [
        ...trimmed,
        {
          day: current.day,
          points: current.points.slice(twoHoursBeforeIndex > 0 ? twoHoursBeforeIndex : 0)
        }
      ]
    }
    return [...trimmed, current]
  }, [])
}

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
  return trimByCurrentHour(points)
}
