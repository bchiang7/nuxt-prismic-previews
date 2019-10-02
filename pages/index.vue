<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        <!-- prismic-nuxt-spike -->
        {{ $prismic.asText(document.data.headline) }}
      </h1>
      <h2 class="subtitle">
        My kickass Nuxt.js project
      </h2>
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
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

function getPage(prismic) {
  return prismic.api.getByUID('home', 'home')
}

export default {
  components: {
    Logo
  },

  async asyncData({ app, error }) {
    // const document = await app.$prismic.api.getByUID('home', 'home')
    const document = await getPage(app.$prismic)

    if (document) {
      return { document }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  created() {
    getPage(this.$prismic).then((document) => {
      this.document = document
    })
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
