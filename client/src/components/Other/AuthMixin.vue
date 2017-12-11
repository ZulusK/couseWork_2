<script>
  module.exports = {
    methods: {
      isLogged () {
        return this.$store.getters.isLogged();
      },
      isNotLogged () {
        return !this.isLogged();
      }
    },
  }
</script>
