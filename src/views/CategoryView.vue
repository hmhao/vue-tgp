<template>
  <div class="category">
    <div class="category_wrap">
      <div class="title">全部分类</div>
      <a class="category_wrap_item" v-for="(item, index) in category" :href="genHref(item)">{{ item.title }}</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'category-view',
  asyncData ({ store, route }) {
    let actions = ['FETCH_INDEX_CATEGORY']
    return Promise.all(actions.map((action) => store.dispatch(action)))
  },
  computed: mapState(['category']),
  methods: {
    genHref({id}) {
      return `http://tt.kankan.com/m/categorylist/${id || '0'}.html`
    }
  }
}
</script>