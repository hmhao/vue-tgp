<template>
  <div class="album5">
    <span class="album5_title" v-show="block.title_display">- {{block.title}} -</span>
    <template v-for="(item, index) in block.up_content">
      <div class="album5_itemup">
        <img :src="item.up_image || ''">
        <span class="up_name">{{ item.up_user }}</span>
        <div class="up_tags">
          <span v-for="tag in item.up_tags">{{ tag }}</span>
        </div>
      </div>
      <div class="album5_itembox">
        <div class="album5_itembox_srcoll" :style="{width: item.list.length * 7.3 + 4.3 + 'rem'}">
          <a v-for="v in item.list" :href="genHref({type: 1, sid: v.video_id})">
            <div class="album5_item">
              <img :src="v.video_poster || v.poster || ''">
              <span class="album5_item_title">{{ v.video_name }}</span>
              <p class="album5_item_time">
                <template v-if="item.up_user">
                  <span>{{ item.up_user }}</span>/
                </template>
                <span>{{ v.play_length || v.length || '0\'00"' }}</span>
              </p>
            </div>
          </a>
          <a class="more">查看更多</a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import album from './album'
export default {
  name: 'album3',
  mixins: [album]
}
</script>

