import { getPoints } from './src/get-points.mjs'
import { createServer } from 'node:http'
import { config } from 'dotenv'

config()

const server = createServer((req, res) => {
  if (req.url === '/') {
    getPoints((result) => {
      if (result.isSuccess) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result.points))
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end(result.error.toString())
      }
    })
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  }
})

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
