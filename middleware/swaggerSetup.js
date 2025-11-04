import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerDocument = YAML.load('./api-docs/api.yaml')

export const swaggerSetup = swaggerUi.setup(swaggerDocument)
export const swaggerServe = swaggerUi.serve
