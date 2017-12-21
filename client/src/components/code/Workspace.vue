<template>
  <div ref="playground-container" class="playground-container">
    <div ref="playground" class="playground"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        blockly_container: null
      }
    },
    methods: {
      update (xml) {
        console.log('workspace updated')
        this.blockly_container.updateToolbox(xml);
      },
      run () {
        Blockly.JavaScript.addReservedWords('code');
        var code = Blockly.JavaScript.workspaceToCode(this.blockly_container);
        try {
          eval(code);
        } catch (e) {
          alert(e);
        }
      },
      init (xml) {
        this.applyResize();
        this.update(xml);
      },
      inject () {
        this.blockly_container = Blockly.inject(this.$refs['playground'],
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
      },
      handleResize () {
        var element = this.$refs['playground-container'];
        var x = 0;
        var y = 0;
        do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
        } while (element);

        this.$refs['playground'].style.left = x + 'px';
        this.$refs['playground'].style.top = y + 'px';
        this.$refs['playground'].style.width = this.$refs['playground-container'].offsetWidth + 'px';
        this.$refs['playground'].style.height = this.$refs['playground-container'].offsetHeight + 'px';
        Blockly.svgResize(this.blockly_container);

      },
      applyResize () {
        window.addEventListener('resize', this.handleResize, false);
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
      }
    },
    mounted () {
      this.inject();
    },
    beforeRouteLeave (to, from, next) {
      next();
    }
  }
</script>
<style scoped lang="scss">
  .playground {
    position: absolute;
  }

  .playground-container {
    height: 90vh;
  }
</style>

