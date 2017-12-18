<template>
  <div class="ma-20">
    <div v-if="$store.getters.isLogged()">
      <div class="columns is-desktop">
        <div class="column is-12-mobile is-6-desktop">
          <publication-edit :publication="publication"/>
        </div>
        <div class="column is-12-mobile is-6-desktop">
          <publication-prev :author="$store.state.user" :publication="publication"/>
        </div>
      </div>
      <div class="ma-15 has-text-centered">
        <a class="button is-large is-success" v-ripple>
          <span>Save</span>
          <b-icon
            icon="checkbox-marked-circle-outline"/>
        </a>
        <a class="button is-large is-danger" v-ripple @click.stop="clear">
          <span>Clear</span>
          <b-icon
            icon="delete"/>
        </a>
      </div>
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
  import PublicationPrev from '%/Publications/Publication'
  import PublicationEdit from '%/Publications/Publication-edit-area'

  export default {
    mixins: [AuthMixin, MessageMixin],
    components: {
      PublicationPrev,
      PublicationEdit
    },
    data () {
      return {
        publication: {
          title: "",
          tags: [],
          logo: null,
          created: Date.now(),
          edited: Date.now(),
          difficult: 1,
          author: this.$store.state.user,
          description: "",
          text: ""
        }
      }
    },
    methods: {
      confirmLeave () {
        return window.confirm('Do you really want to leave? you have unsaved changes!')
      },
      confirmClear () {
        return window.confirm('Do you really want to clear?');
      },
      clear () {
        if (this.confirmClear()) {
          this.publication = this.emptyPublication;
        }
      }
    },
    computed: {
      emptyPublication () {
        return {
          title: "",
          tags: [],
          logo: null,
          created: Date.now(),
          edited: Date.now(),
          difficult: 1,
          author: this.$store.state.user,
          description: "",
          text: ""
        }
      }
    },
    props: [],
    beforeRouteLeave (to, from, next) {
      if (this.confirmLeave()) {
        next()
      } else {
        next(false)
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
