<template>
  <b-table
    @check="toggleRow"
    @check-all="toggleTable"
    :data="filter(category.blocks)"
    :paginated="model.isPaginated"
    :per-page="model.perPage"
    :current-page.sync="page"
    :checked-rows.sync="selected"
    checkable
    :opened-detailed="detailed"
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
            <strong>{{name}}:</strong>
            <em>{{props.row.name}}</em>
          </code>
          <br>
          {{props.row.description}}
        </p>
      </div>
    </template>
    <template slot="bottom-left">
      <b>Total used</b>: {{selected.length }}
    </template>
  </b-table>
</template>
<script>
  export default {
    data () {
      return {
        page: 1,
        selected: [],
        detailed: []
      }
    },
    methods: {
      toggleTable (list) {
        //all row is used/cleaned
        // if checkedList contains one element of this category
        // it also contains other
        console.log(list)
        if (list.length == 0) {
          this.selected = []
          console.log('disabled row', this.name, list.length)
          this.$emit('disableCategory', {category: this.name});
        } else {
          console.log('enabled table', this.name, list.length)
          this.$emit('enableCategory', {category: this.name});
        }
      },
      toggleRow (list, block) {
        if (block) {
          if (list.indexOf(block) < 0) {
            console.log('disable', block.name)
            this.$emit('disableBlock', {block: block, category: this.name});
          } else {
            console.log('enable', block.name)
            this.$emit('enableBlock', {block: block, category: this.name});
          }
        }
      },
      selectDefault () {
        if (this.category) {
          console.log('select default', this.name)
          this.selected = this.category.blocks.filter(x => x.default);
        }
      },
      filter () {
        const reg = new RegExp(`^${this.model.filter}.{0,}$`);
        return this
          .category
          .blocks
          .filter(x => {
            return reg.test(x.name)
              && (!this.model.onlySelected || this.selected.indexOf(x) >= 0)
          })
      },
    },
    computed: {
      name () {
        return this.category.name;
      }
    },
    props: [
      "category",
      "model"
    ],
    watch: {
      category () {
        this.selectDefault();
      }
    },
    created () {
      this.selectDefault();
    }
  }
</script>
<style scoped lang="scss">
</style>
