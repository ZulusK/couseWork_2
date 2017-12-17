<template>
  <div class="container">
    <div class="column is-8-desktop  is-offset-2-desktop  is-12-tablet">
      <div class="box">
        <div class="content markdown-body" v-html="renderedText"/>
      </div>
    </div>
  </div>
</template>
<script>
  import API from '#/API';
  import Utils from '#/Utils';
  export default {
    data () {
      return {
        text: null
      }
    },
    methods: {
      error (msg) {
        this.$toast.open({
          duration: 5000,
          message: msg || "Something is going wrong",
          position: 'is-top',
          type: 'is-danger'
        })
      },
      async loadText () {
        try {
          const result = await API.noAuth().get('/api/v1/docs');
          if (result.data.success) {
            this.text = result.data.item;
          }
        } catch (err) {
          this.error(err.message);
        }
      }
    },
    computed: {
      renderedText () {
        return Utils.md.render(this.text || "")
      }
    },
    props: [],
    async created () {
      await this.loadText();
    },
  }
</script>
<style scoped lang="scss">
  @import '~github-markdown-css';

</style>
