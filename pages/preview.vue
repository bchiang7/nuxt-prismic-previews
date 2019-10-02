<template>
  <div>
    Preview
  </div>
</template>

<script>
const LinkResolver = (doc, ctx) => {
  if (doc.isBroken) {
    return '/404'
  }
  if (doc.type === 'home') {
    return '/'
  }
  if (doc.type === 'about') {
    return '/about'
  }
  return '/404'
}

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
