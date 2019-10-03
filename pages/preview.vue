<template>
  <div>
    <p>Loading Prismic Preview...</p>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import LinkResolver from '~/plugins/link-resolver.js'
import PrismicConfig from '~/prismic.config.js'

export default {
  name: 'Preview',

  async asyncData({ query, redirect }) {
    const previewToken = query.token
    const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
    const url = await api.previewSession(previewToken, LinkResolver, '/')
    redirect(url)
  }
}
</script>
