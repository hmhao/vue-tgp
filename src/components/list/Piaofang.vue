<template>
  <ul class="rank">
    <li class="list_item" v-for="(item, index) in list.movie" :key="index">
      <a class="link" :href="genHref(item)">
        <!-- 电影图片容器 -->
        <div class="img-wrap">
          <!-- 电影榜中排名 -->
          <span :class="genRank(index)">{{ index + 1 }}</span>
          <!-- 电影图片 -->
          <img :src="item.poster">
        </div>
        <!-- 电影信息容器 -->
        <div class="film-info-wrap">
          <!-- 电影标题 -->
          <h2 class="film-title">{{ item.name }}</h2>
          <!-- 电影导演容器 -->
          <div class="film-director-wrap">
            <span class="film-director-title">导演：</span>
            <span class="film-director">{{ item.directors.join(' ') }}</span>
          </div>
          <!-- 电影演员容器 -->
          <div class="film-actor-wrap">
            <span class="film-actor-title">演员：</span>
            <span class="film-actor">{{ item.actors.join(' ') }}</span>
          </div>
          <!-- 电影发布日期容器 -->
          <div class="film-publish-date-wrap">
            <!-- 发布时间 -->
            <span class="publish-date">{{ item.release_date }}</span>
            <span class="publish-date-title">发布</span>
          </div>
          <!-- 电影时长容器 -->
          <div class="film-time-wrap">
            <span class="film-time">{{ item.play_length }}</span>
            <span class="film-time-title">分钟</span>
          </div>
        </div>
        <!-- 票房容器 -->
        <div class="sell-money-wrap">
          <!-- 票房标题-->
          <span class="sell-money-title">票房</span>
          <!-- 票房数字 -->
          <span class="sell-money">{{ item.tickets }}</span>
        </div>
        <!-- 豆瓣评分容器 -->
        <div class="douban-grade-wrap">
          <!-- 豆瓣评分标题 -->
          <span class="douban-title">豆瓣</span>
          <!-- 豆瓣评分 -->
          <div class="douban-grade" v-html="genScore(item.score)"></div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'piaofang',
  props: ['list'],
  methods: {
    genHref ({movie_id}) {
      return `http://tt.kankan.com/m/movieinfo/${movie_id}.html`
    },
    genRank (index) {
      return `rank-no${ (index == 0 || index == 1 || index == 2) ? index + 1 : ''}`
    },
    genScore (score) {
      score = String(score);
      let score1 = score.substr(0, 1);
      let score2 = score.substr(1) ? score.substr(score.length - 1) : '0';
      return `<span class="int-grade">${score1}</span><span class="dot">.</span><span class="decimals">${score2}</span>`
    }
  }
}
</script>

