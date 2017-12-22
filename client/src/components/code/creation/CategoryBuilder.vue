<template>
  <div>
    <b-loading :active="UI.isLoading"/>
    <div class="columns is-multiline">
      <div class="column is-4-tablet is-offset-2-tablet is-12-mobile ">

        <h1 class="title">Manage categories of blocks</h1>
        <a class="button is-outlined is-link" @click.stop="save">
          Save
        </a>
        <hr>
        <b-field label="Name">
          <b-input v-model="category.name" required></b-input>
        </b-field>
        <b-field :label="`Color in hue ${category.color}`">
          <input class="slider is-fullwidth is-large is-circle"
                 min="0" max="360"
                 v-model="category.color" type="range">
        </b-field>
        <a class="button is-outlined is-success" @click.stop="add">
          Add
        </a>
        <hr>
      </div>
      <div class="column">
        <workspace
          ref="workspace"
          class="box" :heigth="'400px'" :resize="false"
          :width="'500px'"/>
      </div>
    </div>
  </div>
</template>
<script>
  import Workspace from '%/code/Workspace';
  import {VPL, Node} from '#/code/VPL';
  import APICode from '#/Code';
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';

  export default {
    mixins: [AuthMixin, MessageMixin],
    components: {
      Workspace
    },
    data () {
      return {
        UI: {
          isLoading: false,
        },
        category: {
          name: "",
          color: 150,
        },
        toolbox: null,
        cNode: null
      }
    },
    watch: {
      "category.name" () {
        this.cNode.attrs.name = this.category.name;
        this.updateWorkspace();

      },
      "category.color" () {
        this.cNode.attrs.colour = this.category.color;
        this.updateWorkspace();

      },
    },
    methods: {
      async saveCategory () {

      },
      async save () {
        this.UI.isLoading = true;
        //todo check validation
        //check access and refresh
        await this.checkTimeOfTokens();
        if (this.isNotLogged()) {
          this.error('You are not authorized');
          this.UI.isLoading = false;
          return;
        }
        if (!await this.saveCategory()) {
          this.UI.isLoading = false;
          return;
        } else {

        }
      },
      initWorkspace () {
        this.toolbox = new VPL();
        this.cNode = this.toolbox.createCategory(this.category);
        this.toolbox.append(this.cNode);
        this.$refs.workspace.init();
        this.updateWorkspace();
      },
      updateWorkspace () {
        console.log(this.toolbox.toXML())
        this.$refs.workspace.update(this.toolbox.toXML())
      }
    },
    computed: {},
    props: [],
    mounted () {
      this.initWorkspace();
    }
  }
</script>
<style scoped lang="scss">
</style>
