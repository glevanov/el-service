import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

export const config = {
  port: process.env.PORT || 3000,
  frontendUrl: 'https://glevanov.github.io',
  token: process.env.ENTSOE_TOKEN,
  endpoint: 'https://web-api.tp.entsoe.eu/api',
}
