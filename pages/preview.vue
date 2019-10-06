<template>
  <div>
    <p>Loading Prismic Preview...</p>
  </div>
</template>

<script>
import { getApi } from '~/utils';
import LinkResolver from '~/plugins/link-resolver.js';

export default {
  name: 'Preview',

  async asyncData({ query, redirect }) {
    const previewToken = query.token;
    const api = await getApi();
    const url = await api.previewSession(previewToken, LinkResolver, '/');
    redirect(url);
  },
};
</script>
