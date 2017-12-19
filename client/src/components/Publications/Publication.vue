<template>
  <div>
    <div class="columns is-tablet is-2">
      <div class=" column">
        <div class="box">
          <div class="has-text-centered notification"
               :class="{
          'is-easy':difficult<4,
          'is-middle':difficult>=4 && difficult<=7,
          'is-hard':difficult>7}">
            <p class="is-size-3">{{title}}</p>
          </div>
          <figure class="logo-image-container has-text-centered" v-ripple>
            <img :src="logo()" alt="Publication logo" @error="usePlaceholder" class="logo-image round-corner-5"/>
          </figure>
        </div>
      </div>
      <div class="column ">
        <div class="box">
          <router-link :to="{name:'Publications-list',query:{author:publication.author}}">
            <div class="media has-text-black">
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
                    <br>
                    on
                    <small>{{created}}</small>
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          <hr>
          <div class=" content">
            {{description}}
          </div>
          <hr>
          <div class="tags">
            <router-link class="tag is-warning is-medium interactive-tag" v-for="tag in publication.tags" :key="tag"
                         :to="{name:'Publications-list', query:{tags:[tag]}}">
              {{tag}}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="content markdown-body" v-html="renderedText"/>
    </div>
  </div>
</template>
<script>
  import Globals from '#/globals';
  import Utils from '#/Utils';

  export default {
    data () {
      return {}
    },
    methods: {
      usePlaceholder (sender) {
        sender.target.src = Globals.PLACEHOLDER;
      },
      logo () {
        return this.publication.logo ? Utils.resolveImageURL(this.publication.logo) : Globals.PLACEHOLDER;
      }
    },
    computed: {
      title () {
        return this.publication.title ? this.publication.title.trim().substr(0, 20) : "No title";
      },
      difficult () {
        return Number(this.publication.difficult) || 5;
      },
      authorAvatar () {
        return this.author.avatar ? this.author.avatar : Globals.PLACEHOLDER;
      },
      authorName () {
        return this.author.name ? this.author.name.trim().substr(0, 20) : "No name";
      },
      created () {
        return (new Date(this.publication.created)).toLocaleDateString();
      },
      description () {
        return this.publication.description ? this.publication.description.trim().substr(0, 150) : "No description"
      },
      renderedText () {
        return Utils.md.render(this.publication.text || "");
      }
    },
    props: [
      "publication",
      "author"
    ],
    created () {

    }
  }
</script>
<style scoped lang="scss">


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

  .interactive-tag {
    transition: transform 0.4s;

  }

  a:hover {
    text-decoration: none;
  }

  .interactive-tag:hover {
    transform: scale(1.2, 1.2); /* Standard syntax */
  }
</style>
