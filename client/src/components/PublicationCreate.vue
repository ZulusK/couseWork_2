<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Create publication">
        <v-snackbar
          v-model="snackbar"
          absolute
          top
          right
          color="success"
        >
          <span>Publication created!</span>
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
                    v-model="publication.title"
                    required
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
                      name="difficult"
                      color="blue darken-2"
                      label="Difficult"
                      hint="1 is easy, 10 is hard"
                      min="1"
                      max="10"
                      thumb-label
                      v-model="publication.difficult"
                      required
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
                      v-model="publication.tags"
                      label="Tags"
                      name="tags"
                      chips
                      tags
                      required
                    >
                    </v-select>
                  </v-layout>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Publication image URL</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-layout row>
                    <v-text-field
                      color="blue darken-2"
                      label="URL"
                      name="imageURL"
                      v-model="publication.imageURL"
                      required
                    ></v-text-field>
                  </v-layout>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex>
                  <v-text-field
                    box
                    multi-line
                    name="text"
                    label="Text of publication"
                    v-model="publication.text"
                    aria-required="true"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn round @click="create" color="success">
                Create
              </v-btn>

            </v-container>
          </v-card-text>
        </v-form>
      </panel>
    </v-flex>
  </v-layout>
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
        publication: {
          title: null,
          difficult: null,
          description: null,
          text: null,
          tags: [],
          imageURL: null
        },
        snackbar: null
      }
    },
    methods: {
      async create () {
//        cal API
        try {
          await PublicationsService.create(this.publication);
          this.$router.push({name: 'publications'})
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
</script>


<style>

</style>
