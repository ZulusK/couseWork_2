<template>
  <div>
    <div class="container is-fluid" v-if="isAdmin()">
      <b-tabs class="box " size="is-medium" position="is-left" type="is-toggle">
        <b-tab-item label="Category">
          <category-builder/>
        </b-tab-item>
        <b-tab-item label="Block">
          <block-builder/>
        </b-tab-item>
      </b-tabs>
    </div>
    <div v-else class="hero">
      <div class="hero-body container">
        <div class="notification is-danger">
          <h1 class="is-size-1">
            <b-icon
              size="is-large"
              icon="alert-decagram"/>
            Forbidden
          </h1>
          <p class="is-size-4">You haven't permission to be there, login or go away</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';
  import BlockBuilder from './BlockBuilder';
  import CategoryBuilder from './CategoryBuilder';

  export default {
    mixins: [AuthMixin],
    components: {
      BlockBuilder,
      CategoryBuilder
    },
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: [],
    created () {
      if (!this.isAdmin()) {
        this.$router.push({name: 'Root'})
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
