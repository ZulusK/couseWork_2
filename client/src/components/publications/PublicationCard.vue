<template>
  <v-card v-if="publication" :height="heigth" flat class="elevation-5">
    <v-card-title :class="titleColor">
      <div class="subheading">{{title}}</div>
    </v-card-title>
    <v-card-media
      src="https://images.unsplash.com/photo-1471769321038-24f4db35b24d?auto=format&fit=crop&w=1353&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D">

    </v-card-media>
    <v-card-text>
      {{publication.description}}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: [
      'publication'
    ],
    computed: {
      titleColor () {
        return ['light-green', 'success', 'yellow accent-3', 'orange lighten-1', 'pink', 'red'][this.publication.difficult % 20];
      },
      title () {
        return this.publication.title.slice(0, 20);
      },
      heigth () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '150'
          case 'sm':
          case 'md':
            return '200'
          case 'lg':
          case 'xl':
            return '450'
          default:
            return '450'
        }
      }
    }
  }
</script>

<style scoped>

</style>
