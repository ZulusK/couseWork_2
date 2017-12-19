<template>
  <div class="navbar-item has-dropdown  is-hoverable has-text-primary-2">
    <a class="navbar-link is-size-4  has-text-primary-2" ref="btn" @click="showAll()">
      Code
      <ui-ripple-ink trigger="btn" class="ripple"/>
      <ui-tooltip trigger="btn" position="right middle">discover visual programming</ui-tooltip>
    </a>
    <div class="navbar-dropdown is-right">
      <a class="navbar-item">
        <router-link :to="{name:'Code'}">
          Sandbox
        </router-link>
      </a>
      <template v-if="isLogged()">
        <hr class="navbar-divider">
        <a class="navbar-item">
          <!--<router-link :to="{name:'Blockly-',query:{author:$store.state.user.id}}">-->
          Create
          <!--</router-link>-->
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
        this.$router.push({name: 'Code'})
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
