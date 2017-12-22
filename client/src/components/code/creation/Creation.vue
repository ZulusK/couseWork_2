<template>
  <div>
    <div class="container is-fluid columns is-desktop" v-if="isAdmin()">
      <div class="column is-6-desktop ">
        <b-tabs class="box slide"
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
            <block-builder
              @update="updateBlock"
              :model.sync="model"/>
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="column is-6-desktop ">
        <a class="button is-success is-medium" @click="runCode">
          <span>Run code</span>
          <b-icon icon="rocket"/>
        </a>
        <a class="button is-primary is-medium" @click="clearTerminal">
          <span>Clear console</span>
          <b-icon icon="delete"/>
        </a>
        <workspace
          ref="workspace"
          class="box"
          :resize="false"
          :height="'70vh'"
          :width="'900px'"/>
        <terminal
          :env="env"
          ref="terminal"/>
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
  import CodeEnv from '#/CodeEnv';
  import Terminal from '%/code/Terminal'

  export default {
    mixins: [AuthMixin, MessageMixin],
    components: {
      BlockBuilder,
      CategoryBuilder,
      Workspace,
      Terminal
    },
    data () {
      return {
        env: new CodeEnv(),
        toolbox: null,
        model: {
          definedCategories: null,
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
      updateBlock (event) {
        this.loadDefinedCategories();
      },
      initWorkspace () {
        this.toolbox = new VPL();
        this.toolbox.buildTree(this.model.definedCategories);
        this.updateWorkspace();
      },
      updateWorkspace () {
        this.$refs.workspace.update(this.toolbox.toXML())
      },
      clearTerminal () {
        this.env.clearTerminal();
      },
      runCode () {
        let code = this.$refs.workspace.getCodeJS();
        code.split('\n').forEach(x => this.env.writeToTerminal(x))
        try {
          eval(code);
        } catch (e) {
          this.error(e.message)
        }
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
  .slide {
    heigth: 70vh;
  }
</style>
