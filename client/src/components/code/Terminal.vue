<template>
  <div class=" mb-20 terminal">

    <div class="notification is-black ">
      <p class="is-size-3">Output:</p>
      <p v-for="(line,index) in env.output()">
        ...{{line}}
      </p>
    </div>
  </div>
</template>
<script>
  import CodeEnv from '#/CodeEnv';

  export default {
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: [
      "env"
    ],
    created () {

    },

  }
</script>
<style scoped lang="scss">
</style>
