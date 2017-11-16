// tap — fires when the element is tapped.
// doubleTap — this pair of events can be used to detect both single and double taps on the same element (if you don’t need double tap detection, use tap instead).
// longTap — fires when an element is tapped and the finger is held down for more than 750ms.
// swipe, swipeLeft, swipeRight, swipeUp, swipeDown — fires when an element is swiped (optionally in the given direction)
// touchstart touchmove touchend - These equivalent to touch the primary event

;(function(){
  if(vueGesture && vueGesture.config && vueGesture.config.id === "vue-Gesture@hmhao@gmail.com") return;
  const vueGesture = {};
  vueGesture.gloabal = {
    id: "vue-Gesture@hmhao@gmail.com",
    domUuid : 1,
    InternalKeyName : "vueGestureInternalKey"
  };
  vueGesture.domCaches = {};
  vueGesture.util = {
    getType (o) {
      let _t;
      return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
    },
    deepClone (source) {
      let destination = this.getType(source);
      destination = destination==='array'?[]:(destination==='object'?{}:source);
      for (let p in source) {
        if (this.getType(source[p]) === "array" || this.getType(source[p]) === "object") {
          //destination[p] = this.getType(source[p]) === "array" ? [] : {};
          destination[p] = arguments.callee.call(this, source[p]);
        } else {
          destination[p] = source[p];
        }
      }
      return destination;
    },
  };
  vueGesture.config = {
    maxSingleTapTimeInterval : 300, // ms
    maxSingleTapPageDistanceSquared : 25, // within 5px we consider it as a single tap
    minLongtapTimeInterval : 700,
    maxDoubleTapTimeInterval: 300,
    maxDoubleTapPageDistanceSquared: 64, //8px
    gestureEventsToClick:['tap', 'doubletap', 'longtap', 'touchstart']
  };

  vueGesture.Statics = {
    initEvents (el) {
      let b = this.isInDomCaches(el);
      if(b) return;
      let domCache = this.getDomCache(el);
      domCache.listenTouchEvents.touchstart = (evt) => {
        if (this.isPC()) {return}
        if(this.isPrimaryTouch(evt)) return;
        this.touchstartHandler(el, evt);
      };
      domCache.listenTouchEvents.touchmove = (evt) => {
        if (this.isPC()) {return}
        if(this.isPrimaryTouch(evt)) return;
        this.touchmoveHandler(el, evt);
      };
      domCache.listenTouchEvents.touchend = (evt) => {
        if(evt.type != "touchend") return;
        if (this.isPC()) {return}
        if(this.isPrimaryTouch(evt)) return;
        this.touchendHandler(el, evt);
      };
      domCache.listenTouchEvents.click = (evt) => {
        //todo
        // if(_self.isPrimaryTouch(e)) return;
        this.clickHandler(el, evt);
      };
      el.addEventListener('touchstart',domCache.listenTouchEvents.touchstart,false);
      el.addEventListener('touchmove',domCache.listenTouchEvents.touchmove,false);
      el.addEventListener('touchend',domCache.listenTouchEvents.touchend,false);
      el.addEventListener('click',domCache.listenTouchEvents.click,false);
    },
    invokeHandler (evt, o, touch, gestureName) {
      if (vueGesture.judgements[gestureName](touch)) {
        this.executeFn(evt, o);
      }
    },
    clickHandler (el , evt) {
      let domCache = this.getDomCache(el);
      let touch = domCache.touch;
      let o = domCache.gestureEvents['click'];
      if (o) {
        this.executeFn(evt ,o);
      }
      if (this.isPC()) {
        touch.touchstartTime = touch.touchendTime = Date.now()
        touch.touchstartCoord.pageX = touch.touchendCoord.pageX = evt.pageX;
        touch.touchstartCoord.pageY = touch.touchendCoord.pageY = evt.pageY;
        vueGesture.config.gestureEventsToClick.forEach((event) => {
          let _o = domCache.gestureEvents[event];
          if (_o){
            this.invokeHandler(evt, _o, touch, event);
          }
        });
        touch.lastTouchstartTime = touch.touchstartTime;
        touch.lastTouchendTime = touch.touchendTime;
        touch.lastTouchstartCoord = vueGesture.util.deepClone(touch.touchstartCoord);
        touch.lastTouchendCoord = vueGesture.util.deepClone(touch.touchendCoord);
      }
    },
    touchstartHandler (el, evt) {
      let domCache = this.getDomCache(el);
      let touch = domCache.touch;
      let o = domCache.gestureEvents['touchstart'];
      if (o) {
        this.executeFn(evt, o);
      }
      touch.touchstartTime = evt.timeStamp;
      touch.touchstartCoord.pageX = evt.touches[0].pageX;
      touch.touchstartCoord.pageY = evt.touches[0].pageY;
    },
    touchmoveHandler (el, evt) {
      let domCache = this.getDomCache(el);
      let touch = domCache.touch;
      let o = domCache.gestureEvents['touchmove'];
      if (o) {
        this.executeFn(evt , o);
      }
    },
    touchendHandler (el, evt) {
      let domCache = this.getDomCache(el);
      let touch = domCache.touch;
      touch.touchendTime = evt.timeStamp;
      touch.touchendCoord.pageX = evt.changedTouches[0].pageX;
      touch.touchendCoord.pageY = evt.changedTouches[0].pageY;
      //is match condition;
      for (let o in domCache.gestureEvents){
        this.invokeHandler(evt, domCache.gestureEvents[o], touch, o);
      }
      touch.lastTouchstartTime = touch.touchstartTime;
      touch.lastTouchendTime = touch.touchendTime;
      touch.lastTouchstartCoord = vueGesture.util.deepClone(touch.touchstartCoord);
      touch.lastTouchendCoord = vueGesture.util.deepClone(touch.touchendCoord);
    },
    getDomCache (el) {
      return vueGesture.domCaches[el[vueGesture.gloabal.InternalKeyName]] ||
        (vueGesture.domCaches[el[vueGesture.gloabal.InternalKeyName] = vueGesture.gloabal.domUuid++] = this.initDomCache());
    },
    isInDomCaches (el){
      return vueGesture.domCaches[el[vueGesture.gloabal.InternalKeyName]] ? true : false;
    },
    unbindDirective (el) {
      let domCache = this.getDomCache(el);
      this.removeDirectiveEventListeners(el, domCache);
      //todo Memory recovery
      vueGesture.domCaches[el[vueGesture.gloabal.InternalKeyName]] = null;
      delete vueGesture.domCaches[el[vueGesture.gloabal.InternalKeyName]];
    },
    initDomCache () {
      return {
        touch : {
          touchstartTime : 0,
          touchendTime : 0,
          touchstartCoord : {},
          touchendCoord : {},

          lastTouchendTime : 0,
          lastTouchstartTime: 0,
          lastTouchstartCoord : {},
          lastTouchendCoord: {},

          get timeInterval () {
            return this.touchendTime - this.touchstartTime;
          },
          get pageXDistance () {
            return this.touchendCoord.pageX - this.touchstartCoord.pageX;
          },
          get pageYDistance () {
            return this.touchendCoord.pageY - this.touchstartCoord.pageY;
          },
          get lastTimeInterval () {
            return this.lastTouchendTime - this.lastTouchstartTime;
          },
          get lastPageXDistance () {
            return this.touchendCoord.pageX - this.touchstartCoord.pageX;
          },
          get lastPageYDistance () {
            return this.touchendCoord.pageY - this.touchstartCoord.pageY;
          },
          get deltaTime () {
            return this.touchendTime - this.lastTouchstartTime;
          }
        },
        gestureEvents: {},
        listenTouchEvents: {}
      }
    },
    isPrimaryTouch (evt){
      // ensure swiping with one touch and not pinching
      return (evt.touches.length > 1 || evt.scale && evt.scale !== 1);
    },
    isPC () {
      if (typeof this._isPC === 'undefined') {
        let uaInfo = navigator.userAgent;
        let agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
        let flag = true;
        for (let i = 0; i < agents.length; i++) {
          if (uaInfo.indexOf(agents[i]) > 0) { flag = false; break; }
        }
        this._isPC = flag;
      }
      return this._isPC;
    },
    removeDirectiveEventListeners (el, domCache){
      el.removeEventListener('touchstart', domCache.listenTouchEvents.touchstart);
      el.removeEventListener('touchmove', domCache.listenTouchEvents.touchmove);
      el.removeEventListener('touchend', domCache.listenTouchEvents.touchend);
      el.removeEventListener('click', domCache.listenTouchEvents.click);
    },
    executeFn: function(evt ,o){
      o.fn(evt);
      // console.log(o,e.type);
      if(o.modifiers.stop)
        evt.stopPropagation();
      if(o.modifiers.prevent)
        evt.preventDefault();
    }
  };
  vueGesture.judgements = {
    tap (touch) {
      let {maxSingleTapTimeInterval, maxSingleTapPageDistanceSquared} = vueGesture.config;
      return (touch.timeInterval < maxSingleTapTimeInterval) && (touch.pageXDistance * touch.pageXDistance + touch.pageYDistance * touch.pageYDistance) < maxSingleTapPageDistanceSquared;
    },
    longtap (touch) {
      let {minLongtapTimeInterval, maxSingleTapPageDistanceSquared} = vueGesture.config;
      return (touch.timeInterval > minLongtapTimeInterval) && (touch.pageXDistance * touch.pageXDistance + touch.pageYDistance * touch.pageYDistance) < maxSingleTapPageDistanceSquared;
    },
    doubletap (touch) {
      let {maxDoubleTapTimeInterval, maxSingleTapTimeInterval, maxDoubleTapPageDistanceSquared, maxSingleTapPageDistanceSquared} = vueGesture.config;
      return touch.deltaTime < maxDoubleTapTimeInterval &&
        (touch.lastPageXDistance * touch.lastPageXDistance + touch.lastPageYDistance * touch.lastPageYDistance) < maxDoubleTapPageDistanceSquared &&
        (touch.timeInterval < maxSingleTapTimeInterval) && (touch.pageXDistance * touch.pageXDistance + touch.pageYDistance * touch.pageYDistance) < maxSingleTapPageDistanceSquared &&
        (touch.lastTimeInterval < maxSingleTapTimeInterval) && (touch.lastPageXDistance * touch.lastPageXDistance + touch.lastPageYDistance * touch.lastPageYDistance) < maxSingleTapPageDistanceSquared;
    },
    swipe (touch) {
      return (touch.pageXDistance * touch.pageXDistance + touch.pageYDistance * touch.pageYDistance) > vueGesture.config.maxSingleTapPageDistanceSquared;
    },
    swipeleft (touch) {
      if(!this.swipe(touch)) return false;
      return touch.pageXDistance < 0 && Math.abs(touch.pageXDistance) > Math.abs(touch.pageYDistance);
    },
    swiperight (touch) {
      if(!this.swipe(touch)) return false;
      return touch.pageXDistance > 0 && Math.abs(touch.pageXDistance) > Math.abs(touch.pageYDistance);
    },
    swipeup (touch) {
      if(!this.swipe(touch)) return false;
      return touch.pageYDistance < 0 && Math.abs(touch.pageYDistance) > Math.abs(touch.pageXDistance);
    },
    swipedown (touch) {
      if(!this.swipe(touch)) return false;
      return touch.pageYDistance > 0 && Math.abs(touch.pageYDistance) > Math.abs(touch.pageXDistance);
    },
    //not calculate
    touchstart () {return false},
    touchmove () {return false},
    touchend () {return true},
    click () {return false;}
  };
  vueGesture.install = function(Vue){
    Vue.directive('gesture', {
      bind (el, binding, vnode) {
        vueGesture.Statics.initEvents(el);
        if(typeof binding.value !== 'function') {
          return console.error('The expression of directive "v-gesture" must be a function!');
        }
        if(!binding.arg) {
          return console.error("binding.arg not corrent argument;");
        }
        let domCache = vueGesture.Statics.getDomCache(el);
        domCache.gestureEvents[binding.arg] = {
          fn: binding.value,
          modifiers: binding.modifiers
        };
      },
      unbind (el, binding, vnode) {
        vueGesture.Statics.unbindDirective(el);
      }
    });
  };

  if (typeof exports === 'object') {
    module.exports = vueGesture;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return vueGesture;
    })
  } else if (window.Vue) {
    window.vueGesture = vueGesture;
    Vue.use(vueGesture);
  }
})();