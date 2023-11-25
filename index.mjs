import { getPoints } from './src/get-points.mjs'
import { createServer } from 'node:http'
import { config } from 'dotenv'

config()

const frontendUrl = 'https://glevanov.github.io'
const port = process.env.PORT || 3000

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', frontendUrl)

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

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

