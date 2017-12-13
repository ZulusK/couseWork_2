<template>
  <a class="navbar-item" ref="btn">
    <router-link
      :to="{name:'index'}">
      <b-icon
        class="has-text-primary-2 "
        pack="fa"
        icon="home"
        customSize="fa-2x">
      </b-icon>
      <span class="title is-hidden-touch has-text-primary-2">Codual</span>
    <ui-ripple-ink trigger="btn" class="ripple"/>
    </router-link>
    <ui-tooltip trigger="btn" position="bottom center">Go to home</ui-tooltip>
  </a>
</template>
<script>

  export default {
    data () {
      return {}
    },
  }
</script>
<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  .ripple {
    color: $md-amber-200;
  }
</style>
