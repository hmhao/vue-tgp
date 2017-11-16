<template>
  <div class="switcher">
    <router-link v-for="(tab, index) in tabs"
      tag="div"
      active-class="active"
      :key="tab.to"
      :to="$route.path.replace(type, tab.to)">
        {{ tab.label }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'list-tab',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    type: String
  }
}
</script>

