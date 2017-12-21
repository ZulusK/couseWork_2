<template>
  <span class="box">
  <b-collapse class="panel " :open.sync="UI.isOpen">
    <p class="panel-heading has-text-centered" slot="trigger" v-ripple>
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
        <b-select v-model="UI.perPage" :disabled="!UI.isPaginated" expanded>
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </b-select>
        <!--<a class="button is-info" @click.stop="update">-->
        <!--<span>Clear</span>-->
        <!--<b-icon icon="refresh"/>-->
        <!--</a>-->
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
    </b-collapse>
  <b-tabs size="is-small" position="is-centered">
    <b-tab-item v-for="(category,key,index) in elements" :label="key" :key="key">
      <b-table
        @check="(l,o)=>onChecked(l,o,key)"
        :data="filter(category.items)"
        :paginated="UI.isPaginated"
        :per-page="UI.perPage"
        :current-page.sync="category.page"
        :checked-rows.sync="used"
        checkable
        detailed
        detail-key="id"
        default-sort="name">
        <template slot-scope="props">
          <b-table-column label="name" sortable field="name">
            {{ props.row.name}}
          </b-table-column>
        </template>
        <template slot="detail" slot-scope="props">
          <div class="content">
            <p>
               <code class="is-size-5">
                 <strong>{{key}}:</strong>
                 <em>{{props.row.name}}</em>
                </code>
              <br>
                {{props.row.description}}
            </p>
          </div>
        </template>
        <template slot="bottom-left">
          <b>Total used</b>: {{ used.length }}
        </template>
      </b-table>
    </b-tab-item>
  </b-tabs>
  <a class="button is-twitter is-outlined is-fullwidth" @click.stop="restoreDefault">
    <span>Default</span>
    <b-icon icon="backup-restore"/>
  </a>

  </span>

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
      }
    },
    methods: {
      onChecked (checkedList, row, category) {
        if (!row) {
          //all row is used/cleaned
          // if checkedList contains first element of this category
          // it also contains other
          const isUsed = checkedList.indexOf(this.elements[category].items[0]) >= 0;
          this.$emit('setCategory', {used: isUsed, category: category})
        } else {
          // one block is checked
          this.$emit('setItem', {block: row, used: checkedList.indexOf(row) >= 0, category: category})
        }
      },
      update () {
        this.$emit('update')
      },
      filter (items) {
        const reg = new RegExp(`^${this.UI.filter}.{0,}$`);
        return items.filter(x => reg.test(x.name) && (!this.UI.onlyUsed || this.used.indexOf(x) >= 0))
      },
      restoreDefault () {
        this.used = [];
        Object.keys(this.elements).forEach(key => {
          this.elements[key].items.forEach(e => {
            if (e.default) {
              this.used.push(e);
            }
          })
        });
        this.$emit('restoreDefault')
      }
    },
    watch: {
      elements () {
        Object.keys(this.elements).forEach(key => {
          this.elements[key].items.forEach(e => {
            if (e.default) {
              this.used.push(e);
            }
          })
        })
      }
    },
    computed: {},
    props: {
      "elements": {
        type: Object,
        default: {}
      }
    },
    created () {
      this.restoreDefault();
    }
  }
</script>
<style scoped lang="scss">
</style>
