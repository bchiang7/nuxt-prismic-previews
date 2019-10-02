<template>
  <div>
    Preview
  </div>
</template>

<script>
const LinkResolver = (doc, ctx) => '/'

export default {
  name: 'Preview',

  async asyncData({ app, query, redirect }) {
    const previewToken = query.token
    console.warn('TCL: Data -> previewToken', previewToken)
    // const api = await Prismic.getApi(PrismicConfig.apiEndpoint)

    const url = await app.$prismic.api.previewSession(
      previewToken,
      LinkResolver,
      '/'
    )
    console.warn('TCL: Data -> url', url)
    redirect(url)
  }
}
</script>
