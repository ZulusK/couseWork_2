<template>
  <footer>
    <section class="hero is-black ">
      <div class="container is-fullwidth has-text-centered">
      </div>
      <div class="hero-foot">
        <div class="tabs is-centered is-boxed">
          <ul>
            <li><a ref="about" v-ripple>About</a></li>
            <li><a v-ripple>
              <router-link :to="{name:'API'}">API</router-link>
            </a></li>
            <li><a v-ripple :href="instagramLink" target="_blank"><span class="icon is-medium"><i
              class="fa fa-instagram fa-2x"></i> </span></a></li>
            <li><a v-ripple><span class="icon is-medium"><i class="fa fa-github fa-2x"></i> </span></a></li>
            <li><a v-ripple :href="telegramLink" target="_blank"><span class="icon is-medium"><i
              class="fa fa-telegram fa-2x"></i> </span></a>
            </li>
            <li><a v-ripple>Help</a></li>
            <li><a v-ripple>Contacts</a></li>
          </ul>
        </div>
      </div>
    </section>
  </footer>
</template>
<script>

  export default {
    data () {
      return {
        telegramLink: 'https://telegram.me/ZulusK',
        instagramLink: 'https://www.instagram.com/idanilk'
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
