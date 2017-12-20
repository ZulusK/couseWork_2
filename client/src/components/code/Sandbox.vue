<template>
  <div class="sandbox">
    <div class="columns is-multiline is-desktop">
      <div class="column is-4-desktop is-12-mobile columns  is-multiline">
        <div class=" column is-12-desktop">
          <a class="button is-success is-medium" @click="run">
            <span>Run code</span>
            <b-icon icon="rocket"/>
          </a>
          <a class="button is-primary is-medium" @click="clear">
            <span>Clear console</span>
            <b-icon icon="delete"/>
          </a>
          <div class="notification is-black ">
            <p class="is-size-3">Output:</p>
            <p v-for="(line,index) in output">
              ...{{line}}
            </p>
          </div>
        </div>
        <div class="column is-12-desktop" v-if="blocks">
          <sandbox-controls :elements="blocks"/>
        </div>
      </div>
      <div class="column is-12-tablet is-8-desktop">
        <workspace :xml="toolbox" class="box " ref="workspace"/>
      </div>
    </div>
    <br>
  </div>
</template>
<script>
  import Workspace from '%/code/Workspace';
  import SandboxControls from '%/code/Controls';
  import APIBlocks from '#/Blocks';
  import MessageMixin from '%/Other/MessageMixin';

  export default {
    components: {
      Workspace,
      SandboxControls
    },
    mixins: [MessageMixin],
    data () {
      return {
        blocks: null,
        output: ["to large string", 33],
        toolbox: "<xml id=\"toolbox\" style=\"display: none\">\n" +
        "    <category name=\"Logic conditions\" colour=\"%{BKY_LOGIC_HUE}\">\n" +
        "      <block type=\"controls_if\"></block>\n" +
        "      <block type=\"logic_compare\"></block>\n" +
        "      <block type=\"logic_operation\"></block>\n" +
        "      <block type=\"logic_negate\"></block>\n" +
        "      <block type=\"logic_boolean\"></block>\n" +
        "      <block type=\"logic_null\"></block>\n" +
        "      <block type=\"logic_ternary\"></block>\n" +
        "    </category>\n" +
        "    <category name=\"Loop\" colour=\"%{BKY_LOOPS_HUE}\">\n" +
        "      <block type=\"controls_repeat_ext\">\n" +
        "        <value name=\"TIMES\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">10</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"controls_whileUntil\"></block>\n" +
        "      <block type=\"controls_for\">\n" +
        "        <value name=\"FROM\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "        <value name=\"TO\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">10</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "        <value name=\"BY\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"controls_forEach\"></block>\n" +
        "      <block type=\"controls_flow_statements\"></block>\n" +
        "    </category>\n" +
        "    <category name=\"Math\" colour=\"%{BKY_MATH_HUE}\">\n" +
        "      <block type=\"math_number\"></block>\n" +
        "      <block type=\"math_arithmetic\">\n" +
        "        <value name=\"A\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "        <value name=\"B\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_single\">\n" +
        "        <value name=\"NUM\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">9</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_trig\">\n" +
        "        <value name=\"NUM\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">45</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_constant\"></block>\n" +
        "      <block type=\"math_number_property\">\n" +
        "        <value name=\"NUMBER_TO_CHECK\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">0</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_round\">\n" +
        "        <value name=\"NUM\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">3.1</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_on_list\"></block>\n" +
        "      <block type=\"math_modulo\">\n" +
        "        <value name=\"DIVIDEND\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">64</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "        <value name=\"DIVISOR\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">10</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_constrain\">\n" +
        "        <value name=\"VALUE\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">50</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "        <value name=\"LOW\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "        <value name=\"HIGH\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">100</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_random_int\">\n" +
        "        <value name=\"FROM\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "        <value name=\"TO\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">100</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_random_float\"></block>\n" +
        "    </category>\n" +
        "    <category name=\"Text\" colour=\"%{BKY_TEXTS_HUE}\">\n" +
        "      <block type=\"text\"></block>\n" +
        "      <block type=\"text_join\"></block>\n" +
        "      <block type=\"text_append\">\n" +
        "        <value name=\"TEXT\">\n" +
        "          <shadow type=\"text\"></shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_length\">\n" +
        "        <value name=\"VALUE\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\">abc</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_isEmpty\">\n" +
        "        <value name=\"VALUE\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\"></field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_indexOf\">\n" +
        "        <value name=\"VALUE\">\n" +
        "          <block type=\"variables_get\">\n" +
        "            <field name=\"VAR\">{textVariable}</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "        <value name=\"FIND\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\">abc</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_charAt\">\n" +
        "        <value name=\"VALUE\">\n" +
        "          <block type=\"variables_get\">\n" +
        "            <field name=\"VAR\">{textVariable}</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_getSubstring\">\n" +
        "        <value name=\"STRING\">\n" +
        "          <block type=\"variables_get\">\n" +
        "            <field name=\"VAR\">{textVariable}</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_changeCase\">\n" +
        "        <value name=\"TEXT\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\">abc</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_trim\">\n" +
        "        <value name=\"TEXT\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\">abc</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_print\">\n" +
        "        <value name=\"TEXT\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\">abc</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"text_prompt_ext\">\n" +
        "        <value name=\"TEXT\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\">abc</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "    </category>\n" +
        "    <category name=\"List\" colour=\"%{BKY_LISTS_HUE}\">\n" +
        "      <block type=\"lists_create_with\">\n" +
        "        <mutation items=\"0\"></mutation>\n" +
        "      </block>\n" +
        "      <block type=\"lists_create_with\"></block>\n" +
        "      <block type=\"lists_repeat\">\n" +
        "        <value name=\"NUM\">\n" +
        "          <shadow type=\"math_number\">\n" +
        "            <field name=\"NUM\">5</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"lists_length\"></block>\n" +
        "      <block type=\"lists_isEmpty\"></block>\n" +
        "      <block type=\"lists_indexOf\">\n" +
        "        <value name=\"VALUE\">\n" +
        "          <block type=\"variables_get\">\n" +
        "            <field name=\"VAR\">{listVariable}</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"lists_getIndex\">\n" +
        "        <value name=\"VALUE\">\n" +
        "          <block type=\"variables_get\">\n" +
        "            <field name=\"VAR\">{listVariable}</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"lists_setIndex\">\n" +
        "        <value name=\"LIST\">\n" +
        "          <block type=\"variables_get\">\n" +
        "            <field name=\"VAR\">{listVariable}</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"lists_getSublist\">\n" +
        "        <value name=\"LIST\">\n" +
        "          <block type=\"variables_get\">\n" +
        "            <field name=\"VAR\">{listVariable}</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"lists_split\">\n" +
        "        <value name=\"DELIM\">\n" +
        "          <shadow type=\"text\">\n" +
        "            <field name=\"TEXT\">,</field>\n" +
        "          </shadow>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"lists_sort\"></block>\n" +
        "    </category>\n" +
        "    <sep></sep>\n" +
        "    <category name=\"Variables\" colour=\"%{BKY_VARIABLES_HUE}\" custom=\"VARIABLE\"></category>\n" +
        "    <category name=\"Functions\" colour=\"%{BKY_PROCEDURES_HUE}\" custom=\"PROCEDURE\"></category>\n" +
        "  </xml>"
      }
    },
    methods: {
      clear () {
        this.output = [];
      },
      run () {
        this.$refs.workspace.run();
      },
      async loadBlocks () {
        try {
          const result = await APIBlocks.get();
          if (result.data.success) {
            this.blocks = result.data.item;

          } else {
            this.error(result.data.message || "Server error at load blocks");
          }
        } catch (err) {
          this.error(err.response.data.message || err.message);
        }
      }
    },
    computed: {},
    props: [],
    async created () {
      await this.loadBlocks();
    }
  }
</script>
<style scoped lang="scss">
  .sandbox {
    margin: auto;
    width: 90vw;
  }
</style>
