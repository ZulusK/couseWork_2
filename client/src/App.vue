<template>
  <div id="app">
    <v-app>
      <page-header/>
      <main>
        <v-container fluid dark>
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
  import VParallax from "vuetify/src/components/VParallax/VParallax";
  //  import VApp from "vuetify/src/components/VApp/VApp";

  export default {
    name: 'app',
    components: {
//      VApp,
      VParallax,
      PageHeader,
      PageFooter
    }
  }
</script>

<style>
  .input-group--text-field input {
    /*border-bottom: 1px dotted rgba(0, 0, 0, .6);*/
  }

  .h1 {
    font-size: 120px;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }

</style>
