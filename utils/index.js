import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'

const getApi = () => Prismic.getApi(PrismicConfig.apiEndpoint)

export { getApi }
