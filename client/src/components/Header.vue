<template>
  <v-toolbar fixed class="blue accent-3">
    <v-toolbar-title class="white--text ma-2">
      <span class="logo home" flat dark @click="navigateTo({name:'root'})">
        Codual
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat dark @click="navigateTo({name:'publications'})">
        Publications
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat dark @click="navigateTo({name:'publications.create'})">
        +
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!--<router-link to="signup">-->
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark @click="navigateTo({name:'signup'})">
        Sign UP
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat dark @click="navigateTo({name:'login'})">
        LOG IN
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat dark @click="logout()">
        Log out
      </v-btn>

      <!--</router-link>-->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import LoginIcon from "../../node_modules/vue-material-design-icons/login.vue";

  export default {
    components: {LoginIcon},
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
