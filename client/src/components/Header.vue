<template>
  <v-toolbar fixed=true  class="blue accent-3">
    <v-toolbar-title class="white--text ma-2">
      <span class="logo home" flat dark @click="navigateTo({name:'root'})">
        Codual
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <!--todo-->
      <!--<v-btn dark flat>-->
      <!--Browse-->
      <!--</v-btn>-->
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!--<router-link to="signup">-->
      <v-btn flat dark @click="navigateTo({name:'signup'})">
        Sign UP
      </v-btn>
      <v-btn flat dark @click="navigateTo({name:'login'})">
        LOG IN
      </v-btn>
      <!--</router-link>-->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    methods: {
      navigateTo (route) {
//        console.log(route);
        this.$router.push(route);
      }
    }
  }
</script>

<style scoped>

  .home {
    cursor: pointer;
  }

  .home:hover {
    color: darkblue;
  }
</style>
