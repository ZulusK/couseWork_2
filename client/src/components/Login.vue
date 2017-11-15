<template>
  <v-layout
    v-if="!$store.state.isUserLoggedIn"
    column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <form>
          <v-text-field
            label="Username"
            name="username"
            v-model="username"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            name="username"
            v-model="password"
            required
          ></v-text-field>
          <v-alert color="error" icon="check_circle" :value="error" v-html="error" class="white--text text-lg-center"
                   transition="scale-transition">
          </v-alert>
          <v-alert color="success" icon="check_circle" :value="success" v-html="success"
                   class="white--text text-lg-center" transition="scale-transition">
          </v-alert>
          <v-btn round @click="submit" color="success">
            Login
          </v-btn>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>
<script>

  import AuthService from '@/services/AuthService'
  import Panel from '@/components/Panel'

  export default {
    components: {
      Panel
    },
    data () {
      return {
        username: '',
        password: '',
        error: null,
        success: null
      }
    },
    methods: {
      async submit () {
        try {

          const response = await AuthService.login({
            username: this.username,
            password: this.password
          });

          //set data in storage
          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUsername', response.data.username);
          this.$store.dispatch('setId', response.data.id);

          this.error = null;
          this.success = "You are logged successful";
        } catch (error) {
          this.error = (error.data && error.data.response && error.data.response.message) ? error.data.response.message : "Error";
          this.success = null;
        }
      }
    }
  }
</script>


<style scoped>

</style>
