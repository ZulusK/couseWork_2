<template>
  <v-content>
    <v-container>
      <error-bar :show.sync="error" :message="errorMessage"/>
      <!--<v-flex >-->
      <v-layout v-if="!$store.state.isUserLoggedIn" class="text-xs-center">
        <v-flex md10 offset-md1 lg8 offset-lg2 xl4 offset-xl4>
          <panel title="Login" color="red"
                 image="https://images.unsplash.com/photo-1495511623436-ba44aaee07cf?auto=format&fit=crop&w=1351&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D">
            <div slot="text">
              <v-form slot="text">
                <v-container add_circle_outline>
                  <v-layout column>
                    <v-flex xs10 offset-xs1>
                      <v-text-field
                        label="Username"
                        name="username"
                        v-model="credentials.username"
                        :rules="[required]"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs10 offset-xs1>
                      <v-text-field
                        type="password"
                        label="Password"
                        name="password"
                        v-model="credentials.password"
                        :rules="[required]"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-btn large @click="submit" color="success">
                        Login
                      </v-btn>
                      <v-btn large :to="{name:'root'}" color="error">
                        cancel
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </div>
          </panel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>

</template>
<script>

  import AuthService from '@/services/AuthService'
  import Panel from '@/components/global/Panel'
  import ErrorBar from '@/components/global/ErrorSnackbar'
  import VContent from "vuetify/src/components/VGrid/VContent";

  export default {
    components: {
      VContent,
      Panel,
      ErrorBar
    },
    data () {
      return {
        credentials: {
          username: null,
          password: null,
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
        const areAllFieldsFilledIn = Object
          .keys(this.credentials)
          .every(key => !!this.credentials[key])
        if (!areAllFieldsFilledIn) {
          this.errorMessage = 'Please fill in all the required fields.'
          this.error = true;
          return
        }
        try {
          const response = await AuthService.login(this.credentials);
          //set data in storage
          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUsername', response.data.username);
          this.$store.dispatch('setId', response.data.id);
          this.$router.push({name: 'publications'})
        } catch (error) {
          this.errorMessage = error.response.data.message
          this.error = true;
        }
      }
    }
  }
</script>


<style scoped>

</style>
