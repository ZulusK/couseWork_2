<template>
  <v-flex class="elevation-5 white">

    <v-card flat fense class="accent-3 white--text ">
      <v-card-title :class="color">
        <div class="display-3">{{title}}</div>
      </v-card-title>
      <v-card-media v-if="image" :src="image" height="300px"></v-card-media>
      <slot class="black--text" name="text">
        No slot content defined
      </slot>
    </v-card>
  </v-flex>
</template>
<script>

  import VCardMedia from "vuetify/src/components/VCard/VCardMedia";

  export default {
    components: {VCardMedia},
    data () {
      return {
//        title: "Hello"
      }
    },
    props: [
      'title',
      'color',
      "image"
    ]
  }
</script>

<style scoped>

</style>
