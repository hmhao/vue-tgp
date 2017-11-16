export default {
  props: ['block'],
  methods: {
    genHref ({type, sid, target_id, extra_id}) {
      if(type == 1){ //短视频 跳转播放页
        return `http://m.kankan.com/ttkk/share/s/${sid}.html`
      }else if(type == 3){ // style=2 type=3 时
        let two = String(target_id || sid || '').substr(0, 2); // style为2 有 target_id 否则当type为3 时 sid为长视频
        return `http://m.kankan.com/v/${two}/${target_id || sid }/${extra_id}.shtml`
      }else if(type == 4){ // 长视频 非正片 子集,style=2 中已出现 暂时和type为3的情况一样
        return `http://tt.kankan.com/m/movie-trailer.html?vid=${target_id || sid }&zid=${extra_id}`
      }else if(type == 2){ // 长视频介绍页 （看单中 style=4 已出现）
        return `http://tt.kankan.com/m/movieinfo/${target_id || sid || '91527'}.html`
      }else{ // 其它type TODO
        return 'javascript:void(0)'
      }
    },
    genLongHref ({target_id, sid}){
      return `http://tt.kankan.com/m/movieinfo/${target_id || sid || '91527'}.html`;
    }
  }
}
