import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

export const config = {
  port: process.env.PORT || 3000,
  frontendUrl: process.env.FRONTEND_URL || '*',
  token: process.env.ENTSOE_TOKEN,
  endpoint: 'https://web-api.tp.entsoe.eu/api',
}
