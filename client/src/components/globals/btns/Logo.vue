<template>
  <a class="navbar-item is-transparent">
    <router-link
      :to="{name:'index'}">
      <b-icon
        pack="fa"
        icon="home"
        size="is-large">
      </b-icon>
      <b-icon
        pack="mdi"
        icon="account"
        size="is-small">
      </b-icon>
      <span class="title is-primary">Codual</span>
    </router-link>
  </a>
</template>
<script>

  export default {
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: [],
    created: {}
  }
</script>
<style scoped lang="scss">

</style>
