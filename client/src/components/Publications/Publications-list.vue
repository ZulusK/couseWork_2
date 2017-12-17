<template>
  <section class="container">
    <br>
    <b-loading :active="UI.isLoading"/>
    <div class="columns is-tablet is-multiline">
      <div class="column
      is-offset-1-tablet is-10-tablet
      is-offset-2-desktop is-8-desktop"
           v-for="(item, i) in items"
           :key="item.title">
        <publication-card-prev
          :item="item"
          :author="authors[item.author]"/>
      </div>
    </div>
  </section>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';
  import APIPublication from '#/Publications';
  import APIUsers from '#/Users';
  import PublicationCardPrev from '%/Publications/Publication-card-prev'

  export default {
    mixins: [AuthMixin, MessageMixin],
    data () {
      return {
        UI: {
          isLoading: false
        },
        filters: {
          page: 1,
          limit: 10,
          title: "",
          tags: [],
          author: ""
        },
        items: [],
        authors: {}
      }
    },
    components: {
      PublicationCardPrev
    },
    watch: {
      items () {
        if (this.items.length == 0) {
          this.error('No publications found')
        }
      }
    },
    methods: {
      async load () {
        this.UI.isLoading = true;
        console.log('load')
        try {
          const response = await APIPublication.load(this.filters);
          if (response.data.success) {
            this.items = response.data.items;
          }
        } catch (err) {
          this.error(err.response.message || err.message);
        }
        this.loadAuthors();
        this.UI.isLoading = false;
      },
      loadAuthors () {
        this.items.forEach(async p => {
          await this.getAuthor(p.author);
        })
      },
      async loadAuthor (id) {
        if (!id) {
          this.authors[id] = this.emptyAuthor;
        } else {
          try {
            const result = await APIUsers.get({id: id});
            if (result.data.success && result.data.items[0]) {
              this.authors[id] = result.data.items[0];
            } else {
              this.authors[id] = this.emptyAuthor;
            }
          } catch (err) {
            this.authors[id] = this.emptyAuthor;
          }
        }
      },
      async getAuthor (id) {
        if (!this.authors[id]) {
          await this.loadAuthor(id);
        }
        return this.authors[id];
      }
    },
    computed: {
      emptyAuthor () {
        return {
          name: "Unknown",
          avatar: "/static/img/placeholder.png"
        }
      }
    },
    props: [],
    async created () {
      console.log('created')
      await this.load();
    },
    async beforeRouteUpdate (to, from, next) {
      console.log('before update router')
      this.filters = {
        title: to.query.title || this.filters.title,
        author: to.query.author || this.filters.author,
        tags: to.query.tags || this.filters.tags,
        page: Number(to.query.page) || this.filters.page,
        limit: Number(to.query.limit) || this.filters.limit,
      }
      await this.load()
      next()
    }
  }
</script>
<style scoped lang="scss">
</style>
