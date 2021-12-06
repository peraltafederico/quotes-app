import express from 'express'
import pluralize from 'pluralize'
import path from 'path'
import fs from 'fs'

const router = express.Router()

const routesPath = path.resolve(__dirname)
const routes = fs.readdirSync(routesPath)

routes
  .filter((file) => !file.includes('index'))
  .forEach(async (file: string) => {
    const name = file.split('.')[0]

    const { default: moduleRoutes } = await import(
      path.resolve(routesPath, file)
    )

    router.use(`/${pluralize.plural(name)}`, moduleRoutes)
  })

export default router
