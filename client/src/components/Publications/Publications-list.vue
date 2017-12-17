<template>
  <div class="container">
    <b-loading :active="UI.isLoading"/>
    <div class="columns is-desktop ">
      <div class="column  is-4-desktop filter-container mr-15">
        <b-collapse class="box is-fixed filter-area is-fixed-desktop"
                    :open.sync="UI.isOpenSearch">
          <p class="has-text-centered is-size-5" slot="trigger">
            Filter found {{pagination.total}}
            <b-icon :icon="UI.isOpenSearch ?'menu-down' : 'menu-up'"/>
          </p>
          <div class="is-hidden-touch">
            <hr>
            <div>
              <span class="has-text-info title">
                <b-icon
                  size="is-small"
                  class="mdi"
                  icon="tooltip-text"/>
                Title
              </span>
              <b-field>
                <b-input placeholder="Search" v-model="filters.title" @keydown.enter="load"></b-input>
                <a class="button is-info" @click.stop="load">
                  <b-icon
                    size="is-small"
                    pack="fa"
                    icon="search"
                  />
                </a>
              </b-field>
            </div>
            <hr>
            <div>
              <span class="has-text-info title">
                <b-icon
                  size="is-small"
                  class="mdi"
                  icon="label-outline"/>
                Tags
              </span>
              <b-field label="Find publications with next tags">
                <b-taginput
                  v-model="filters.tags"
                  type="is-primary" attached>
                </b-taginput>
              </b-field>
            </div>
          </div>
          <div class="is-hidden-desktop">
            <b-tabs v-model="UI.activeTab" position="is-centered">
              <b-tab-item label="Title" icon="tooltip-text" class="container">
                <b-field>
                  <b-input placeholder="Search" v-model="filters.title"></b-input>
                  <a class="button is-info" @click.stop="load">
                    <b-icon
                      size="is-small"
                      pack="fa"
                      icon="search"
                    />
                  </a>
                </b-field>
              </b-tab-item>
              <b-tab-item label="Tags" icon="label">
                <b-field label="Find publications, that contain next tags">
                  <b-taginput
                    v-model="filters.tags"
                    type="is-primary" attached>
                  </b-taginput>
                </b-field>
              </b-tab-item>
            </b-tabs>
          </div>
        </b-collapse>
      </div>
      <div class="column is-9-desktop">
        <div v-for="(item, i) in items"
             class="mb-15"
             :key="item.title">
          <publication-card-prev
            class="interactive-item"
            :item="item"
            :author="authors[item.author]"/>
        </div>
      </div>
    </div>
    <div class="column is-6-tablet is-offset-3-tablet">
      <b-pagination
        v-if="items.length>0"
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
  import BIcon from "../../../node_modules/buefy/src/components/icon/Icon.vue";

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
      BIcon,
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
    },
    methods: {
      async load () {
        this.UI.isLoading = true;
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
          const tags = JSON.parse(str);
          if (!Array.isArray(tags)) {
            return [tags];
          }
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
      this.changeFilters(this.$route);
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
  @media screen and (min-width: 1024px) {
    .is-fixed-desktop {
      /*position: fixed;*/
    }
  }

  .interactive-item {
    transition: transform 0.4s;

  }

  .interactive-item:hover {
    transform: scale(0.98, 0.98); /* Standard syntax */
  }
</style>
