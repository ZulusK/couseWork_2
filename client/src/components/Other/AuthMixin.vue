<template>

</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {
      isLogged () {
        return this.$store.getters.isLogged();
      },
      isNotLogged () {
        return !this.isLogged();
      }
    },
    computed: {},
    props: [],
    created: {}
  }
</script>
<style scoped lang="scss">
</style>
