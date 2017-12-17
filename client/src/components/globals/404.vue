<template>
  <div class="hero is-fullheight error">
    <div class="hero-body container">
      <blockquote>
        <span v-if="$route.query && $route.query.msg" v-text="$route.query.msg"></span>
        <span v-else> THIS CITY NEEDS A PAGE</span>
      </blockquote>
    </div>
  </div>
</template>
<script>

  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="scss" scoped>
  @import url(https://fonts.googleapis.com/css?family=Six+Caps:400);

  blockquote {
    quotes: "\201C" "\201D" "\2018" "\2019";
    background: rgba(14, 14, 14, 0.43);
    padding: .5em 10px;
    color: #ffffff;
    font-family: 'Six Caps';
    font-size: 100px;
    font-weight: 400;
    width: 90%;
    margin: auto;
  }

  blockquote:before {
    color: #ffffff;
    content: open-quote;
    font-size: 4em;
    line-height: .1em;
    margin-right: .25em;
    vertical-align: -.4em;
  }

  .error {
    background: url("/static/img/404.jpg") no-repeat fixed center;
    background-size: cover;
  }
</style>
