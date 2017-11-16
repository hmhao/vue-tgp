<template>
  <div class="album3">
    <span class="album3_title" v-show="block.title_display">- {{block.title}} -</span>
    <div class="album3_itembox">
      <div class="album3_itembox_srcoll" :style="{width: block.content.length * 7.3 + 4.3 + 'rem'}">
        <div class="album3_item" v-for="(item, index) in block.content">
          <img :src="item.image">
          <span class="album3_item_title">{{ item.name }}</span>
          <p class="album3_item_time">
            <template v-if="item.up_user">
              <span>{{ item.up_user }}</span>/
            </template>
            <span>{{ item.length || '0\'00"' }}</span>
          </p>
        </div>
        <a class="more">查看更多</a>
      </div>
    </div>
  </div>
</template>

<script>
import album from './album'
export default {
  name: 'album3',
  mixins: [album]
}
</script>

