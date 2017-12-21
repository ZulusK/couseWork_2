<template>
<span class="box">
  <b-collapse class="panel " :open.sync="UI.isControlsOpen">
    <p class="panel-heading has-text-centered"
       slot="trigger" v-ripple>
      <span>Workspace</span>
      <b-icon :icon="!UI.isOpen?'menu-down' : 'menu-up'"/>
    </p>
     <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-small"
               type="search" placeholder="search"
               v-model="model.filter">
        <span class="icon is-small is-left">
        <i class="fa fa-search"></i>
      </span>
      </p>
    </div>
     <div class="panel-block">
      <b-field grouped group-multiline>
        <b-select v-model="model.perPage"
                  :disabled="!model.isPaginated"
                  expanded>
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
        </b-select>
        <div class="control is-flex">
          <b-switch v-model="model.isPaginated"
                    type="is-twitter">
            Paginated: {{UI.isPaginated}}
          </b-switch>
          <b-switch
            v-model="model.onlySelected"
            type="is-twitter">
            Show selected
          </b-switch>
        </div>
      </b-field>
    </div>
     </b-collapse>
  <b-tabs size="is-small" position="is-centered" v-if="categories">
    <b-tab-item v-for="(category,index) in categories" :label="category.name" :key="index">
    <blocks-table
      :category="category"
      :ref="`table-${category.name}`"
      :model.sync="model"
      @enableCategory="$emit('enableCategory',$event)"
      @disableCategory="$emit('disableCategory',$event)"
      @enableBlock="$emit('enableBlock',$event)"
      @disableBlock="$emit('disableBlock',$event)"
    />
    </b-tab-item>
  </b-tabs>
  <a class="button is-twitter is-outlined is-fullwidth" @click.stop="restoreDefault">
    <span>Default</span>
    <b-icon icon="backup-restore"/>
  </a>
</span>
</template>
<script>
  import BlocksTable from '%/code/BlocksTable';

  export default {
    components: {
      BlocksTable
    },
    data () {
      return {
        UI: {
          isControlsOpen: true
        },
        model: {
          filter: "",
          isPaginated: true,
          perPage: 5,
          onlySelected: false
        }
      }
    },
    methods: {
      restoreDefault () {
        this.categories.forEach(c => {
          const name = `table-${c.name}`;
          this.$refs[name][0].selectDefault();
        })
      }
    },
    computed: {},
    props: {
      categories: {
        default: []
      }
    },
    watch: {
      "model.isPaginated" () {
        console.log(this.model)
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
