<template>
  <b-modal :active.sync="UI.isShown"
           class="modal"
           scroll="keep"
           animation="zoom-out"
           width="400px">
    <div class="box has-text-centered">
      <figure class="avatar">
        <template v-if="!credentials.email || credentials.email.length==0">
          <img src="/static/img/user.png" width="140px" class="avatar-image" alt=""/>
        </template>
        <template v-else>
          <v-gravatar
            class="avatar-image"
            :email="credentials.email||''"
            alt="" :size="140"
            ref="gavatar"/>
        </template>
      </figure>
      <h3 class="title has-text-grey">Login</h3>
      <p class="subtitle has-text-grey">Please login to proceed.</p>
      <form class="has-text-left">
        <b-field
          :type="errors.has('email') ? 'is-danger': credentials.email?'is-success':''"
          :message="errors.has('email') ? errors.first('email') : ''">
          <b-input
            icon="email"
            name="email"
            placeholder="Your email"
            v-model="credentials.email"
            v-validate="'required|auth.login.email'"
            type="email">
          </b-input>
        </b-field>
        <b-field
          :type="errors.has('password') ? 'is-danger': credentials.password?'is-success':''"
          :message="errors.has('password') ? errors.first('password') : ''">
          <b-input
            icon="lock"
            name="password"
            placeholder="Your password"
            v-model="credentials.password"
            v-validate="'required|auth.login.password'"
            password-reveal
            type="password">
          </b-input>
        </b-field>
      </form>
      <br>
      <a class="button is-block is-info is-medium"
         ref="btn"
         v-ripple
         @click="login()">
        Login
      </a>
      <hr>
      <!--<a class="button is-facebook is-medium"-->
         <!--ref="btn"-->
         <!--v-ripple-->
         <!--@click="loginFacebook()">-->
        <!--<b-icon-->
          <!--type="is-white"-->
          <!--pack="mdi"-->
          <!--icon="facebook"-->
          <!--size="is-middle">-->
        <!--</b-icon>-->
        <!--<div>Facebook</div>-->
      <!--</a>-->
      <br/>
      <br/>

      <p class="has-text-grey">
        <a @click="$emit('register'); UI.isShown=false">
          Sign Up
        </a> &nbsp;·&nbsp;
        <a href="#">Forgot Password</a>
      </p>
    </div>

  </b-modal>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';

  import AuthAPI from '#/Auth';

  export default {
    mixins: [AuthMixin, MessageMixin],
    data () {
      return {
        UI: {
          isShown: false,
        },
        credentials: {
          email: "danil.kazim.99@gmail.com",
          password: 8590
        }
      }
    },
    created () {
    },
    props: [
      'toggle'
    ],
    methods: {
      async loginFacebook () {
        const app = this;
        window.authenticateCallback = function (token) {
          console.log(token, 2)
//          app.UI.isShown = false;
          window.authenticateCallback = undefined;
        };
        window.open('http://localhost:3000/api/v1/auth/facebook');
      },
      async login () {
        if (await this.$validator.validateAll()) {
          try {
            const response = await AuthAPI.login(this.credentials);
            if (response.data.success) {
              this.$store.dispatch('setToken_access', response.data.tokens.access);
              this.$store.dispatch('setToken_refresh', response.data.tokens.refresh);
              this.$store.dispatch('setUser', response.data.user);
              this.success(`Hello, ${response.data.user.name}`);
              this.UI.isShown = false;
            } else {
              this.error(response.data.message)
            }
          } catch (err) {
            this.error(err.response.status == 401 ? "Invalid credentials" : err.response.data.message || err.message);
          }
        } else {
          this.error("Not all required fields are valid");
        }
      }
    }
    ,
    watch: {
      toggle () {
        this.UI.isShown = !this.UI.isShown && this.isNotLogged();
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  .ripple {
    color: $md-amber-200;
  }

  .avatar {
    margin-top: -70px;
  }

  .avatar-image {
    background-color: white;
    border-radius: 50%;
    border: 5px white solid;
    box-sizing: content-box;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
  }

  .box {
    margin-top: 70px;
  }

  .ripple {
    color: $md-light-blue-900;
  }

  .modal {
    z-index: 1000;
  }
</style>
