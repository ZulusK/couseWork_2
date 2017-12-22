<template>
  <div>
    <div class="container is-fluid columns is-desktop" v-if="isAdmin()">
      <b-tabs class="box column is-6-desktop"
              size="is-medium"
              position="is-left"
              type="is-toggle">
        <b-tab-item label="Category">
          <category-builder
            @update="updateCategory"
            :model.sync="model"
          />
        </b-tab-item>
        <b-tab-item label="Block">
          <block-builder/>
        </b-tab-item>
      </b-tabs>
      <div class="column is-6-desktop">
        <workspace
          ref="workspace"
          class="box" :heigth="'900px'" :resize="true"
          :width="'800px'"/>
      </div>
    </div>
    <div v-else class="hero">
      <div class="hero-body container">
        <div class="notification is-danger">
          <h1 class="is-size-1">
            <b-icon
              size="is-large"
              icon="alert-decagram"/>
            Forbidden
          </h1>
          <p class="is-size-4">You haven't permission to be there, login or go away</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';
  import BlockBuilder from './BlockBuilder';
  import CategoryBuilder from './CategoryBuilder';
  import Workspace from '%/code/Workspace';
  import {VPL, Node} from '#/code/VPL';
  import APICode from '#/Code';
  import MessageMixin from '%/Other/MessageMixin';

  export default {
    mixins: [AuthMixin, MessageMixin],
    components: {
      BlockBuilder,
      CategoryBuilder,
      Workspace
    },
    data () {
      return {
        toolbox: null,
        model: {
          definedCategories: null,
          cNode: null,
          bNode: null,
          newCategory: {name: "NEW CATEGORY"},
          newBlock: {}
        }
      }
    },
    methods: {
      loadDefinedCategories () {
        APICode
          .get()
          .then(result => {
            console.log(result.data.items)
            if (result.data.success) return result.data.items;
            else throw {response: result};
          })
          .then(item => {
            this.model.definedCategories = item;
            console.log('blocks loaded');
            if (!this.toolbox) {
              //init workspace
              this.$refs.workspace.init();
            }
            this.initWorkspace();
          })
          .catch(err => {
            console.log(err)
            this.error(err.response ? err.response.data.message : err.message);
          })
      },
      updateCategory (event) {
        this.loadDefinedCategories();
      },
      initWorkspace () {
        this.toolbox = new VPL();
        this.toolbox.buildTree(this.model.definedCategories);
        //append new category
        this.cNode = this.toolbox.createCategory(this.model.newCategory);
        this.toolbox.append(this.cNode);

        //append tmp category
        const tmp = this.toolbox.createCategory({name: 'NEW BLOCKS', color: '360'})
        this.model.bNode = this.toolbox.createBlock(this.model.newBlock);
        this.toolbox.append(tmp)
        //append new block to tmp category
        tmp.append(this.model.bNode);

        this.updateWorkspace();
      },
      updateWorkspace () {
        this.$refs.workspace.update(this.toolbox.toXML())
      }
    },
    computed: {},
    props: [],
    created () {
      if (!this.isAdmin()) {
        this.$router.push({name: 'Root'})
      }
    },
    mounted () {
      this.loadDefinedCategories();
    }
  }
</script>
<style scoped lang="scss">
</style>
