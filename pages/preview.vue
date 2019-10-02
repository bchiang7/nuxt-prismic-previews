<template>
  <div>
    <p>Loading Prismic's Preview...</p>
  </div>
</template>

<script>
import LinkResolver from '@/plugins/link-resolver'

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
