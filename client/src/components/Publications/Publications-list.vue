<template>
  <div class="container">
    <br>
    <div class="columns is-multiline">
      <b-collapse
        class="box column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop"
        :open.sync="UI.isOpenSearch">
        <p class="has-text-centered is-size-5" slot="trigger">
          Active filters. Found {{pagination.total}}
          <b-icon :icon="UI.isOpenSearch ?
                        'menu-down' : 'menu-up'">
          </b-icon>
        </p>
        <b-tabs v-model="UI.activeTab" position="is-centered">
          <b-tab-item label="Title" icon="format-title">
            <b-field label="Find publication by title">
              <b-input placeholder="Search" v-model="filters.title"></b-input>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Tags" icon="label">
            <b-field label="Find publications with next tags">
              <b-taginput
                v-model="filters.tags"
                type="is-primary" attached>
              </b-taginput>
            </b-field>
          </b-tab-item>
        </b-tabs>
      </b-collapse>
      <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">

      </div>
      <div class="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop"
           v-for="(item, i) in items"
           :key="item.title">
        <publication-card-prev
          :item="item"
          :author="authors[item.author]"/>
      </div>
    </div>
    <b-loading :active="UI.isLoading"/>
    <div class="column is-6-tablet is-offset-3-tablet">
      <b-pagination
        class="pagination"
        :per-page="pagination.limit"
        :total="pagination.total"
        :current.sync="filters.page"
        size="is-medium"
        order="is-centered"/>
    </div>
  </div>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';
  import APIPublication from '#/Publications';
  import APIUsers from '#/Users';
  import PublicationCardPrev from '%/Publications/Publication-card-prev'
  import Globals from '#/globals';

  export default {
    mixins: [AuthMixin, MessageMixin],
    data () {
      return {
        UI: {
          isOpenSearch: false,
          isLoading: false,
          activeTab: 1,
        },
        pagination: {
          total: 0,
          limit: 0
        },
        filters: {
          page: 1,
          limit: Globals.PAGINATION_LIMIT,
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
      },
      async "filters.page" () {
        await this.load();
      },
      async "filters.tags" () {
        await this.load();
      },
      async "filters.title" () {
        await this.load();
      },
    },
    methods: {
      async load () {
        this.UI.isLoading = true;
        console.log('load')
        try {
          console.log(this.filters, 1)
          const response = await APIPublication.load(this.filters);
          if (response.data.success) {
            const items = response.data.items;
            this.pagination.total = response.data.total;
            this.pagination.limit = response.data.limit;
            await this.loadAuthors(items);
            this.items = items;
          }
        } catch (err) {
          this.error(err.response.message || err.message);
        }
        this.UI.isLoading = false;
      },
      async loadAuthors (arr) {
        for (let key in arr) {
          await this.getAuthor(arr[key].author);
        }
      },
      async loadAuthor (id) {
        if (!id) {
          this.authors[id] = this.emptyAuthor;
        } else {
          try {
            const result = await APIUsers.load({id: id});
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
      },
      getTags (str) {
        try {
          return JSON.parse(str);
        } catch (e) {
          return undefined;
        }
      },
      changeFilters (to) {
        let newFilters = {};
        if (!to.query) return;
        newFilters.title = to.query.title || this.filters.title;
        newFilters.author = to.query.author || this.filters.author;
        newFilters.tags = this.getTags(to.query.tags) || this.filters.tags;
        newFilters.page = Number(to.query.page) || this.filters.page;
        newFilters.limit = Number(to.query.limit) || this.filters.limit;
        this.filters = newFilters;

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
      this.changeFilters(this.$router);
      await this.load();
    },
    async beforeRouteUpdate (to, from, next) {
      console.log('before update router')
      this.changeFilters(to);
      await this.load();
      next()
    }
  }
</script>
<style scoped lang="scss">
</style>
