<template>
  <div>
    <h1>Signup for free</h1>
    <input
      name="name"
      placeholder="name"
      type="text"
      v-model="name"/>
    <br>
    <input
      name="username"
      placeholder="username"
      type="text"
      v-model="username"
    />
    <br>
    <input
      name="password"
      placeholder="password"
      type="password"
      v-model="password"/>
    <br>
    <div class="error" v-html="error"/>
    <div class="success" v-html="success"/>
    <button
      @click="confirm">
      signup
    </button>
  </div>
</template>

<script>
  import AuthService from '@/services/AuthService'

  export default {
    data () {
      return {
        username: '',
        password: '',
        error: null,
        success: null
      }
    },
    methods: {
      async confirm () {
        try {
          const response = await AuthService.signup({
            username: this.username,
            password: this.password,
            name: this.name
          });
          console.log(response.data);
          this.error = null;
          this.success = "created";
        } catch (error) {
          this.error = error.response.data.message;
          this.success = null;
          console.log(error);
        }
      }
    }
  }
</script>


<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }

  a {
    color: #42b983;
  }
</style>
