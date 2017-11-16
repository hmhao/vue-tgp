<template>
  <div class="index">
    <Banner :list="banners"/>
    <component v-for="(block, index) in blocks" :is="'Album'+block.style" :block="block" :key="'album'+index"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Banner from '@/components/Banner.vue'
import Album1 from '@/components/album/Album1.vue'
import Album2 from '@/components/album/Album2.vue'
import Album3 from '@/components/album/Album3.vue'
import Album4 from '@/components/album/Album4.vue'
import Album5 from '@/components/album/Album5.vue'
export default {
  name: 'index-view',
  asyncData ({ store, route }) {
    let actions = ['FETCH_INDEX_HEADER', 'FETCH_INDEX_BLOCK']
    return Promise.all(actions.map((action) => store.dispatch(action)))
  },
  computed: mapState(['banners', 'blocks']),
  components: {
    Banner,
    Album1,
    Album2,
    Album3,
    Album4,
    Album5
  }
}
</script>

