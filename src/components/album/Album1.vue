<template>
  <div class="album1">
    <span class="album1_title" v-show="block.title_display">- {{block.title}} -</span>
    <div class="album1_item" v-for="(item, index) in block.content">
      <a :href="genHref(item)">
        <img :src="item.image" alt="" class="album1_title_img">
        <span class="album1_item_title">{{ item.name }}</span>
        <span class="album1_item_name">{{ item.up_user }}</span>
        <div class="album1_item_time">
          <span class="album1_item_numbers">{{ item.length || '0\'00"' }}</span>
        </div>
      </a>
    </div>
    <a class="album1_bottom">
      <div class="album1_bottom_wrap">
        <span class="album1_bottom_title">查看更多</span>
        <div class="album1_bottom_icon"></div>
      </div>
    </a>
  </div>
</template>

<script>
import album from './album'
export default {
  name: 'album1',
  mixins: [album]
}
</script>

