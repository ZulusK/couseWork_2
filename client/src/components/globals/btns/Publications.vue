<template>
  <div class="navbar-item has-dropdown  is-hoverable has-text-primary-2">
    <a class="navbar-link is-size-4  has-text-primary-2" ref="btn" @click="showAll()">
      Posts
      <ui-ripple-ink trigger="btn" class="ripple"/>
      <ui-tooltip trigger="btn" position="right middle">discover publications </ui-tooltip>
    </a>
    <div class="navbar-dropdown is-right">
      <a class="navbar-item">
        Hot
      </a>
      <a class="navbar-item">
        New
      </a>
      <template v-if="isLogged()">
        <hr class="navbar-divider">
        <a class="navbar-item">
          My
        </a>
        <a class="navbar-item">
          Favourite
        </a>
        <hr class="navbar-divider">
        <a class="navbar-item">
          Create
        </a>
        <a class="navbar-item">
          Manage
        </a>
      </template>
    </div>

  </div>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';

  export default {
    mixins: [AuthMixin],
    data () {
      return {}
    },
    methods: {
      showAll () {
        this.$router.push({name: 'Publications-list'})
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  .ripple {
    color: $md-amber-200;
  }
</style>
