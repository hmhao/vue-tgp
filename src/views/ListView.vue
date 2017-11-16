<template>
  <div class="list">
    <ListTab :tabs="tabs" :type="type"/>
    <div class="clear"></div>
    <component :list="list" :is="type" ref="box"/>
  </div>
</template>

<script>
import { isInPage, throttle } from '@/util'
import ListTab from '@/components/ListTab.vue'
import Renqi from '@/components/list/Renqi.vue'
import Upuser from '@/components/list/Upuser.vue'
import Piaofang from '@/components/list/Piaofang.vue'
import Quanwang from '@/components/list/Quanwang.vue'

export default {
  name: 'list-view',
  data () {
    return {
      tabs: [{
        to: 'renqi',
        label: '人气榜'
      }, {
        to: 'upuser',
        label: 'up主排行榜'
      }, {
        to: 'piaofang',
        label: '票房榜'
      }, {
        to: 'quanwang',
        label: '全网播放榜'
      }]
    }
  },
  asyncData ({ store, route }) {
    let actions = ['FETCH_INDEX_LIST']
    return Promise.all(actions.map((action) => store.dispatch(action, {type: route.params.type})))
  },
  computed: {
    list () {
      let state = this.$store.state[`list_${this.type}`]
      return state || []
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  mounted () {
    window.addEventListener('scroll', this.checkBottom)
  },
  destroyed () {
    window.removeEventListener('scroll', this.checkBottom)
  },
  methods: {
    loadMore () {
      let list = this.$store.state[`list_${this.type}`]
      if (list && list.has_next_page) {
        this.$store.dispatch('FETCH_INDEX_LIST', {type: this.type, page: list.current_page + 1})
      }
    },
    checkBottom: throttle(function(evt) {
      let $list = this.$refs.box.$el,
          childrenNum = $list.children.length,
          $last3 = $list.querySelector(`li:nth-child(${childrenNum - 3})`)

      if (isInPage($last3)) {
        this.loadMore()
      }
    }, 200)
  },
  components: {
    ListTab,
    Renqi,
    Upuser,
    Piaofang,
    Quanwang
  }
}
</script>

