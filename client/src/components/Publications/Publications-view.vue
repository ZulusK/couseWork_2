<template>
  <div class="container" v-if="publication">
    <div class="ma-15 has-text-right" v-if="allowDeleting">
      <a class="button is-large is-danger" v-ripple @click.stop="remove">
        <span>Delete</span>
        <b-icon
          icon="delete"/>
      </a>
    </div>
    <publication :publication="publication" :author="author"/>
  </div>
</template>
<script>
  import Globals from '#/globals';
  import Publication from '%/Publications/Publication';
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';
  import APIUsers from '#/Users';
  import APIPublications from '#/Publications';

  export default {
    mixins: [AuthMixin, MessageMixin],
    components: {
      Publication
    },
    data () {
      return {
        id: null,
        publication: {},
        author: {}
      }
    },
    methods: {
      confirmRemove () {
        return true;
        return window.confirm('Do you really want to remove this publication?');
      },
      async remove () {
        if (this.confirmRemove()) {
          await this.checkTimeOfTokens();
          if (this.isNotLogged()) {
            this.error('You are not logged. Please, login to continue');
            return;
          }
          try {
            const result = await APIPublications.remove(this.publication.id);
            if (result.data.success) {
              this.success('Successfully deleted');
              this.$router.push({name: 'Publications-list'});
            } else {
              this.error(result.data.message || "Remove: server says 'no'");
            }
          } catch (e) {
            this.error(e.response.data.message || e.message);
          }
        }
      },
      loadAuthor: async function () {
        try {
          const result = await APIUsers.load({id: this.publication.author});
          if (result.data.success && result.data.items[0]) {
            this.author = result.data.items[0];
          }
          console.log(this.author)
        } catch (err) {
          console.log(err)
          this.error(err.response && err.response.message ? err.response.message : err.message);
        }
      },
      changeFilters (to) {
        console.log(to.params)
        this.id = to.params ? to.params.id : undefined;
        if (!this.id) {
          this.$router.push({name: '404', query: {msg: 'Missing id of publication'}})
        }
      },
      async load () {
        try {
          const response = await APIPublications.load({id: this.id});
          if (response.data.success && response.data.items[0]) {
            this.publication = response.data.items[0];
            await this.loadAuthor();
          } else {
            this.$router.push({name: '404', query: {msg: "No such publication"}})
          }
        } catch (err) {
          console.log(err)
          this.error(err.response && err.response.message ? err.response.message : err.message);
          this.$router.push({name: '500', query: {msg: "Cannot load publication"}})
        }
      }
    },
    computed: {
      allowDeleting () {
        return this.isLogged() && ((String(this.$store.state.user.id) == this.publication.author) || this.$store.state.user.isAdmin);
      }
    },
    props: [],
    async created () {
      this.changeFilters(this.$route);
      await this.load();
    },
    async beforeRouteUpdate (to, from, next) {
      this.changeFilters(to);
      await this.load();
      next()
    }
  }
</script>
<style scoped lang="scss">
</style>
