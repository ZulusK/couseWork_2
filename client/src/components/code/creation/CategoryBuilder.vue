<template>
  <div class="columns is-multiline">
    <div class="column is-12 ">
      <h1 class="title has-text-centered">Manage categories of blocks</h1>
      <a class="button is-outlined is-success" @click.stop="add">
        Add
      </a>
      <a class="button is-outlined is-danger" :disabled="!selected.id" @click.stop="deleteSelected">
        Delete
      </a>
      <hr>
    </div>
    <div class="column is-6-tablet is-12-mobile">
      <b-field>
        <b-input icon="magnify" placeholder="Search" v-model="UI.filter"></b-input>
      </b-field>
      <b-table
        :selected.sync="selected"
        :paginated="true"
        perPage="5"
        focusable
        :data="filter()">
        <template slot-scope="props">
          <b-table-column label="Name" sortable field="name">
            {{props.row.name}}
          </b-table-column>
        </template>
      </b-table>
    </div>
    <div class="column is-6-tablet is-12-mobile">
      <b-field label="Name">
        <b-input v-model="selected.name" required></b-input>
      </b-field>
      <b-field :label="`Color in hue ${selected.color}`">
        <input class="slider is-fullwidth is-large is-circle"
               min="0" max="360"
               v-model="selected.color" type="range">
      </b-field>

      <a class="button is-outlined is-link" @click.stop="save">
        Save
      </a>
      <hr>
    </div>
  </div>
</template>
<script>
  import {VPL, Node} from '#/code/VPL';
  import APICode from '#/Code';
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';

  export default {
    mixins: [AuthMixin, MessageMixin],
    data () {
      return {
        selected: {},
        old: {},
        UI: {
          isLoading: false,
          filter: "",
        }
      }
    },
    watch: {
      "selected" () {
        Object.assign(this.old, this.selected)
      },
    },
    methods: {
      async createCategory () {
        try {
          const result = await APICode.category.create(this.selected);
          if (!result.data.success) {
            this.error(result.data.message || "Server error")
            return false;
          } else {
            this.success("Success updated");
            this.selected = {};
            return true;
          }
        } catch (err) {
          console.log(err)
          this.error(err.response.data.message || "Server error")
          return false;
        }
      },
      async deleteCategory () {
        try {
          const result = await APICode.category.delete(this.selected.id);
          if (!result.data.success) {
            this.error(result.data.message || "Server error")
            return false;
          } else {
            this.success("Success deleted");
            this.selected = {};
            return true;
          }
        } catch (err) {
          console.log(err)
          this.error(err.response.data.message || "Server error")
          return false;
        }
      },
      async deleteSelected () {
        this.UI.isLoading = true;
        await this.checkTimeOfTokens();
        if (this.isNotLogged()) {
          this.error('You are not authorized');
          this.UI.isLoading = false;
          return;
        }

        if (await this.deleteCategory()) {
          this.$emit('update')
        }
        this.UI.isLoading = false;
      },
      async saveCategory () {
        try {
          const result = await APICode.category.put(this.selected.id, this.updateArgs);
          if (!result.data.success) {
            this.error(result.data.message || "Server error")
            return false;
          } else {
            this.success("Success updated");
            this.selected = {};

            return true;
          }
        } catch (err) {
          console.log(err)
          this.error(err.response.data.message || "Server error")
          return false;
        }
      },
      filter () {
        if (this.model && this.model.definedCategories) {
          const reg = new RegExp(`^${this.UI.filter}.{0,}$`, 'i');
          return this
            .model
            .definedCategories
            .filter(x => reg.test(x.name))
        }
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
        // if there are no id in selected
        // user created it just now
        console.log(this.selected)
        if (!this.selected.id) {
          if (await this.createCategory()) {
            this.$emit('update');
          }
        } else {
          if (await this.saveCategory()) {
            this.$emit('update')
          } else {
            this.selected.color = this.old.color;
            this.selected.name = this.old.name;
          }
        }
        this.UI.isLoading = false;
      },
      add () {
        this.selected = {
          name: "",
          color: ""
        };
      }
    },
    computed: {
      updateArgs () {
        let args = {};
        Object.keys(this.selected).forEach(key => {
          if (this.old[key] != this.selected[key]) {
            args[key] = this.selected[key];
          }
        })
        return args;
      }
    },
    props: [
      "model"
    ],

  }
</script>
<style scoped lang="scss">
</style>
