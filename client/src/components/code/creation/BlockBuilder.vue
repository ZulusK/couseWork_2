<template>
  <div class="columns is-multiline">
    <b-loading :active="UI.isLoading"/>
    <div class="column is-12 ">
      <h1 class="title has-text-centered">Manage program blocks</h1>
      <a class="button is-outlined is-success" @click.stop="add">
        Add
      </a>
      <a class="button is-info is-outlined" @click.stop="save" enabled="selected.name">
        Save
      </a>
      <a class="button is-outlined is-danger" :disabled="!selected.id" @click.stop="deleteSelected">
        Delete
      </a>
      <hr>
    </div>
    <div class="column is-12">
      <b-collapse>
        <b-field>
          <b-input icon="magnify" placeholder="Search" v-model="UI.filter"></b-input>
        </b-field>
        <p class="panel-heading has-text-centered"
           slot="trigger" v-ripple>
          <span>Blocks</span>
          <b-icon :icon="!UI.isOpen?'menu-down' : 'menu-up'"/>
        </p>
        <b-tabs size="is-small" position="is-centered" class="block" v-if="model.definedCategories">
          <b-tab-item v-for="category in model.definedCategories" :label="category.name" :key="category.id">
            <b-table
              hoverable
              @select="select"
              striped
              :selected.sync="selected"
              :paginated="true"
              perPage="10"
              focusable
              :data="filter(category.blocks)">
              <template slot-scope="props">
                <b-table-column label="Name" sortable field="name">
                  {{props.row.name}}
                </b-table-column>
                <b-table-column label="Type" sortable field="type">
                  {{props.row.type}}
                </b-table-column>
              </template>
            </b-table>
          </b-tab-item>
        </b-tabs>
      </b-collapse>
    </div>
    <div class="column is-12">
      <b-field grouped group-multiline>
        <b-field label="Name" expanded>
          <b-input v-model="selected.name" required/>
        </b-field>
        <b-field label="Type" expanded required>
          <b-input v-model="selected.type"/>
        </b-field>
        <b-field label="Category" expanded>
          <b-select v-model="selected.category">
            <option
              v-for="option in model.definedCategories"
              :value="option.name"
              :key="option.id">
              {{ option.name}}
            </option>
          </b-select>
        </b-field>
      </b-field>
      <b-field grouped group-multiline>
        <b-field label="Description (tooltip)" expanded>
          <b-input maxlength="200" type="textarea" v-model="selected.tooltip"/>
        </b-field>
      </b-field>
      <template v-if="!selected.primary">
        <b-field grouped group-multiline>
          <b-field label="Top connection">
            <!--connection top-->
            <b-select v-model="selected.previousStatement">
              <option
                v-for="type in types"
                :value="type"
                :key="type">
                {{type || "null"}}
              </option>
            </b-select>
          </b-field>
          <b-field label="Bottom connection">
            <!--connection top-->
            <b-select v-model="selected.nextStatement">
              <option
                v-for="type in types"
                :value="type"
                :key="type">
                {{type || "null"}}
              </option>
            </b-select>
          </b-field>
          <b-field label="Output" v-model="selected.output">
            <!--connection top-->
            <b-select>
              <option
                v-for="type in types"
                :value="type"
                :key="type">
                {{type || "null"}}
              </option>
            </b-select>
          </b-field>
        </b-field>
        <b-collapse>
          <p class="is-link has-text-centered"
             slot="trigger" v-ripple>
            <span>Arguments</span>
            <b-icon :icon="!UI.isOpen?'menu-down' : 'menu-up'"/>
          </p>
          <template v-for="(input,i) in selected.input">
            <block-args
              @remove="selected.input.splice(i,1)"
              :input="input"
              :types="types"/>
          </template>
          <a class="button is-success" @click.stop="addInput()">
            Add args
          </a>
        </b-collapse>
        <b-field grouped>
          <b-field label="JS code" expanded>
            <b-input type="textarea" v-model="selected.code"/>
          </b-field>
        </b-field>
      </template>
    </div>
  </div>
</template>
<script>
  import {VPL, Node} from '#/code/VPL';
  import APICode from '#/Code';
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';
  import BlockArgs from './BlockArgs';

  export default {
    mixins: [AuthMixin, MessageMixin],
    components: {
      BlockArgs
    },
    data () {
      return {
        types: [
          'Number', 'Boolean', 'String', 'Array', 'Any', null
        ],
        UI: {
          isLoading: false,
          filter: ""
        },
        selected: {category: 'Other', input: []},
        old: {}
      }
    },
    methods: {
      add () {
        Object.assign(this.selected, this.old);
        this.selected = {category: 'Other', input: []};
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
        if (!this.selected.id) {
          if (await this.createBlock()) {
            this.$emit('update');
          }
        } else {
          if (await this.saveBlock()) {
            this.$emit('update')
          } else {
            this.selected.color = this.old.color;
            this.selected.name = this.old.name;
          }
        }
        this.UI.isLoading = false;
      },
      async createBlock () {
        try {
          const result = await APICode.block.create(this.selected);
          if (!result.data.success) {
            this.error(result.data.message || "Server error")
            return false;
          } else {
            this.success("Success created");
            this.selected = {};
            return true;
          }
        } catch (err) {
          console.log(err)
          this.error(err.response.data.message || "Server error")
          return false;
        }
      },
      async saveBlock () {
        try {
          const result = await APICode.block.put(this.selected.id, this.updateArgs);
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
      async deleteSelected () {
        this.UI.isLoading = true;
        await this.checkTimeOfTokens();
        if (this.isNotLogged()) {
          this.error('You are not authorized');
          this.UI.isLoading = false;
          return;
        }
        if (await this.deleteBlock()) {
          this.$emit('update')
        }
        this.UI.isLoading = false;
      },
      async deleteBlock () {
        try {
          const result = await APICode.block.delete(this.selected.id);
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
      addInput () {
        if (!this.selected.input) {
          this.selected.input = [{}]
        } else {
          this.selected.input.push({})
        }
      },
      select (block) {
        this.selected = block;
        Object.assign(this.old, block);
      },
      filter (blocks) {
        if (blocks) {
          const reg = new RegExp(`^${this.UI.filter}.{0,}$`, 'i');
          return blocks
            .filter(x => reg.test(x.name))
        }
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
        args.input = this.selected.input;
        return args;
      }
    },
    props: [
      "model"
    ],
    created () {
    }
  }
</script>
<style scoped lang="scss">
</style>
