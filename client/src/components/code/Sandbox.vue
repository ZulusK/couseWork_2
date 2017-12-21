<template>
  <div class="sandbox">
    <div class="columns is-multiline is-desktop ">
      <div class="column is-4-desktop is-12-mobile ">
        <div>
          <sandbox-controls
            :categories="definedCategories||[]"
            @disableCategory="disableCategory"
            @enableCategory="enableCategory"
            @enableBlock="enableBlock"
            @disableBlock="disableBlock"/>
        </div>
      </div>
      <div class="column is-12-tablet is-8-desktop">
        <workspace class="box" ref="workspace"/>
      </div>
    </div>
    <br>
  </div>
</template>
<script>
  import Workspace from './Workspace';
  import SandboxControls from './SandboxControls';
  import APIBlocks from '#/Blocks';
  import MessageMixin from '%/Other/MessageMixin';
  import {VPL, Node} from '#/code/VPL';

  export default {
    mixins: [MessageMixin],
    components: {
      Workspace,
      SandboxControls
    },
    data () {
      return {
        toolbox: null,
        definedCategories: null,
      }
    },
    methods: {
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
      loadBlocks () {
        APIBlocks
          .get()
          .then(result => {
            if (result.data.success) return result.data.item;
            else throw {response: result};
          })
          .then(item => {
            this.definedCategories = item;
            console.log('blocks loaded');
            this.initWorkspace();
          })
          .catch(err => {
            console.log(err)
            this.error(err.response ? err.response.data.message : err.message);
          })
      },
      initWorkspace () {
        this.$refs.workspace.init();
        this.toolbox = new VPL(this.definedCategories)
        this.updateWorkspace();
      },
      updateWorkspace () {
        this.$refs.workspace.update(this.toolbox.toXML())
      }
    },
    computed: {},
    props: [],
    created () {
      this.loadBlocks();
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
