<template>
  <div class="album2">
    <span class="album2_title" v-show="block.title_display">- {{block.title}} -</span>
    <div class="album2_item" v-for="(item, index) in block.content">
      <div class="album2_item_left">
        <a :href="genLongHref(item)">
          <img :src="item.poster" alt="" class="album2_item_left_img">
        </a>
      </div>
      <div class="album2_item_right">
        <a :href="genHref(item)">
          <img :src="item.image" alt="" class="album2_item_right_img">
          <span class="album2_item_right_title">{{ item.name }}</span>
          <span class="album2_item_right_name">{{ item.up_user ? item.up_user + '/' : '' }}{{ item.length || '0\'00"' }}</span>
        </a>
      </div>
    </div>
    <a class="album2_bottom" v-show="block.more_status">
      <div class="album2_bottom_wrap">
        <span class="album2_bottom_title">查看更多</span>
        <div class="album2_bottom_icon"></div>
      </div>
    </a>
  </div>
</template>

<script>
import album from './album'
export default {
  name: 'album2',
  mixins: [album]
}
</script>

