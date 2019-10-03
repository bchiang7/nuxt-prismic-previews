/* eslint-disable */
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import LinkResolver from '~/plugins/link-resolver.js'

export default async function(context) {
  const api = await Prismic.getApi(PrismicConfig.apiEndpoint)

  // Universal keys
  // https://nuxtjs.org/api/context/
  const {
    app,
    store,
    route,
    params,
    query,
    env,
    isDev,
    isHMR,
    redirect,
    error
  } = context

  // Preview support
  // https://github.com/jamespegg/prismic-nuxt/blob/0393d45810b426059d81a0347ebf9633fb94ed07/src/plugin.js#L65
  if (route.path === '/preview') {
    const { token } = query

    if (token) {
      const url = await api.previewSession(token, LinkResolver, '/')

      const cookie = [
        `${Prismic.previewCookie}=${token}`,
        `max-age=${30 * 60 * 1000}`,
        'path=/'
      ].join('; ')

      if (process.server) {
        // Server-side
        context.res.setHeader('Set-Cookie', [cookie])
      } else {
        // Client-side
        document.cookie = cookie
      }

      redirect(302, url)
    } else {
      redirect(302, '/')
    }
  }
}
