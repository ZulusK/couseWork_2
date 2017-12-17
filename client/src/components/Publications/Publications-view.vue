<template>
  <div class="container" v-if="publication">
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
    computed: {},
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
