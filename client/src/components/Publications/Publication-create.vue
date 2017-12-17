<template>
  <div>
    <div v-if="$store.getters.isLogged()">

    </div>
    <div v-else class="hero">
      <div class="hero-body container">
        <div class="notification is-danger">
          <h1 class="is-size-1">
            <b-icon
              size="is-large"
              icon="alert-decagram"/>
            Attention
          </h1>
          <p class="is-size-4">You need to log in, if you wish to continue</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';

  export default {
    mixins: [AuthMixin, MessageMixin],
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: [],
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
