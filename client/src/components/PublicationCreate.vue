<template>
  <v-layout column>
    <v-flex xs6 offset-xs3 class="text-xs-center">
      <panel title="Create publication">

        <v-snackbar
          :timeout="timeout"
          :multi-line="true"
          :vertical="true"
          v-model="snackbar"
          color="error"
        >
          <h2>{{ error }}</h2>
          <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
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
                    :rules="[required]"
                  ></v-text-field>

                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Short description</v-subheader>
                </v-flex>
                <v-flex xs8>
                  <v-layout row>
                    <v-text-field
                      color="blue darken-2"
                      label="Decription"
                      name="description"
                      v-model="publication.description"
                      required
                      :rules="[required]"
                    ></v-text-field>
                  </v-layout>
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
                      :rules="[required]"
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
                      :rules="[required]"
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
                      :rules="[required]"
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
                    :rules="[required]"
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
          imageURL: null,
        },
        timeout: 2000,
        snackbar: false,
        error: null,
        required: (value) => !!value || 'Required.'
      }
    },
    methods: {
      async create () {
//        call API
        this.error = null
        const areAllFieldsFilledIn = Object
          .keys(this.publication)
          .every(key => !!this.publication[key])

        if (!areAllFieldsFilledIn) {
          this.error = 'Please fill in all the required fields.'
          this.snackbar = true
          return
        }

        try {
          await PublicationsService.create(this.publication);
          this.$router.push({name: 'publications'})
        } catch (err) {
          error = err.response.data.message
          this.snackbar = true;
        }
      }
    }
  }
</script>


<style>

</style>
