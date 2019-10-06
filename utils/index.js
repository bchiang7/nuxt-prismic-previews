import Prismic from 'prismic-javascript';
import PrismicConfig from '~/prismic.config.js';

const getApi = (options = {}) => Prismic.getApi(PrismicConfig.apiEndpoint, options);

export { getApi };
