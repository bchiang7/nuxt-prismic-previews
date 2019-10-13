# nuxt-prismic-previews

[![Netlify Status](https://api.netlify.com/api/v1/badges/67a06a8e-ec9c-4dcc-bfeb-3c0794cda8fa/deploy-status)](https://app.netlify.com/sites/nuxt-prismic-previews/deploys)

> Getting Prismic Previews to work with a statically generated Nuxt site

## Setup

``` bash
# install dependencies
npm run install

# serve with hot reload at localhost:3000
npm run dev

# build for production and launch server
npm run build
npm run start

# generate static project
npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Getting Prismic previews to work with a static Nuxt site (i.e. hosted on Netlify)

1. Spin up a new Nuxt project with [`create-nuxt-app`](https://nuxtjs.org/guide/installation#using-code-create-nuxt-app-code-)

2. Follow Prismic's [Using Prismic with Nuxt.js](https://prismic.io/docs/vuejs/getting-started/primsic-nuxt) guide

3. Make sure you have a `/preview` route by following the instructions in the "Setting up your preview route" section of Prismic's [Using Prismic with Nuxt.js](https://prismic.io/docs/vuejs/getting-started/primsic-nuxt) guide

4. Add a file to the `middleware` folder called `preview.js`

5. Declare the middleware to the `router` object in your `nuxt.config.js`

    ```js
    // nuxt.config.js
    router: {
      middleware: 'preview',
    },
    ```

6. Paste the following in your preview middleware (adopted from [`prismic-nuxt`](https://github.com/jamespegg/prismic-nuxt))

    ```js
    // middleware/preview.js
    import Prismic from 'prismic-javascript';
    import PrismicConfig from '~/prismic.config.js';
    import LinkResolver from '~/plugins/link-resolver.js';

    export default async function(context) {
      const { route, query, redirect, res } = context;
      const api = Prismic.getApi(PrismicConfig.apiEndpoint);

      if (route.path === '/preview') {
        const { token } = query;

        if (token) {
          const url = await api.previewSession(token, LinkResolver, '/');

          const cookie = [
            `${Prismic.previewCookie}=${token}`,
            `max-age=${30 * 60 * 1000}`,
            'path=/',
          ].join('; ');

          if (process.server) {
            // Server-side
            res.setHeader('Set-Cookie', [cookie]);
          } else {
            // Client-side
            document.cookie = cookie;
          }

          redirect(302, url);
        } else {
          redirect(302, '/');
        }
      }
    }
    ```

7. Fetching content with a static site

   Nuxt.js won't automatically run the `asyncData` function again to get fresh data so the easiest thing is to the use the `created` lifecycle hook to force the page to get the most up to date content from Prismic when in preiview mode

    ```js
    // pages/mypage.vue
    <script>
    import Prismic from 'prismic-javascript';
    import PrismicConfig from '~/prismic.config.js';

    async function getPage(options = {}) {
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, options);
      return api.getByUID('page', 'my-page');
    }

    export default {
      async asyncData({ app, context, error, req }) {
        try {
          const result = await getPage({ req });

          return {
            document: result.data,
            documentId: result.id,
          };
        } catch (e) {
          error({ statusCode: 404, message: 'Page not found' });
        }
      },

      methods: {
        async refetchPageForPreview() {
          const result = await getPage();
          this.document = result.data;
        },
      },
    };
    </script>
    ```

8. In your Prismic repo go to `Settings` -> `Previews` -> `Create a Preview`

9. Once deployed to Netlify, fill in the details with `/preview` in the `Link Resolver` field
