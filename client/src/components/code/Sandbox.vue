<template>
  <div class="sandbox">
    <workspace height="800px" width="100%">
      <block type="controls_if"></block>
      <block type="controls_repeat_ext"></block>
      <block type="logic_compare"></block>
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="text"></block>
      <block type="text_print"></block>
    </workspace>
  </div>
</template>
<script>
  import Workspace from '%/code/Workspace';

  export default {
    components: {
      Workspace
    },
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: [],
    created () {

    }
  }
</script>
<style scoped lang="scss">
  .sandbox {
    box-sizing: border-box;
    position: relative;
    margin: auto;
    width: 95vw;
  }
</style>
