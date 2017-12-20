<template>
  <div class="sandbox">
    <div class="columns is-multiline">
      <div class="box column is-12">
      </div>
      <div class="column is-12 columns is-multiline">
        <div class="column is-12-tablet is-8-desktop">
          <workspace :xml="toolbox" class="box " ref="workspace"/>
        </div>
        <div class=" column is-4-desktop is-12-mobile">
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
      </div>
    </div>
    <br>
  </div>
</template>
<script>
  import Workspace from '%/code/Workspace';

  export default {
    components: {
      Workspace
    },
    data () {
      return {
        output: ["to large string", 33],
        toolbox: "<xml id=\"toolbox\" style=\"display: none\">\n" +
        "    <category name=\"Logic\">\n" +
        "      <category name=\"If\">\n" +
        "        <block type=\"controls_if\"></block>\n" +
        "        <block type=\"controls_if\">\n" +
        "          <mutation else=\"1\"></mutation>\n" +
        "        </block>\n" +
        "        <block type=\"controls_if\">\n" +
        "          <mutation elseif=\"1\" else=\"1\"></mutation>\n" +
        "        </block>\n" +
        "      </category>\n" +
        "      <category name=\"Boolean\">\n" +
        "        <block type=\"logic_compare\"></block>\n" +
        "        <block type=\"logic_operation\"></block>\n" +
        "        <block type=\"logic_negate\"></block>\n" +
        "        <block type=\"logic_boolean\"></block>\n" +
        "        <block type=\"logic_null\"></block>\n" +
        "        <block type=\"logic_ternary\"></block>\n" +
        "      </category>\n" +
        "    </category>\n" +
        "    <category name=\"Loops\">\n" +
        "      <block type=\"controls_repeat_ext\">\n" +
        "        <value name=\"TIMES\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">10</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"controls_whileUntil\"></block>\n" +
        "      <block type=\"controls_for\">\n" +
        "        <field name=\"VAR\">i</field>\n" +
        "        <value name=\"FROM\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "        <value name=\"TO\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">10</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "        <value name=\"BY\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"controls_forEach\"></block>\n" +
        "      <block type=\"controls_flow_statements\"></block>\n" +
        "    </category>\n" +
        "    <category name=\"Math\">\n" +
        "      <block type=\"math_number\"></block>\n" +
        "      <block type=\"math_arithmetic\"></block>\n" +
        "      <block type=\"math_single\"></block>\n" +
        "      <block type=\"math_trig\"></block>\n" +
        "      <block type=\"math_constant\"></block>\n" +
        "      <block type=\"math_number_property\"></block>\n" +
        "      <block type=\"math_round\"></block>\n" +
        "      <block type=\"math_on_list\"></block>\n" +
        "      <block type=\"math_modulo\"></block>\n" +
        "      <block type=\"math_constrain\">\n" +
        "        <value name=\"LOW\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "        <value name=\"HIGH\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">100</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_random_int\">\n" +
        "        <value name=\"FROM\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">1</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "        <value name=\"TO\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">100</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"math_random_float\"></block>\n" +
        "    </category>\n" +
        "    <category name=\"Lists\">\n" +
        "      <block type=\"lists_create_empty\"></block>\n" +
        "      <block type=\"lists_create_with\"></block>\n" +
        "      <block type=\"lists_repeat\">\n" +
        "        <value name=\"NUM\">\n" +
        "          <block type=\"math_number\">\n" +
        "            <field name=\"NUM\">5</field>\n" +
        "          </block>\n" +
        "        </value>\n" +
        "      </block>\n" +
        "      <block type=\"lists_length\"></block>\n" +
        "      <block type=\"lists_isEmpty\"></block>\n" +
        "      <block type=\"lists_indexOf\"></block>\n" +
        "      <block type=\"lists_getIndex\"></block>\n" +
        "      <block type=\"lists_setIndex\"></block>\n" +
        "    </category>\n" +
        "    <category name=\"Variables\" custom=\"VARIABLE\"></category>\n" +
        "    <category name=\"Functions\" custom=\"PROCEDURE\"></category>\n" +
        "    <sep></sep>\n" +
        "    <category name=\"Library\" expanded=\"true\">\n" +
        "      <category name=\"Randomize\">\n" +
        "        <block type=\"procedures_defnoreturn\">\n" +
        "          <mutation>\n" +
        "            <arg name=\"list\"></arg>\n" +
        "          </mutation>\n" +
        "          <field name=\"NAME\">randomize</field>\n" +
        "          <statement name=\"STACK\">\n" +
        "            <block type=\"controls_for\" inline=\"true\">\n" +
        "              <field name=\"VAR\">x</field>\n" +
        "              <value name=\"FROM\">\n" +
        "                <block type=\"math_number\">\n" +
        "                  <field name=\"NUM\">1</field>\n" +
        "                </block>\n" +
        "              </value>\n" +
        "              <value name=\"TO\">\n" +
        "                <block type=\"lists_length\" inline=\"false\">\n" +
        "                  <value name=\"VALUE\">\n" +
        "                    <block type=\"variables_get\">\n" +
        "                      <field name=\"VAR\">list</field>\n" +
        "                    </block>\n" +
        "                  </value>\n" +
        "                </block>\n" +
        "              </value>\n" +
        "              <value name=\"BY\">\n" +
        "                <block type=\"math_number\">\n" +
        "                  <field name=\"NUM\">1</field>\n" +
        "                </block>\n" +
        "              </value>\n" +
        "              <statement name=\"DO\">\n" +
        "                <block type=\"variables_set\" inline=\"false\">\n" +
        "                  <field name=\"VAR\">y</field>\n" +
        "                  <value name=\"VALUE\">\n" +
        "                    <block type=\"math_random_int\" inline=\"true\">\n" +
        "                      <value name=\"FROM\">\n" +
        "                        <block type=\"math_number\">\n" +
        "                          <field name=\"NUM\">1</field>\n" +
        "                        </block>\n" +
        "                      </value>\n" +
        "                      <value name=\"TO\">\n" +
        "                        <block type=\"lists_length\" inline=\"false\">\n" +
        "                          <value name=\"VALUE\">\n" +
        "                            <block type=\"variables_get\">\n" +
        "                              <field name=\"VAR\">list</field>\n" +
        "                            </block>\n" +
        "                          </value>\n" +
        "                        </block>\n" +
        "                      </value>\n" +
        "                    </block>\n" +
        "                  </value>\n" +
        "                  <next>\n" +
        "                    <block type=\"variables_set\" inline=\"false\">\n" +
        "                      <field name=\"VAR\">temp</field>\n" +
        "                      <value name=\"VALUE\">\n" +
        "                        <block type=\"lists_getIndex\" inline=\"true\">\n" +
        "                          <mutation statement=\"false\" at=\"true\"></mutation>\n" +
        "                          <field name=\"MODE\">GET</field>\n" +
        "                          <field name=\"WHERE\">FROM_START</field>\n" +
        "                          <value name=\"AT\">\n" +
        "                            <block type=\"variables_get\">\n" +
        "                              <field name=\"VAR\">y</field>\n" +
        "                            </block>\n" +
        "                          </value>\n" +
        "                          <value name=\"VALUE\">\n" +
        "                            <block type=\"variables_get\">\n" +
        "                              <field name=\"VAR\">list</field>\n" +
        "                            </block>\n" +
        "                          </value>\n" +
        "                        </block>\n" +
        "                      </value>\n" +
        "                      <next>\n" +
        "                        <block type=\"lists_setIndex\" inline=\"false\">\n" +
        "                          <value name=\"AT\">\n" +
        "                            <block type=\"variables_get\">\n" +
        "                              <field name=\"VAR\">y</field>\n" +
        "                            </block>\n" +
        "                          </value>\n" +
        "                          <value name=\"LIST\">\n" +
        "                            <block type=\"variables_get\">\n" +
        "                              <field name=\"VAR\">list</field>\n" +
        "                            </block>\n" +
        "                          </value>\n" +
        "                          <value name=\"TO\">\n" +
        "                            <block type=\"lists_getIndex\" inline=\"true\">\n" +
        "                              <mutation statement=\"false\" at=\"true\"></mutation>\n" +
        "                              <field name=\"MODE\">GET</field>\n" +
        "                              <field name=\"WHERE\">FROM_START</field>\n" +
        "                              <value name=\"AT\">\n" +
        "                                <block type=\"variables_get\">\n" +
        "                                  <field name=\"VAR\">x</field>\n" +
        "                                </block>\n" +
        "                              </value>\n" +
        "                              <value name=\"VALUE\">\n" +
        "                                <block type=\"variables_get\">\n" +
        "                                  <field name=\"VAR\">list</field>\n" +
        "                                </block>\n" +
        "                              </value>\n" +
        "                            </block>\n" +
        "                          </value>\n" +
        "                          <next>\n" +
        "                            <block type=\"lists_setIndex\" inline=\"false\">\n" +
        "                              <value name=\"AT\">\n" +
        "                                <block type=\"variables_get\">\n" +
        "                                  <field name=\"VAR\">x</field>\n" +
        "                                </block>\n" +
        "                              </value>\n" +
        "                              <value name=\"LIST\">\n" +
        "                                <block type=\"variables_get\">\n" +
        "                                  <field name=\"VAR\">list</field>\n" +
        "                                </block>\n" +
        "                              </value>\n" +
        "                              <value name=\"TO\">\n" +
        "                                <block type=\"variables_get\">\n" +
        "                                  <field name=\"VAR\">temp</field>\n" +
        "                                </block>\n" +
        "                              </value>\n" +
        "                            </block>\n" +
        "                          </next>\n" +
        "                        </block>\n" +
        "                      </next>\n" +
        "                    </block>\n" +
        "                  </next>\n" +
        "                </block>\n" +
        "              </statement>\n" +
        "            </block>\n" +
        "          </statement>\n" +
        "        </block>\n" +
        "      </category>\n" +
        "      <category name=\"Jabberwocky\">\n" +
        "        <block type=\"text_print\">\n" +
        "          <value name=\"TEXT\">\n" +
        "            <block type=\"text\">\n" +
        "              <field name=\"TEXT\">'Twas brillig, and the slithy toves</field>\n" +
        "            </block>\n" +
        "          </value>\n" +
        "          <next>\n" +
        "            <block type=\"text_print\">\n" +
        "              <value name=\"TEXT\">\n" +
        "                <block type=\"text\">\n" +
        "                  <field name=\"TEXT\">  Did gyre and gimble in the wabe:</field>\n" +
        "                </block>\n" +
        "              </value>\n" +
        "              <next>\n" +
        "                <block type=\"text_print\">\n" +
        "                  <value name=\"TEXT\">\n" +
        "                    <block type=\"text\">\n" +
        "                      <field name=\"TEXT\">All mimsy were the borogroves,</field>\n" +
        "                    </block>\n" +
        "                  </value>\n" +
        "                  <next>\n" +
        "                    <block type=\"text_print\">\n" +
        "                      <value name=\"TEXT\">\n" +
        "                        <block type=\"text\">\n" +
        "                          <field name=\"TEXT\">  And the mome raths outgrabe.</field>\n" +
        "                        </block>\n" +
        "                      </value>\n" +
        "                    </block>\n" +
        "                  </next>\n" +
        "                </block>\n" +
        "              </next>\n" +
        "            </block>\n" +
        "          </next>\n" +
        "        </block>\n" +
        "        <block type=\"text_print\">\n" +
        "          <value name=\"TEXT\">\n" +
        "            <block type=\"text\">\n" +
        "              <field name=\"TEXT\">\"Beware the Jabberwock, my son!</field>\n" +
        "            </block>\n" +
        "          </value>\n" +
        "          <next>\n" +
        "            <block type=\"text_print\">\n" +
        "              <value name=\"TEXT\">\n" +
        "                <block type=\"text\">\n" +
        "                  <field name=\"TEXT\">  The jaws that bite, the claws that catch!</field>\n" +
        "                </block>\n" +
        "              </value>\n" +
        "              <next>\n" +
        "                <block type=\"text_print\">\n" +
        "                  <value name=\"TEXT\">\n" +
        "                    <block type=\"text\">\n" +
        "                      <field name=\"TEXT\">Beware the Jubjub bird, and shun</field>\n" +
        "                    </block>\n" +
        "                  </value>\n" +
        "                  <next>\n" +
        "                    <block type=\"text_print\">\n" +
        "                      <value name=\"TEXT\">\n" +
        "                        <block type=\"text\">\n" +
        "                          <field name=\"TEXT\">  The frumious Bandersnatch!\"</field>\n" +
        "                        </block>\n" +
        "                      </value>\n" +
        "                    </block>\n" +
        "                  </next>\n" +
        "                </block>\n" +
        "              </next>\n" +
        "            </block>\n" +
        "          </next>\n" +
        "        </block>\n" +
        "      </category>\n" +
        "    </category>\n" +
        "  </xml>\n"
      }
    },
    methods: {
      clear () {
        this.output = [];
      },
      run () {
        this.$refs.workspace.run();
      }
    },
    computed: {},
    props: [],
    created () {

    }
  }
</script>
<style scoped lang="scss">
  .sandbox {
    margin: auto;
    width: 90vw;
  }
</style>
