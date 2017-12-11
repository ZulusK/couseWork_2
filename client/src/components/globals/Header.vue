<template>
  <header v-show="UI.isShown">
    <section
      class="hero is-small  is-transparent"
      ref="hero">
      <div class="hero-head is-primary">
        <div class="container">
          <div
            class="navbar is-primary"
            role="navigation"
            aria-label="main navigation"
            id="header"
            ref="header">
            <div class="navbar-brand ">
              <!--logo-->
              <logo-btn/>
              <!--login-->
              <login-btn @action="$emit('login')"/>
              <!--register-->
              <register-btn @action="$emit('register')"/>
              <!--logout-->
              <logout-btn @action="$emit('logout')"/>
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
    props: [
      'toggle'
    ],
    watch: {
      toggle () {
        this.UI.isShown = !this.UI.isShown;
      }
    }
  }
</script>
<style scoped lang="scss">
  .no-bg {
    background-color: transparent;
  }
</style>
