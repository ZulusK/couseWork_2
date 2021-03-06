<template>
  <b-modal :active.sync="UI.isShown"
           scroll="keep"
           class="modal"
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
      <h3 class="title has-text-grey">Sign up</h3>
      <p class="subtitle has-text-grey">Join us now</p>
      <form class="has-text-left">
        <b-field
          :type="errors.has('email') ? 'is-danger': credentials.email?'is-success':''"
          :message="errors.has('email') ? errors.first('email') : ''">
          <b-input
            icon="email"
            name="email"
            placeholder="Your email"
            v-model="credentials.email"
            v-validate="'required|auth.register.email'"
            type="email">
          </b-input>
        </b-field>
        <b-field
          :type="errors.has('name') ? 'is-danger': credentials.name?'is-success':''"
          :message="errors.has('name') ? errors.first('name') : ''">
          <b-input
            icon="account"
            name="name"
            placeholder="Your name"
            v-model="credentials.name"
            v-validate="'required|auth.register.name'"
            type="text">
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
            v-validate="'required|auth.register.password'"
            password-reveal
            type="password">
          </b-input>
        </b-field>
      </form>
      <br>
      <a class="button is-block is-info is-medium"
         ref="btn"
         v-ripple
         @click="register()">
        Register
      </a>
      <br>
      <p class="has-text-grey">
        Are you already registered?
        <a @click="$emit('login'); UI.isShown=false">
          Login
        </a>
        now
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
          email: null,
          name: null,
          password: null,
        }
      }
    },
    props: [
      'toggle'
    ],
    methods: {
      async register () {
        if (await this.$validator.validateAll()) {
          try {
            const response = await AuthAPI.register(this.credentials);
            if (response.data.success) {
              this.UI.isShown = false;
              this.$store.dispatch('setToken_access', response.data.tokens.access);
              this.$store.dispatch('setToken_refresh', response.data.tokens.refresh);
              this.$store.dispatch('setUser', response.data.user);
              this.success(`Hello, ${response.data.user.name}`);
            } else {
              this.error(response.message)
            }
          } catch (err) {
            console.log(err)
            this.error(err.response.status == 401 ? "Invalid credentials" : err.response.data.message || err.message);
          }
        } else {
          this.error("Not all required fields are valid");
        }
      }
    },
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
