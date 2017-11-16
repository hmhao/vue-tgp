<template>
  <ul class="upuser">
    <li class="list_item" v-for="(item, index) in list.upusers" :key="index">
      <a class="link" :href="genHref(item)">
        <div class="rank-wrap">
          <span :class="genRank(index)">{{ index + 1 }}</span>
        </div>
        <div class="img-wrap">
          <img :src="item.avatar">
        </div>
        <!-- up主信息容器 -->
        <div class="up-info-wrap">
          <!-- up主信息 -->
          <div class="up-info">
            <!-- up主姓名 -->
            <h2 class="up-name">{{ item.nickname }}</h2>
            <!-- up主类型 -->
            <div class="up-type-wrap">
              <span class="up-type" v-for="tag in item.tags">{{ tag }}</span>
            </div>
          </div>
        </div>
      </a>
      <!-- 关注按钮 -->
      <div class="focus-btn">
        <a class="callapp-index-follow">+ 关注</a>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'upuser',
  props: ['list'],
  methods: {
    genHref ({user_id}) {
      return `http://tt.kankan.com/m/up-info.html?id=${user_id}`
    },
    genRank (index) {
      return `rank-no${ (index == 0 || index == 1 || index == 2) ? index + 1 : ''}`
    }
  }
}
</script>

