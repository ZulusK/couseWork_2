<template>
  <div class="box" ref="playground-container" :style="{height: height, width:width}">
    <div id="playground" ref="playground" class="playground"></div>
    <xml id="toolbox" style="display: none">
      <slot/>
    </xml>
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
      inject () {
        this.blockly_container = Blockly.inject('playground',
          {
            media: '/static/media/',
            toolbox: document.getElementById('toolbox')
          });
      },
      handleResize () {
        console.log('resize')
        var element = this.$refs['playground-container'].offsetParent.offsetParent;
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
      },
      applyResize () {
        window.addEventListener('resize', onresize, this.handleResize);
        this.handleResize();
        Blockly.svgResize(this.blockly_container);
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
      this.applyResize();
    },
    destroyed () {

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
</style>

