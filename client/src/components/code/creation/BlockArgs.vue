<template>
  <div>
    <b-field grouped group-multiline>
      <b-field label="Name(use in code)">
        <b-input v-model="input.value"/>
      </b-field>
      <b-field label="Field">
        <b-input v-model="input.field"/>
      </b-field>
      <b-field label="Check" expanded>
        <b-select v-model="input.check">
          <option
            v-for="type in types"
            :value="type"
            :key="type">
            {{type || "null"}}
          </option>
        </b-select>
      </b-field>
      <b-field label="Type" expanded>
        <b-select v-model="input.inputType">
          <option value="statement">
            statement
          </option>
          <option value="value">
            value
          </option>
        </b-select>
      </b-field>
      <b-field>
        <a class="button is-danger" @click.stop="$emit('remove')">
          <b-icon icon="delete"/>
        </a>
      </b-field>
    </b-field>
    <hr>
  </div>
</template>
<script>

  export default {
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: [
      "input",
      "types"
    ],
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
