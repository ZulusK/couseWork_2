<template>
  <div id="app">
    <v-app>
      <page-header @sidebar="sidebarDrawer=!sidebarDrawer"/>
      <sidebar :drawer.sync="sidebarDrawer"
               @opened="sidebarDrawer=true" @closed="sidebarDrawer=false"/>


      <v-content>
        <v-container fluid fill-heigth class="content">
          <router-view/>
        </v-container>
      </v-content>
      <page-footer/>
    </v-app>
  </div>
</template>


<script>
  import PageHeader from '@/components/global/Header.vue'
  import PageFooter from '@/components/global/Footer.vue'
  import VParallax from "vuetify/src/components/VParallax/VParallax";
  import Sidebar from "@/components/global/Sidebar.vue"

  export default {
    name: 'app',
    components: {
      VParallax,
      PageHeader,
      PageFooter,
      Sidebar
    },
    data () {
      return {
        dialog: false,
        sidebarDrawer: this.$vuetify.breakpoint.name === 'xl',
      }
    },
    methods: {}
  }
</script>

<style>
  .input-group--text-field input {
    /*border-bottom: 1px dotted rgba(0, 0, 0, .6);*/
  }

  .h1 {
    font-size: 120px;
  }

  .content{
    background: url('https://images.unsplash.com/photo-1507237081139-5dfb209dba79?auto=format&fit=crop&w=2060&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D') no-repeat center fixed;
    background-size: cover;

  }

</style>
