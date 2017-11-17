<template>
  <div>
    <v-content>
      <v-container>
        <v-layout column class="text-xs-center">
          <v-flex md10 offset-md1 lg8 offset-lg2 xl4 offset-xl4>
            <!--<panel color="success"-->
            <!--image="https://images.unsplash.com/photo-1471769321038-24f4db35b24d?auto=format&fit=crop&w=1353&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D">-->
            <div slot="text">
              <v-container add_circle_outline>
                <v-layout column>
                  <div class="display-4 white--text">Welcome to Codual</div>

                </v-layout>
              </v-container>
            </div>
            <!--</panel>-->
          </v-flex>
          <v-flex>
            <v-btn fab large :to="{name:'publications'}" color="success" outline>
              <v-icon large>keyboard_arrow_down</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
  import Panel from '@/components/global/Panel.vue'
  import VIcon from "vuetify/src/components/VIcon/VIcon";

  export default {
    components: {
      VIcon,
      Panel
    },
    name: 'Index',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
