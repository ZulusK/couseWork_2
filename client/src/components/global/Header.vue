<template>

  <v-toolbar color="amber" app fixed class="pa-1" clipped-left>
    <v-toolbar-title class="display-2">
      <v-toolbar-side-icon @click="$emit('sidebar')" large>
        <v-icon large color="white">menu</v-icon>
      </v-toolbar-side-icon>
      <span class="home" flat dark @click="navigateTo({name:'root'})">
        Codual</span>
    </v-toolbar-title>
    <v-spacer class="hidden-md-and-down"></v-spacer>
    <v-text-field
      solo
      flat
      color="red"
      class="ma-5  pl-2 pr-2"
      prepend-icon="search"
      placeholder="Search"
    ></v-text-field>
    <v-spacer class="hidden-md-and-down"></v-spacer>

    <v-toolbar-item>
    <span v-if="!$store.state.isUserLoggedIn">
    <v-btn icon large
           flat dark :to="{name:'login'}" color="white">
      <v-icon large>account_circle</v-icon>
    </v-btn>
    <v-btn icon large
           flat dark :to='{name:"signup"}' color="white">
      <v-icon large>person_add</v-icon>
    </v-btn>
  </span>
      <span v-else>
        <v-btn icon large
               flat dark :to="{name:'publications.create'}" color="white">
        <v-icon large>add</v-icon>
      </v-btn>
    <v-btn icon large
           flat dark @click="logout()" color="white">
      <v-icon large>exit_to_app</v-icon>
    </v-btn>

  </span>
      <v-btn icon large
             flat dark :to='{name:"publications"}' color="white">
        <v-icon large>apps</v-icon>
      </v-btn>
    </v-toolbar-item>
  </v-toolbar>

</template>

<script>

  export default {
    components: {},
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
    color: white;
  }

  .home:hover {
    color: rgb(255, 87, 34);
  }
</style>
