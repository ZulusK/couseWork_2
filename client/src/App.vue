<template>
  <div id="app">
    <v-app>
      <page-header/>
      <main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </main>
      <page-footer/>
    </v-app>
  </div>
</template>

<script>
  import PageHeader from '@/components/Header.vue'
  import PageFooter from '@/components/Footer.vue'
  //  import VApp from "vuetify/src/components/VApp/VApp";

  export default {
    name: 'app',
    components: {
//      VApp,
      PageHeader,
      PageFooter
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .input-group--text-field input {
    border-bottom: 1px dotted rgba(0, 0, 0, .2);
  }

  .btn__content, .toolbar__title {
    color: white;
  }

</style>
