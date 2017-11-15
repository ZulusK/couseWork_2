<template>
  <v-layout
    column>
    <v-flex xs6 offset-xs3>
      <panel title="Join us">
        <!--todo-->
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
          <v-progress-linear slot="progress" :value="progress" height="5" :color="color"></v-progress-linear>
          <v-alert color="error" icon="check_circle" :value="error" v-html="error"
                   class="white--text text-lg-center"
                   transition="scale-transition">
          </v-alert>
          <v-alert color="success" icon="check_circle" :value="success" v-html="success"
                   class="white--text text-lg-center" transition="scale-transition">
          </v-alert>
          <v-layout row>
            <v-btn round @click="submit" color="success" large type="submit">
              Submit
            </v-btn>
          </v-layout>
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
        name: '',
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
    },
    computed: {
      progress () {
        return Math.min(100, this.password.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      }
    }
  }
</script>


<style scoped>

</style>
