<template>
  <v-layout
    v-if="!$store.state.isUserLoggedIn"
    column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat fense class="blue accent-3">
          <v-toolbar-title>
            Join us
          </v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form>
            <v-text-field
              label="Name"
              name="name"
              v-model="name"
              required
            ></v-text-field>
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
            <v-btn round @click="submit" class="green accent-5">
              Submit
            </v-btn>
          </form>

        </div>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>

  import AuthService from '@/services/AuthService'

  export default {
    components: {},
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

          const response = await AuthService.signup({
            username: this.username,
            password: this.password,
            name: this.name
          });

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
  .error {
    color: red;
  }

  .success {
    color: green;
  }
</style>
