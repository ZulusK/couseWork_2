<template>
  <router-link :to="{name:'publication',query:{id:publication.id}}" class="link">
    <div v-if="publication" class=" elevation-5 publication-card flex-item">
      <div class='header' :class="titleColor">
        {{title}}
      </div>
      <img :src="publication.imageURL"
           :id="publication.id"
           @error.stop="usePlaceholder(publication.id)"
           alt="image-preview of publication">
      <div class="description">
        {{description}}
      </div>
      <tags-area :tags="publication.tags"/>
    </div>
  </router-link>
</template>

<script>
  import TagsArea from '@/components/publications/Tags.vue'

  export default {
    components: {
      TagsArea
    },
    data () {
      return {}
    },
    props: [
      'publication'
    ],
    methods: {

      usePlaceholder (id) {
        let placeholder = (process.env.NODE_ENV.startsWith('dev')) ? 'https://cdn.browshot.com/static/images/not-found.png' : '/images/placeholder-image.png';
        document.getElementById(id).src = placeholder;
      }
    },
    computed: {
      titleColor () {
        return ['green', 'success', 'yellow', 'orange', 'pink', 'red'][this.publication.difficult % 6];
      },
      title () {
        return this.publication.title.slice(0, 20);
      },
      heigth () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '150'
          case 'sm':
          case 'md':
            return '200'
          case 'lg':
            return '350'
          case 'xl':
            return '400'
          default:
            return '350'
        }
      },
      imageHeight () {
        Math.floor(this.height * 0.6)
      },
      description () {
        return this.publication.description.slice(0, 120);
      }
    }
  }
</script>

<style scoped>

  .publication-card {
    width: 300px;
    color: #1c1c1c;
    height: auto;
    overflow: hidden;
    transition: transform 0.4s;
    background-color: white;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .publication-card:hover {
    padding: 0px;
    word-wrap: break-word;
    transform: scale(0.95, 0.95); /* Standard syntax */
  }

  .publication-card img {
    height: 280px;
    width: 280px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    margin: 10px;
  }

  .link {
    text-decoration: none;
  }

  .publication-card .description {
    color: #222;
    text-align: center;
    margin: 2%;
    font-weight: 100;
    font-size: 20px;
  }

  .publication-card .header {
    color: white;
    white-space: normal;
    font-weight: 400;
    font-size: 20px;
    padding: 5px;
    text-align: center;
    height: auto;
  }

  .flex-item {
    flex-grow: 1;
    flex-basis: 25%;
    flex-shrink: 1;
    margin: 20px;
  }


</style>
