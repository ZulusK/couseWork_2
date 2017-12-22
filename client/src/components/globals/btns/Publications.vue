<template>
  <div class="navbar-item has-dropdown  is-hoverable has-text-primary-2">
    <a class="navbar-link is-size-4  has-text-primary-2" ref="btn" @click="showAll()">
      Posts
      <ui-ripple-ink trigger="btn" class="ripple"/>
      <ui-tooltip trigger="btn" position="right middle">discover publications </ui-tooltip>
    </a>
    <div class="navbar-dropdown is-right">
      <a class="navbar-item">
        <router-link :to="{name:'Publications-list',query:{sort:JSON.stringify({views:-1})}}">
          Hot
        </router-link>
      </a>
      <a class="navbar-item">
        <router-link :to="{name:'Publications-list',query:{sort:JSON.stringify({created:1})}}">
          New
        </router-link>
      </a>
      <template v-if="isLogged()">
        <hr class="navbar-divider">
        <a class="navbar-item">
          <router-link :to="{name:'Publications-list',query:{author:$store.state.user?$store.state.user.id:''}}">
            My
          </router-link>
        </a>
        <a class="navbar-item">
          Favourite
        </a>
        <hr class="navbar-divider">
        <a class="navbar-item">
          <router-link :to="{name:'Publication-create'}">
            Create
          </router-link>
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

  a {
    color: black;
    text-decoration: none;
    :hover {
      text-decoration: none;
    }
    :visited {
      text-decoration: none;
    }
  }
</style>
