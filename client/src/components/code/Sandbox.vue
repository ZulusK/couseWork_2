<template>
  <div class="sandbox">
    <div class="columns is-multiline is-desktop ">
      <div class="column is-4-desktop is-12-mobile ">
        <div>
          <sandbox-controls
            :categories="definedCategories||[]"/>
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
            this.error(err.response ? err.response.data.message : err.message);
          })
      },
      initWorkspace () {
//        this.toolbox=VPL.build
//        this.toolbox = this.updateWorkspace();
      },
    },
    computed: {},
    props: [],
    created () {
      this.loadBlocks();
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
