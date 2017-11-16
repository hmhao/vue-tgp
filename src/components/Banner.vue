<template>
  <div class="banner" @touchstart="startSlider($event)" @touchmove="moveSlider($event)" @touchend="endSilder($event)">
    <div class="banner_image_list" :style="[sliderActive, {'width':imgList.length * 100 + 'vw'}]">
      <a v-for="(item, index) in imgList" style="width: 100vw"
        :href="genHref(item)">
          <img :src="item.poster" :alt="item.alt" class="image_item">
      </a>
    </div>
    <div class="banner_image_list_dots">
      <span class="dot" style="margin-right:8px" v-for="(item, index) in list" :class="{'dot-active': index === current}"></span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'banner',
  data () {
    return {
      sliderActive : {
        transform: 'translate3d(-100vw,0,0)',
        transition: 'all 0.3s',
        webkitTransition: 'all 0.3s'
      },
      interTimer : 0,
      interval: 3000,
      threshold: 80,
      startTouch : '',
      moveTouch : '',
      nowSlider: 0,
      current: 0
    }
  },
  props: ['list'],
  computed: {
    imgList () {
      //拷贝图片列表数据，在展示区域的图片实际上首尾拷贝了一样的图片，即尾端拷贝第一张，首端拷贝最后一张
      const [...imgs] = this.list
      const [imgfirst, ...other] = this.list
      imgs.unshift(other[other.length-1])
      imgs.push(imgfirst)
      return imgs
    }
  },
  mounted () {
    if (this.list && this.list.length) {
      this.startInterval()
    }
  },
  methods: {
    genHref ({target_type, target_id, target_url}) {
      if(target_type == 2){
        return `http://m.kankan.com/ttkk/share/s/${target_id}.html`
      }else if(target_type == 3){
        return `./movie-info.html?vid=${target_id}`
      }else{
        return `javascript:void(0)`
      }
    },
    startInterval () {
      this.interTimer = setInterval(()=>{
        this.sliderStart()
      }, this.interval)
    },
    startSlider (evt) {
      if (evt.target != evt.currentTarget) {//事件委托节省下事件绑定，排除当前绑定的dom
        clearInterval(this.interTimer)
        //关闭css3过渡效果
        this.sliderActive = {
          transform: `translate3d(${-100 * (this.nowSlider + 1)}vw,0,0)`
        }
        this.startTouch = evt.changedTouches[0].clientX
      }
    },
    moveSlider (evt) {
      if (this.nowSlider === -1 || this.nowSlider >= this.list.length) {  //首端与尾端未连接好禁止滑动
        return;
      }
      if (evt.target != evt.currentTarget) {
        this.moveTouch = evt.changedTouches[0].clientX
        let slideDir = this.moveTouch - this.startTouch,
          targetWidth = parseInt(window.getComputedStyle(evt.target).width),
          tranDir = -targetWidth * (this.nowSlider + 1) + slideDir  //触摸时图片随手指移动，距离须减去当前图片宽度乘以当前滚动索引
        this.sliderActive.transform = `translate3d(${tranDir}px,0,0)`
      }
    },
    endSilder (evt) { //结束触摸
      if (evt.target != evt.currentTarget) {
        const slideDir = this.moveTouch - this.startTouch
        if (Math.abs(slideDir) > this.threshold) {
          if (slideDir < 0) {
            this.nowSlider++
            this.current++
          } else {
            this.nowSlider--
            this.current--
          }
        }
        this.nowSlider--
        this.current--
        this.sliderStart() //立即设置位置
        this.moveTouch = 0  //清空手势位置
        this.startTouch = 0
        this.startInterval()
      }
    },
    sliderStart () {
      this.nowSlider = (this.nowSlider + 1) % this.imgList.length
      this.current = (this.current + 1) % this.list.length
      if (this.nowSlider >= this.list.length) {  //向右滑动到最大值时，将位置初始化并清0 nowSlider
        this.current = 0
        setTimeout(() => { //设置一个定时器，用于异步处理，一个进行尾端拷贝的图片的正常滑动，这个处理在差不多到达时重置，造成无限循环的错觉
          this.sliderActive = {
            transform: `translate3d(-100vw,0,0)`
          }
          this.nowSlider = 0
        }, 500)
      }
      if (this.nowSlider === -1) { //向右滑动到最小值时，将位置置为最大值
        this.current = this.list.length - 1
        setTimeout(() => {
          this.nowSlider = this.list.length - 1
          this.sliderActive = {
            transform: `translate3d(${-100 * (this.nowSlider + 1)}vw,0,0)`
          }
        }, 500)
      }
      this.sliderActive = {
        transform: `translate3d(${-100 * (this.nowSlider + 1)}vw,0,0)`,
        transition: 'all 0.3s',
        webkitTransition: 'all 0.3s'
      }
    }
  }
}
</script>

