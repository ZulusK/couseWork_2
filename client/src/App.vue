<template>
  <div id="app" class="has-navbar-fixed-top" ref="app">
    <x-login
      :toggle="UI.login.isShown"
      @register="register()"/>
    <x-register
      :toggle="UI.register.isShown"
      @login="login()"/>
    <x-header
      :toggle="UI.header.isShown"
      @login="login"
      @register="register"
      @logout="logout"
      @fullLogout="fullLogout"
      @setHeader="setHeader"
      @setFooter="setFooter"/>
    <br>
    <router-view
      id="viewport"
      ref="viewport"
      @login="login"
      @register="register"
      @logout="logout"
      @setHeader="setHeader"
      @setFooter="setFooter"/>
    <x-footer
      id="footer"
      :toggle="UI.footer.isShown"
      @login="login"
      @register="register"
      @logout="logout"
      @setHeader="setHeader"
      @setFooter="setFooter"/>
  </div>
</template>

<script>
  import xHeader from '%/globals/Header';
  import xFooter from '%/globals/Footer';
  import xLogin from '%/auth/Login';
  import xRegister from '%/auth/Register';
  import AuthMixin from '%/Other/AuthMixin';

  export default {
    mixins: [AuthMixin],
    name: 'app',
    components: {
      xHeader,
      xFooter,
      xRegister,
      xLogin
    },
    data () {
      return {
        UI: {
          header: {
            title: "Codual",
            isShown: true
          },
          login: {
            isShown: false
          },
          register: {
            isShown: false
          },
          footer: {
            isShown: true
          }
        }
      }
    },
    methods: {
      login () {
        this.UI.login.isShown = !this.UI.login.isShown;
      },
      register () {
        this.UI.register.isShown = !this.UI.register.isShown;
      },
      setHeader () {

      },
      setFooter () {

      },
    },
  }
</script>

<style lang="scss">
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    word-wrap: break-word;
  }

  #footer {
    flex-shrink: 0;
  }

  #viewport {
    flex: 1 0 auto;
  }

  * {
    word-break: break-all;
    word-wrap: break-word;
  }

  #app {
    background-image: url('/static/img/bg-rock.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 100vw;
    min-height: 100vh;
    background-size: cover;
    display: flex;
    flex-direction: column;
  }

</style>
