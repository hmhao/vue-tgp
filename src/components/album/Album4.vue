<template>
  <div class="album4">
    <div class="album4_upinfo" @click="jump(block.up_id)">
      <img :src="block.up_image">
      <span><em>{{ block.up_user }}</em>发表了片单</span>
    </div>
    <div class="album4_uptext">
      <a :href="genPlaylistHref(block)" class="title">{{ block.subject}}</a>
      <p class="text">{{ block.description}}</p>
    </div>
    <div class="album4_itembox">
      <div class="album4_itembox_srcoll" :style="{width: block.content.length * 2.94 + 3 + 'rem'}">
        <a v-for="(item, index) in block.content" :href="genHref(item)">
          <div class="album4_item">
            <img :src="item.image">
            <span class="album4_item_title">{{ item.name }}</span>
          </div>
        </a>
        <a class="more">查看更多</a>
      </div>
    </div>
  </div>
</template>

<script>
import album from './album'
export default {
  name: 'album4',
  mixins: [album],
  methods: {
    jump (up_id) {
      window.location.href=`http://tt.kankan.com/m/up-info.html?id=${up_id}`
    },
    genPlaylistHref ({playlist_id}) {
      if (playlist_id) {
        return 'http://tt.kankan.com/m/kandanlist/' + playlist_id + '.html'
      } else {
        return 'javascript:void(0)'
      }
    }
  }
}
</script>

