<template>
  <div class="container">
    <prismic-edit-button :document-id="documentId" />

    <div>
      <logo />
      <h1 class="title">
        {{ $prismic.richTextAsPlain(document.headline) }}
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
        <nuxt-link to="/about" class="button--green">
          About
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Prismic from 'prismic-javascript'
import PrismicConfig from '~/prismic.config.js'
import Logo from '~/components/Logo.vue'

function getPage(api, type, uid) {
  return api.getByUID(type, uid)
}

export default {
  components: {
    Logo
  },

  async asyncData({ context, error, req }) {
    try {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, { req })
      const result = await getPage(api, 'home', 'home')
      const document = result.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        document,
        documentId: result.id
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  created() {
    // this.getPageAgain()
  },

  methods: {
    async getPageAgain() {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint)
      const result = await getPage(api, 'home', 'home')
      const document = result.data
      this.document = document
      this.documentId = result.id
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
