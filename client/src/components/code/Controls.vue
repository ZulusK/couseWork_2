<template>
  <b-collapse class="panel box" :open.sync="UI.isOpen">
    <p class="panel-heading has-text-centered" slot="trigger">
      <span>Workspace</span>
      <b-icon :icon="!UI.isOpen?'menu-down' : 'menu-up'"/>
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small" type="search" placeholder="search" v-model="UI.filter">
        <span class="icon is-small is-left">
        <i class="fa fa-search"></i>
      </span>
      </p>
    </div>
    <div class="panel-block">
      <b-field grouped group-multiline>
        <b-select v-model="UI.perPage" :disabled="!UI.isPaginated">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </b-select>
        <div class="control is-flex">
          <b-switch v-model="UI.isPaginated" type="is-twitter">
            Paginated: {{UI.isPaginated}}
          </b-switch>
          <b-switch v-model="UI.onlyUsed" type="is-twitter">
            Only used
          </b-switch>
        </div>
      </b-field>
    </div>
    <b-tabs size="is-small" position="is-centered">
      <b-tab-item v-for="(category,key) in elements" :label="key" :key="key">
        <b-table
          :data="filter(category.items)"
          :paginated="UI.isPaginated"
          :per-page="UI.perPage"
          :current-page.sync="category.page"
          :checked-rows.sync="used"
          checkable
          detailed
          :open-detailed="detailed"
          default-sort="name">
          <template slot-scope="props">
            <b-table-column field="name" label="name" sortable>
              {{ props.row.name}}
            </b-table-column>
          </template>
          <template slot="detail" slot-scope="props">
            <div class="content">
              <p>
                <em>{{key}}:</em>
                <strong>{{props.row.name}}</strong>
                <br>
                <code class="is-size-5">
                  {{props.row.description}}
                </code>
              </p>
            </div>
          </template>
          <template slot="bottom-left">
            <b>Total used</b>: {{ used.length }}
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>
  </b-collapse>
</template>
<script>

  export default {
    data () {
      return {
        UI: {
          isPaginated: true,
          isOpen: true,
          perPage: 5,
          filter: "",
          onlyUsed: false,
        },
        used: [],
        detailed: [],
      }
    },
    methods: {
      filter (items) {
        const reg = new RegExp(`^${this.UI.filter}.+$`);
        return items.filter(x => reg.test(x.name) && (!this.UI.onlyUsed || this.used.indexOf(x) >= 0))
      },
    },
    computed: {},
    props: {
      "elements": {
        type: Object,
        default: {}
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
