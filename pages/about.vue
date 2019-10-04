<template>
  <div class="container">
    <prismic-edit-button :document-id="documentId" />

    <div>
      <logo />
      <h1 class="title">
        {{ $prismic.richTextAsPlain(document.title) }}
      </h1>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
        <nuxt-link to="/" class="button--green">
          Home
        </nuxt-link>
      </div>
      <br />
      <!-- <img :src="document.data.image.url" alt="linus" /> -->
    </div>
  </div>
</template>

<script>
import { getApi } from '~/utils'
import onCreate from '~/mixins/onCreate'
import Logo from '~/components/Logo.vue'

async function getPage() {
  const api = await getApi()
  return api.getByUID('about', 'about')
}

export default {
  components: {
    Logo
  },

  mixins: [onCreate],

  async asyncData({ app, context, error, req }) {
    try {
      const result = await getPage({ req })

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        document: result.data,
        documentId: result.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  methods: {
    async refetchPageForPreview() {
      const result = await getPage()
      this.document = result.data
      this.documentId = result.id
    }
  }
}
</script>
