<template>
  <div class="box">
    <b-field label="Title" horizontal>
      <b-input
        v-model="publication.title"
        placeholder="Eq. Quick sort for teapot"
        icon="magnify"></b-input>
    </b-field>
    <b-field label="Tags" horizontal>
      <b-taginput
        placeholder="Eq. 'sort', 'search'"
        icon="label-outline"
        v-model="publication.tags"
        type="is-primary">
      </b-taginput>
    </b-field>
    <b-field label="Difficult" horizontal>
      <input class="slider is-fullwidth is-large is-circle"
             :class="{
          'is-easy':publication.difficult<4,
          'is-middle':publication.difficult>=4 && publication.difficult<=7,
          'is-hard':publication.difficult>7}"
             min="1" max="10"
             v-model="publication.difficult" type="range">
      <output for="sliderWithValue">{{publication.difficult}}</output>
    </b-field>
    <b-field horizontal label="Description">
      <b-input type="textarea" v-model="publication.description" length="200"></b-input>
    </b-field>
    <section>
      <b-tabs position="is-centered" class="block" v-model="logoMode" type="is-boxed" @change="setTypeOfLogo">
        <b-tab-item label="URL" icon="debug-step-out">
          <b-field label="Image" horizontal>
            <b-input
              placeholder="URL"
              v-model="imageURL"/>
            <p class="control">
              <a class="button is-info" @click.stop="addURL()">
                <b-icon
                  class="icon"
                  size="is-small"
                  pack="fa"
                  icon="plus"/>
              </a>
            </p>
          </b-field>
        </b-tab-item>
        <b-tab-item label="Load" icon="debug-step-into">
          <section class="columns is-multiline">
            <div class="column is-6">
              <b-field>
                <b-upload
                  @input="onFileInput"
                  v-model="dropFiles"
                  accept="image/*"
                  drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon
                          icon="upload"
                          size="is-large">
                        </b-icon>
                      </p>
                      <p>Drop logo of publication here or click to upload</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>
              <div class="tags">
            <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary-2 is-medium">
                {{file.name.substr(0, 40)}}
                <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                </button>
            </span>
              </div>
            </div>
            <div class="column is-6">
              <figure class="image img-container" v-if="publication.logo">
                <img alt="Logo prev" :src="publication.logo" :width="'100px'">
              </figure>
            </div>
          </section>
        </b-tab-item>
        <b-tab-item label="None" icon="close-box-outline"></b-tab-item>
      </b-tabs>
    </section>
    <hr>
    <b-field label="Text">
      <b-input type="textarea" v-model="publication.text" rows="15"></b-input>
    </b-field>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        logoMode: "",
        readedFile: "",
        imageURL: "",
        dropFiles: [],
      }
    },
    watch: {},
    methods: {
      addURL (e) {
        if (!e || e == '\n')
          this.publication.logo = this.imageURL;
      },
      setTypeOfLogo (num) {
        switch (num) {
          case 0:
            this.publication.logo = this.imageURL;
            this.publication.file = null;
            break;
          case 1:
            this.publication.file = this.dropFiles[0];
            this.publication.logo = this.readedFile;
            break;
          default:
            this.publication.logo = "";
            break;
        }
      },
      async onFileInput () {
        this.dropFiles.splice(0, this.dropFiles.length - 1);
        await this.loadFile();
      },
      async loadFile () {
        var reader = new FileReader();
        let vm = this;
        vm.publication.file = this.dropFiles[0];
        reader.onload = (e) => {
          vm.readedFile = e.target.result;
          vm.publication.logo = vm.readedFile;
        }
        reader.readAsDataURL(this.dropFiles[0]);
      },
      deleteDropFile (index) {
        this.dropFiles.splice(index, 1)
        this.publication.logo = null;
      }
    },
    computed: {},
    props: [
      'publication'
    ],
    created () {

    }
  }
</script>
<style scoped lang="scss">
  .img-container {
    position: relative;
    width: 100%;
    height: 256px;
  }

  img {
    border-radius: 5px;
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>
