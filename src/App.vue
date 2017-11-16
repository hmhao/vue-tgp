<template>
  <div id="app">
    <!--  header  DOM  -->
    <section class="header kkad" v-if="headerad">
      <div class="header_left">
        <div class="header_logo"></div>
        <h2 class="header_title">{{title}}</h2>
        <span class="header_slogan">{{slogan}}</span>
      </div>
      <a class="header_download_button" href="javascript:void(0)"></a>
      <a class="header_cancel_button" href="javascript:void(0)"></a>
    </section>
    <!--  navigater  DOM  -->
    <section class="nav" :style="{'margin-top': !headerad && '0px'}" v-gesture:doubletap.stop="gotoTop">
      <div class="nav_wrap">
        <router-link class="main_body_nav_item" 
          active-class="main_body_nav_item-active"
          v-for="(nav, index) in navs"
          tag="span"
          :key="nav.to"
          :to="nav.to">
            {{nav.label}}
        </router-link>
      </div>
    </section>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--  footer  DOM  -->
    <section class="footer kkad" v-if="footerad">
      <div class="header_left"></div>
      <a class="header_download_button" href="javascript:void(0)">立即下载</a>
    </section>
    <section class="footer_info">
      Copyright© 2013-{{year}} hmhao.github.io版权所有
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      headerad: false,
      footerad: true,
      navs: [{
        to: '/index',
        label: '首页'
      }, {
        to: '/list',
        label: '榜单'
      }, {
        to: '/category',
        label: '分类'
      }],
      scrollTimer: 0
    }
  },
  computed: Object.assign({},
    mapState(['title', 'slogan', 'year'])
  ),
  created () {
    this.$ssrContext
  },
  methods: {
    gotoTop () {
      let self = this
      cancelAnimationFrame(self.scrollTimer);
      self.scrollTimer = requestAnimationFrame(function fn(){
        let curHeight = document.documentElement.scrollTop || document.body.scrollTop
        let speed = (0 - curHeight) / 7
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
        if (curHeight === 0) {
          cancelAnimationFrame(self.scrollTimer)
        } else {
          self.scrollTimer = requestAnimationFrame(fn);
        }
        document.documentElement.scrollTop = document.body.scrollTop = curHeight + speed
      });
    },
  }
}
</script>