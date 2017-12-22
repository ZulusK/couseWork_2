<template>
  <div>
    <b-loading :active="UI.isLoading"/>
    <div class="columns is-multiline">
      <h1 class="subtitle">Create new program block</h1>
      <a class="button is-outlined is-link" @click.stop="save">
        Save
      </a>
      <hr>
      <b-field label="Name">
        <!--<b-input v-model="blocks.name" required/>-->
      </b-field>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        UI: {
          isLoading: false
        }
      }
    },
    methods: {},
    computed: {},
    props: [],
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
