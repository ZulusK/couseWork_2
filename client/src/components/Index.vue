<template>
  <div class="hero is-transparent is-fullheight big">
    <div class="hero-head"></div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title big-text-2 is-uppercase has-text-primary is-mega-text">
          Welcome
        </h1>
        <h2 class="title big-text-1 has-text-white ">
          TO CODUAL.v1
        </h2>
        <router-link :to="{name:'Posts'}">
          <a class="is-primary is-large button has-text-black" ref="btn">
            DISCOVER
            <ui-ripple-ink trigger="btn" class="ripple"/>
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>

</script>
<style scoped lang="scss">
  @import "~material-colors/dist/colors";

  .big-text-2 {
    font-size: 7em;
  }

  .big-text-1 {
    font-size: 6em;
  }

  .ripple {
    color: $md-yellow-50;
  }

</style>
