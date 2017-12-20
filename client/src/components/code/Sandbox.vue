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
          <sandbox-controls :elements="definedBlocks"/>
        </div>
      </div>
      <div class="column is-12-tablet is-8-desktop">
        <workspace :xml="toolbox.toXML()" class="box" ref="workspace"/>
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
        output: ["to large string", 33],
      }
    },
    methods: {
      clear () {
        this.output = [];
      },
      run () {
        this.$refs.workspace.run();
      },
      async loadBlocks () {
        APIBlocks
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
      }
    },
    computed: {},
    props: [],
    created () {
      this.loadBlocks();
      this.toolbox = new Toolbox();
      this.toolbox.addCategory(new Category('Loop', '%{BKY_LOOPS_HUE}'));
      this.toolbox.getCategory('Loop').addBlock(new Block('controls_if'))
      console.log(this.toolbox.toXML())
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
