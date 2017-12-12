<template>
  <a class="navbar-item" ref="btn" v-if="isNotLogged()" @click="$emit('action')">
    <span>
      <b-icon
        class="is-hidden-desktop has-text-primary-2"
        pack="mdi"
        icon="account">
      </b-icon>
      <span class="is-size-4 is-hidden-touch has-text-primary-2">Sign up</span>
    </span>
    <ui-ripple-ink trigger="btn" class="ripple"/>
    <ui-tooltip trigger="btn" position="bottom center">Sign up now</ui-tooltip>
  </a>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';

  export default {
    mixins: [AuthMixin],
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
