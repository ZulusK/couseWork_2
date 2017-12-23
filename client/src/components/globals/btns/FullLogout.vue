<template>
  <a class="navbar-item" ref="btn" v-if="isLogged()" @click="$emit('action')">
    <span>
      <b-icon
        class="is-hidden-desktop has-text-primary-2"
        icon="delete"
        customSize="fa-lg">
      </b-icon>
      <span class="is-size-4 is-hidden-touch has-text-primary-2">Exit</span>
    </span>
    <ui-ripple-ink trigger="btn" class="ripple"/>
    <ui-tooltip trigger="btn" position="bottom center">Exit from all devices</ui-tooltip>
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
