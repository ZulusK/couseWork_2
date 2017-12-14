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
            <div class="navbar-menu" id="menu" ref="menu">
              <div class="navbar-start">
                <publications-btn/>
              </div>
              <div class="navbar-end">
                <!--login-->
                <login-btn @action="$emit('login')"/>
                <!--register-->
                <register-btn @action="$emit('register')"/>
                <!--logout-->
                <logout-btn @action="$emit('logout')"/>
              </div>
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
  import PublicationsBtn from '%/globals/btns/Publications';

  export default {
    components: {
      LogoBtn,
      LoginBtn,
      LogoutBtn,
      RegisterBtn,
      PublicationsBtn
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
    },
    methods: {
      showAllMenu: function () {
        console.log(this.$refs.burger);
        let burger = this.$refs.burger;
        let menu = this.$refs.menu;
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
      },
    }
  }
</script>
<style scoped lang="scss">
  .no-bg {
    background-color: transparent;
  }
</style>
