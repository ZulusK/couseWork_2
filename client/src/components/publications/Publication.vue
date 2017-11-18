<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md8 offset-md2 xl6 offset-xl3>
        <v-card flat>
          <img :src="publication.imageURL" @error="usePlaceholder(publication.id)" :id="publication.id" :height="400">
          <v-card-title>
            <div class="display-1">
              {{publication.title}}
            </div>
          </v-card-title>
          <v-container fill-height fluid>
            <v-layout fill-height column>
              <v-flex xs12 flexbox align-end>
                <tags :tags="publication.tags"/>
              </v-flex>
              <v-flex xs10 flexbox offset-xs1>
                <div class="markdown-body">
                  <vue-markdown :source="publication.text"/>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Panel from '@/components/global/Panel.vue'
  import PublicationsService from '@/services/PublicationsService'
  import PublicationList from '@/components/publications/PublicationList.vue'
  import Tags from '@/components/publications/Tags.vue'
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      VueMarkdown,
      Panel,
      Tags,
      PublicationList,
    },
    data () {
      return {
        publication: {
          title: "",
          author: "",
          difficult: null,

        },
        timer: null,
      }
    },
    created: async function () {
      console.log('Я родился');
      await this.getItem();
      this.timer = setInterval(this.getItem, 1000 * 60)
    },
    computed: {
      color () {
        return ['green', 'success', 'yellow', 'orange', 'pink', 'red'][this.publication.difficult % 6];
      },
    },
    methods: {
      usePlaceholder (id) {
        console.log(id);
        let placeholder = (process.env.NODE_ENV.startsWith('dev')) ? 'https://cdn.browshot.com/static/images/not-found.png' : '/images/placeholder-image.png';
        document.getElementById(id).src = placeholder;
      },

      async getItem () {
        console.log('Я обновился');
        try {
          this.publication = (await PublicationsService.get(this.$route.query.id)).data.items[0];
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>
  img {
    width: 100%;
    /*max-height: 100%;*/
    /*max-width: 100%;*/
    object-fit: cover;
    /*float: left;*/
    position: relative;
    /*margin: 20px;*/
    border-radius: 5px;
    display: block;
  }
</style>
