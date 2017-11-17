<template>
  <v-content>
    <v-container>
      <error-bar :show.sync="error" :message="errorMessage"/>
      <v-layout column v-if="$store.state.isUserLoggedIn" class="text-xs-center">
        <v-flex md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
          <panel title="Create publication"
                 image="https://images.unsplash.com/photo-1455461491901-a0990c10d84c?auto=format&fit=crop&w=800&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                 color="indigo">
            <div slot="text">
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
                    <flex>
                      <v-btn large @click="create" color="success">
                        Create
                      </v-btn>
                      <v-btn large :to="{name:'root'}" color="error">
                        cancel
                      </v-btn>
                    </flex>
                  </v-container>
                </v-card-text>
              </v-form>
            </div>
          </panel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>

</template>
<script>

  import PublicationsService from '@/services/PublicationsService'
  import Panel from '@/components/global/Panel'
  import ErrorBar from '@/components/global/ErrorSnackbar'
  import VContent from "vuetify/src/components/VGrid/VContent";

  export default {
    components: {
      VContent,
      Panel,
      ErrorBar
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
        error: false,
        errorMessage: null,
        required: (value) => !!value || 'Required.'
      }
    },
    methods: {
      async create () {
//        call API
        const areAllFieldsFilledIn = Object
          .keys(this.publication)
          .every(key => !!this.publication[key])
        if (!areAllFieldsFilledIn) {
          this.errorMessage = 'Please fill in all the required fields.'
          this.error = true;
          return
        }
        try {
          await PublicationsService.create(this.publication);
          this.$router.push({name: 'publications'})
        } catch (err) {
          this.errorMessages = err.response.data.message;
          this.error = true;
        }
      }
    }
  }
</script>


<style>

</style>
