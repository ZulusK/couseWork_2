<template>
  <div class="sandbox">
    <div class="columns is-multiline is-desktop ">
      <div class="column is-4-desktop is-12-mobile ">
        <div class=" mb-20 terminal">
          <a class="button is-success is-medium" @click="run">
            <span>Run code</span>
            <b-icon icon="rocket"/>
          </a>
          <a class="button is-primary is-medium" @click="clear">
            <span>Clear console</span>
            <b-icon icon="delete"/>
          </a>
          <div class="notification is-black ">
            <p class="is-size-3">Output:</p>
            <p v-for="(line,index) in output">
              ...{{line}}
            </p>
          </div>
        </div>
        <div class="" v-if="definedBlocks">
          <sandbox-controls
            :elements="definedBlocks"
            @update="loadBlocks"
            @setItem="toggleBlock"
            @setCategory="toggleCategory"
            @restoreDefault="initWorkspace"/>
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
  import Workspace from '%/code/Workspace';
  import SandboxControls from '%/code/Controls';
  import APIBlocks from '#/Blocks';
  import MessageMixin from '%/Other/MessageMixin';
  import {Toolbox, Category, Block} from '#/blocks/CodualBlocks';

  export default {
    components: {
      Workspace,
      SandboxControls
    },
    mixins: [MessageMixin],
    data () {
      return {
        toolbox: null,
        definedBlocks: null,
        output: [],
      }
    },
    methods: {
      toggleCategory (event) {
        let cat = this.toolbox.getCategory(event.category);
        if (event.used) {
          if (!cat) {
            cat = this.addCategory(event.category, this.toolbox);
          }
          for (let block of this.definedBlocks[event.category].items) {
            this.addBlock2Category(block, cat);
          }
          this.updateWorkspace();
        } else {
          console.log(event.category)
          this.toolbox.removeCategory(event.category);
          this.updateWorkspace();
        }
      },
      toggleBlock (event) {
        let cat = this.toolbox.getCategory(event.category);
        if (event.used) {
          if (!cat) {
            cat = this.addCategory(event.category, this.toolbox);
          }
          if (this.addBlock2Category(event.block, cat)) {
            this.updateWorkspace();
          }
        } else {
          if (cat && cat.containsBlock(event.block.id)) {
            cat.removeBlock(event.block.id);
            if (cat.size() == 0) {
              this.toolbox.removeCategory(cat.attrs.name);
            }
            this.updateWorkspace();
          }
        }

      },
      initWorkspace () {
        const newToolbox = new Toolbox();
        for (let key in this.definedBlocks) {
          this.addDefaultBlocks2Category(this.addCategory(key, newToolbox));
        }
        this.toolbox = newToolbox;
        this.updateWorkspace();
      },
      updateWorkspace () {
        console.log(this.toolbox.toXML())
        this.$refs.workspace.init(this.toolbox.toXML());
      },
      addBlock2Category (block, cat) {
        if (!cat.containsBlock(block.id)) {
          cat.addBlock(new Block(block.type, block.id));
          return true;
        } else {
          return false;
        }
      },
      addDefaultBlocks2Category (cat) {
        // add blocks, marked as default
        for (let block of this.definedBlocks[cat.attrs.name].items) {
          if (block.default) {
            this.addBlock2Category(block, cat);
          }
        }
      },
      addCategory (name, toolbox) {
        if (!toolbox.containsCategory(name)) {
          let c = new Category(name, this.definedBlocks[name].color, this.definedBlocks[name].custom);
          toolbox.addCategory(c);
          return c;
        }
      },
      clear () {
        this.output = [];
      },
      run () {
        this.$refs.workspace.run();
      },
      loadBlocks () {
        return APIBlocks
          .get()
          .then(result => {
            if (result.data.success) return result.data.item;
            else throw {response: result};
          })
          .then(item => {
            this.definedBlocks = item;
          })
          .catch(err => {
            this.error(err.response.data.message || err.message);
          })
      },
      
    },
    computed: {
      xml () {
        return this.toolbox.toXML();
      }
    },
    props: [],
    async mounted () {
//      await this.loadBlocks();
//      this.initWorkspace();
      this.testCreate()
    }
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
