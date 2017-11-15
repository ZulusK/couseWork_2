<template>
  <panel title="Create publication">
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Publication created!</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
    <v-form>
      <v-card-text>
        <v-container fluid>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Title of publication</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                color="blue darken-2"
                label="Title"
                name="title"
                v-model="title"
                required
                aria-required="true"
              ></v-text-field>

            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Select difficult</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-layout row>
                <v-slider
                  color="blue darken-2"
                  label="Difficult"
                  hint="1 is easy, 10 is hard"
                  min="1"
                  max="10"
                  thumb-label
                  v-model="difficult"
                  aria-required="true"
                ></v-slider>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Add some tags</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-layout row>
                <v-select
                  v-model="tags"
                  label="Add tag"
                  chips
                  tags
                >
                </v-select>
              </v-layout>
            </v-flex>
          </v-layout>


        </v-container>
      </v-card-text>
    </v-form>
  </panel>
</template>
<script>

  import PublicationsService from '@/services/PublicationsService'
  import Panel from '@/components/Panel'
  import VForm from "vuetify/src/components/VForm/VForm";

  export default {
    components: {
      VForm,
      Panel
    },
    data () {
      return {
        title: null,
        difficult: null,
        description: null,
        text: null,
        tags: [],
      }
    },
    methods: {}
  }
</script>


<style>

</style>
