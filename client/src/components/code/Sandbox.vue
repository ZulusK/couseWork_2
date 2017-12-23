<template>
  <div class="sandbox">
    <div class="columns is-multiline is-desktop ">
      <div class="column is-4-desktop is-12-mobile ">
        <div class=" mb-20">
          <a class="button is-success is-medium" @click="runCode">
            <span>Run code</span>
            <b-icon icon="rocket"/>
          </a>
          <a class="button is-primary is-medium" @click="clearTerminal">
            <span>Clear console</span>
            <b-icon icon="delete"/>
          </a>
          <a class="button is-link is-medium" @click="loadDefinedCategories">
            <span>Refresh</span>
            <b-icon icon="refresh"/>
          </a>
          <terminal
            :env="env"
            ref="terminal"/>
        </div>
        <sandbox-controls
          :categories="definedCategories||[]"
          @disableCategory="disableCategory"
          @enableCategory="enableCategory"
          @enableBlock="enableBlock"
          @disableBlock="disableBlock"/>
      </div>
      <div class="column is-12-tablet is-8-desktop">
        <workspace
          ref="workspace"
          class="box"
          :resize="false"
          :height="'70vh'"
          :width="'900px'"/>
      </div>
    </div>
    <br>
  </div>
</template>
<script>
  import Workspace from './Workspace';
  import SandboxControls from './SandboxControls';
  import APICode from '#/Code';
  import MessageMixin from '%/Other/MessageMixin';
  import {VPL, Node} from '#/code/VPL';
  import Terminal from '%/code/Terminal'
  import CodeEnv from '#/CodeEnv';

  export default {
    mixins: [MessageMixin],
    components: {
      Workspace,
      SandboxControls,
      Terminal

    },
    data () {
      return {
        env: new CodeEnv(),
        toolbox: null,
        definedCategories: null,
      }
    },
    methods: {
      usedBlocks(){
        let b=this.$refs.workspace.usedBlocks();
        this.$refs.workspace.clear();
        this.$refs.workspace.load(b);
        return b;
      },
      disableCategory (event) {
        let c = this.toolbox.get(this.toolbox.compareBy('name', event.category.name));
        if (c) {
          this.toolbox.remove(c);
          this.updateWorkspace();
        }
      },
      enableCategory (event) {
        let c = this.toolbox.get(this.toolbox.compareBy('name', event.category.name));
        if (!c) {
          c = this.toolbox.createCategory(event.category);
          this.toolbox.append(c);
        } else {
          c.clear();
        }
        event.blocks.forEach(block =>
          c.append(this.toolbox.createBlock(block))
        )
        this.updateWorkspace();
      },
      enableBlock (event) {
        let c = this.toolbox.get(this.toolbox.compareBy('name', event.category.name));
        if (!c) {
          c = this.toolbox.createCategory(event.category);
          this.toolbox.append(c);
        }
        if (!c.get(this.toolbox.compareBy('id', event.block.id))) {
          c.append(this.toolbox.createBlock(event.block));
          this.updateWorkspace();
        }
      },
      disableBlock (event) {
        let c = this.toolbox.get(this.toolbox.compareBy('name', event.category.name));
        if (c) {
          let n = c.get(this.toolbox.compareBy('id', event.block.id))
          if (n && c.remove(n)) {
            if (c.isEmpty()) {
              this.toolbox.remove(c)
            }
            this.updateWorkspace();
          }
        }
      },
      loadDefinedCategories () {
        APICode
          .get()
          .then(result => {
            if (result.data.success) return result.data.items;
            else throw {response: result};
          })
          .then(item => {
            this.definedCategories = item;
            console.log('blocks loaded');
            if (!this.toolbox) {
              this.$refs.workspace.init();
            }
            this.initWorkspace();
          })
          .catch(err => {
            console.log(err)
            this.error(err.response ? err.response.data.message : err.message);
          })
      },
      initWorkspace () {
        this.toolbox = new VPL(this.definedCategories)
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
        console.log(code)
        try {
          eval(code);
        } catch (e) {
          this.error(e)
        }
      }
    },
    computed: {},
    props: [],
    created () {
      this.loadDefinedCategories();
    },
  }
</script>
<style scoped lang="scss">
  .sandbox {
    margin: auto;
    width: 90vw;
  }

  .terminal {
    box-sizing: content-box;
  }
</style>
