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

    const url = await app.$prismic.api.previewSession(
      previewToken,
      LinkResolver,
      '/'
    )

    redirect(url)
  }
}
</script>
