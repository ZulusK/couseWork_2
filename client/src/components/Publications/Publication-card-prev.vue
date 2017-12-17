<template>
  <div class="box">
    <div class="columns is-tablet is-gapless is-multiline">
      <div class="column is-half-tablet is-one-third-desktop">
        <div class="has-text-centered notification"
             :class="{
          'is-easy':difficult<4,
          'is-middle':difficult>=4 && difficult<=7,
          'is-hard':difficult>7}">
          <p class="is-size-3">{{title}}</p>
        </div>
        <div>
          <figure class="logo-image-container ">
            <img :src="logo" alt="Publication logo" @error="usePlaceholder" class="logo-image round-corner-5">
          </figure>
        </div>
      </div>
      <div class="column">
        <div class="card-content">
          <div class="media">
            <div class="media-left avatar-image-container">
              <img
                :src="authorAvatar"
                alt="Author avatar"
                @error="usePlaceholder"
                class="avatar-image">
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{authorName}}</strong>
                  <small><a>@telegram</a></small>
                  <small>{{created}}</small>
                </p>
              </div>
            </div>
          </div>
          <hr>
          <div class=" content">
            {{description}}
          </div>
          <hr>
          <div class="tags">
            <div class="tag is-warning is-medium" v-for="tag in item.tags" :key="tag">
              {{tag}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Globals from '#/globals';

  export default {
    data () {
      return {}
    },
    methods: {
      usePlaceholder (sender) {
        sender.target.src = Globals.PLACEHOLDER;

      }
    },
    components: {},
    computed: {
      title () {
        return this.item.title ? this.item.title.trim().substr(0, 20) : "No title";
      },
      logo () {
        return this.item.logo ? this.item.logo.trim() : '/static/img/401.jpg';
      },
      difficult () {
        return Number(this.item.difficult) || 5;
      },
      authorAvatar () {
        return this.author.avatar ? this.author.avatar : '/static/img/404.jpg';
      },
      authorName () {
        return this.author.name ? this.author.name.trim().substr(0, 20) : "No name";
      },
      created () {
        return (new Date(this.item.created)).toLocaleDateString();
      },
      description () {
        return this.item.description ? this.item.description.trim().substr(0, 150) : "No description"
      }
    },
    props: [
      "item",
      "author"
    ],
    created () {

    }
  }
</script>
<style scoped lang="scss">
  .logo-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  .logo-image-container {
    margin: auto;
    width: 100%;
    height: 256px;
  }

  .avatar-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
    object-position: center;
  }

  .avatar-image-container {
    width: 64px;
    height: 64px;
  }
</style>
