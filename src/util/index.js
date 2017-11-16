/**
 * 判断元素是否显示在当前页面内
 * @param elem {Element}
 *
 * @return {Boolean}
 */
export function isInPage(elem){
  let rect = elem.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“节流”函数
 */
export function throttle(fn, threshhold) {
  let last, // 记录上次执行的时间
      timer // 定时器

  threshhold || (threshhold = 250) // 默认间隔为 250ms

  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this,
        args = arguments,
        now = +new Date()

    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshhold) {
      clearTimeout(timer)

      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, threshhold)

      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

