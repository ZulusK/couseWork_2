<template>
  <v-toolbar :fixed="true" class="blue accent-3">
    <v-toolbar-title class="white--text ma-2">
      <span class="logo home" flat dark @click="navigateTo({name:'root'})">
        Codual
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat dark @click="navigateTo({name:'publications'})">
        <!--Publications-->
        <v-icon large color="white">view_comfy</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn"
             flat dark @click="navigateTo({name:'publications.create'})">
        <v-icon large color="white">add_circle_outline</v-icon>
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!--<router-link to="signup">-->
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark @click="navigateTo({name:'signup'})">
        <!--Sign UP-->
        <v-icon color="white" large>person_add</v-icon>
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark @click="navigateTo({name:'login'})">
        <v-icon color="white" large>account_circle</v-icon>
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat dark @click="logout()">
        <v-icon large color="white">exit_to_app</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import VIcon from "vuetify/src/components/VIcon/VIcon";

  export default {
    components: {
      VIcon
    },
    methods: {
      navigateTo (route) {
        this.$router.push(route);
      },
      logout () {
        //set data in storage
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setUsername', null);
        this.$store.dispatch('setId', null);
        navigateTo({name: 'root'})
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
