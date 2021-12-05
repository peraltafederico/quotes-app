import express from 'express'
import pluralize from 'pluralize'
import path from 'path'

import fs from 'fs'

const router = express.Router()

const routesPath = path.resolve(`${__dirname}/../../src/routes`)
const routes = fs.readdirSync(routesPath)

routes.forEach(async (file: string) => {
  if (!file.includes('index')) {
    const name = file.split('.')[0]

    const { default: moduleRoutes } = await import(
      path.resolve(routesPath, file)
    )

    router.use(`/${pluralize.plural(name)}`, moduleRoutes)
  }
})

export default router
