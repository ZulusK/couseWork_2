<template>
  <div>
    <v-layout
      column>
      <v-flex xs6 offset-xs3>
        <panel title="Index">
          <v-card>
            <h1>Welcome to Codual, website, developed for education</h1>
          </v-card>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Panel from '@/components/Panel'

  export default {
    name: 'Index',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
