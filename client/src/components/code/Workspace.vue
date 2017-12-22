<template>
  <div ref="workspace-container" class="workspace-container"
       :style="{width:width,height:height}">
    <div
      ref="workspace"
      :style="{width:width,height:height}"/>
  </div>
</template>
<script>
  export default {
    name: 'workspace',
    data () {
      return {
        blocklyWorkspace: null
      }
    },
    methods: {
      update (xml) {
        console.log('workspace updated')
        this.blocklyWorkspace.updateToolbox(xml);
        Blockly.svgResize(this.blocklyWorkspace);
      },
      getCodeJS () {
        Blockly.JavaScript.addReservedWords('code');
        var code = Blockly.JavaScript.workspaceToCode(this.blockly_container);
        return code;
      },
      init () {
        if (this.resize) this.applyResize();
        console.log('init workspace')
      },
      inject () {
        this.blocklyWorkspace = Blockly.inject(this.$refs.workspace,
          {
            grid:
              {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
              },
            zoom:
              {
                controls: true,
                wheel: false,
                startScale: 1.0,
                maxScale: 2,
                minScale: 0.3,
                scaleSpeed: 1.2
              },
            trashcan: true,
            media: '/static/media/',
            toolbox: "<xml><category name=\"Codual\"></category></xml>"
          });
        console.log('workspace injected');
      },
      handleResize () {
        var element = this.$refs['workspace-container'];
        var x = 0;
        var y = 0;
        do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
        } while (element);
        this.$refs['workspace'].style.left = x + 'px';
        this.$refs['workspace'].style.top = y + 'px';
        this.$refs['workspace'].style.width = this.$refs['workspace-container'].offsetWidth + 'px';
        this.$refs['workspace'].style.height = this.$refs['workspace-container'].offsetHeight + 'px';
        Blockly.svgResize(this.blocklyWorkspace);
      },
      applyResize () {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    },
    computed: {},
    props: {
      width: {
        default: '800px'
      },
      height: {
        default: '600px'
      },
      resize: {
        default: false
      }
    },
    mounted () {
      this.inject();
    }
  }
</script>
<style scoped lang="scss">
  .workspace {
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 500;
  }

  .workspace-container {
    /*height: 85vh;*/
    padding: 0;
    margin: 0;
  }
</style>
