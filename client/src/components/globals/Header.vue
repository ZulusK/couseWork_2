<template>
  <header v-show="UI.isShown">
    <section
      class="hero is-small is-primary"
      ref="hero">
      <div class="hero-head">
        <div
          class="navbar"
          role="navigation"
          aria-label="main navigation"
          id="header"
          ref="header">
          <div class="navbar-brand ">
            <!--logo-->
            <logo-btn/>
            <!--login-->
            <login-btn @action="$emit('login')"/>
            <button
              class="button navbar-burger is-amber is-left"
              data-target="menu"
              ref="burger"
              @click="showAllMenu()"
              v-ripple>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>
<script>
  import LogoBtn from '%/globals/btns/Logo';
  import LoginBtn from '%/globals/btns/Login';
  import RegisterBtn from '%/globals/btns/Register';
  import LogoutBtn from '%/globals/btns/Logout';

  export default {
    components: {
      LogoBtn,
      LoginBtn,
      LogoutBtn,
      RegisterBtn
    },
    data () {
      return {
        UI: {
          isShown: true
        }
      }
    },
    methods: {},
    computed: {},
    props: [
      'toggle'
    ],
    created: {},
    watch: {
      toggle () {
        this.UI.isShown = !this.UI.isShown;
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
