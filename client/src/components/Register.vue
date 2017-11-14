/* eslint-disable */
<template>
  <div>
    <h1>register</h1>
    <input
      type="text"
      name="username"
      v-model="username"
      placeholder="username"/>
    <br>
    <input
      type="password"
      name="username"
      v-model="password"
      placeholder="password"/>
    <br>
    <button
      @click="register"
    >Register
    </button>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/Authentication'

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async register () {
          const response = await AuthenticationService.register({
            username: this.username,
            password: this.password,
            name: 'user',
          })
          cosnole.log(response.data);
      }
    }
  }
</script>

<style scoped>

</style>
