<template>
  <ul class="renqi">
    <li class="list_item" v-for="(item, index) in list.videos" :key="index">
      <div class="list_item_wrap">
        <a :href="genHref(item)">
          <div :class="['list_item_img', genRank(index)]"
               :style="genRankBg(item)"></div>
          <span class="list_item_img_numbers" style="line-height:initial;">{{ index + 1 }}</span>
          <span class="list_item_title">{{ item.title }}</span>
          <span class="list_item_name">{{ item.nickname }}</span>
          <div class="list_item_play_count">
            <span class="list_item_play_count_numbers">{{ item.play_num }}</span>
          </div>
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'renqi',
  props: ['list'],
  methods: {
    genHref ({video_id}) {
      return `http://m.kankan.com/ttkk/share/s/${video_id}.html`
    },
    genRank (index) {
      return `list_item_img-no${ (index == 0 || index == 1 || index == 2) ? index + 1 : ''}`
    },
    genRankBg ({poster}) {
      return {backgroundImage: `url(${poster})`}
    }
  }
}
</script>

