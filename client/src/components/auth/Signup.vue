<template>
  <v-layout column v-if="!$store.state.isUserLoggedIn" class="text-xs-center">
    <error-bar :show.sync="error" :message="errorMessage"/>
    <v-flex xs6 offset-xs3>
      <panel title="Join us">
        <v-form>
          <v-card-text>
            <v-container fluid>
              <v-text-field
                label="Name"
                name="name"
                v-model="credentials.name"
                :rules="[required]"
                required
              ></v-text-field>
              <v-text-field
                label="Username"
                name="username"
                v-model="credentials.username"
                :rules="[required]"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                label="Password"
                name="username"
                v-model="credentials.password"
                :rules="[required]"
                required
              ></v-text-field>
              <v-progress-linear slot="progress" :value="progress" height="5" :color="color"></v-progress-linear>
              <v-btn round @click="submit" color="success">
                Submit
              </v-btn>
            </v-container>
          </v-card-text>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
</template>
<script>

  import AuthService from '@/services/AuthService'
  import Panel from '@/components/global/Panel'
  import ErrorBar from '@/components/global/ErrorSnackbar'

  export default {
    components: {
      Panel,
      ErrorBar
    },
    data () {
      return {
        credentials: {
          username: '',
          password: '',
          name: ''
        },
        error: false,
        errorMessage: null,
        required: (value) => !!value || 'Required.'
      }
    },
    mounted () {
      //leave page
      if (this.$store.state.isUserLoggedIn) {
        this.$router.push({name: 'root'})
      }
    },
    methods: {
      async submit () {
        try {
          const areAllFieldsFilledIn = Object
            .keys(this.credentials)
            .every(key => !!this.credentials[key])
          if (!areAllFieldsFilledIn) {
            this.errorMessage = 'Please fill in all the required fields.'
            this.error = true;
            return
          }

          const response = await AuthService.signup(this.credentials);

          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUsername', response.data.username);
          this.$store.dispatch('setId', response.data.id);
//          this.$router.push({name: 'publications'})

        } catch (error) {
          this.errorMessage = error.response.data.message
          this.error = true;
        }
      }
    },
    computed: {
      progress () {
        return Math.min(100, this.credentials.password.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      }
    }
  }
</script>


<style scoped>

</style>
