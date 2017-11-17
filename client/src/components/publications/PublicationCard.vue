<template>

  <v-card v-if="publication" flat class=" elevation-5 publication-card">
    <!--<a href="/publications/<%= obj._id %>" target="_self">-->
    <div class='header' :class="titleColor">
      <div class="display-1">{{title}}</div>
    </div>
    <img :src="publication.imageURL"
         onerror="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaL_bwIbirU4Yx3KneeiqTPeVyKztRfKJROVYK4LttLfDb3wYnw'"
         alt="image-preview of publication">
    <div class="description">
      {{description}}
    </div>
    <div class="text-xs-center">
      <v-chip v-for="(tag,i) in publication.tags" label :color="tagColor(i)" text-color="white" :key="i">
        {{tag.slice(0, 10)}}
      </v-chip>
    </div>
    <!--</a>-->
  </v-card>
</template>

<script>
  import VCardTitle from "vuetify/src/components/VCard/VCardTitle";

  export default {
    components: {VCardTitle},
    data () {
      return {}
    },
    props: [
      'publication'
    ],
    methods: {
      tagColor (i) {
        let colors = ['primary', 'red', 'blue', 'green', 'secondary', 'error'];
        return colors[Math.floor(Math.random(i) * colors.length)];
      }
    },
    computed: {
      titleColor () {
        return ['green', 'success', 'yellow accent-3', 'orange lighten-1', 'pink', 'red'][this.publication.difficult % 6];
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
    color: #1c1c1c;
    height: 100%;
    overflow: hidden;
    /*box-shadow: 0px -10px 60px rgba(6, 4, 4, 0.5);*/
    transition: transform 0.4s;

    background-color: white;

    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .publication-card:hover {
    /*box-shadow: 0px -10px 30px rgba(6, 4, 4, 0.3);*/
    padding: 0px;
    transform: scale(0.95, 0.95); /* Standard syntax */
  }

  .publication-card img {
    height: 280px;
    width: 280px;
    object-fit: cover;
    object-position: center;

    border-radius: 50%;
    margin-top: 2%;
    margin-left: 50%;
    transform: translate(-50%, 0%);
  }

  .publication-card .description {
    color: #222;
    text-align: center;
    margin: 2%;
    line-height: 20px;
    font-size: 20px;
  }

  .publication-card .header {
    color: white;
    white-space: normal;
    font-weight: 600;
    text-align: center;
    height: auto;
  }


</style>
