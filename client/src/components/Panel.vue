<template>
  <div class="elevation-2 white">
    <v-toolbar flat fense class="blue accent-3 white--text">
      <v-toolbar-title>
        {{title}}
      </v-toolbar-title>
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot class="black--text">
        No slot content defined
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
//        title: "Hello"
      }
    },
    props: [
      'title'
    ]
  }
</script>

<style scoped>

</style>
