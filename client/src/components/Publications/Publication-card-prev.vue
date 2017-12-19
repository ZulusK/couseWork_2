<template>
  <div class="box">
    <div class="columns is-tablet is-gapless is-multiline">
      <div class="column is-half-tablet is-one-third-desktop">
        <router-link :to="{name:'Publications-view', params:{id:item.id}}">
          <div class="has-text-centered notification"
               :class="{
          'is-easy':difficult<4,
          'is-middle':difficult>=4 && difficult<=7,
          'is-hard':difficult>7}">
            <p class="is-size-3">{{title}}</p>
          </div>
          <div>
            <figure class="logo-image-container " v-ripple>
              <img :src="logo" alt="Publication logo" @error="usePlaceholder" class="logo-image round-corner-5"/>
            </figure>
          </div>
        </router-link>
      </div>
      <div class="column">
        <div class="card-content">
          <router-link :to="{name:'Publications-list',query:{author:item.author}}">
            <div class="media has-text-black">
              <div class="media-left avatar-image-container">
                <template v-if="author.logo">
                  <img
                    :src="authorAvatar"
                    alt="Author avatar"
                    @error="usePlaceholder"
                    class="avatar-image">
                </template>
                <template v-else>
                  <v-gravatar
                    class="avatar-image"
                    :email="author.email||''"
                    alt="" :size="140"
                    ref="gavatar"/>
                </template>
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
            <router-link class="tag is-warning is-medium interactive-tag" v-for="tag in item.tags" :key="tag"
                         :to="{name:'Publications-list', query:{tags:[tag]}}">
              {{tag}}
            </router-link>
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
        return this.item.title ? this.item.title.trim().substr(0, 40) : "No title";
      },
      logo () {
        return this.item.logo ? this.item.logo.trim() : Globals.PLACEHOLDER;
      },
      difficult () {
        return Number(this.item.difficult) || 5;
      },
      authorAvatar () {
        return this.author.avatar ? this.author.avatar : Globals.PLACEHOLDER;
      },
      authorName () {
        return this.author.name ? this.author.name.trim().substr(0, 20) : "No name";
      },
      created () {
        return (new Date(this.item.created)).toLocaleDateString();
      },
      description () {
        return this.item.description ? this.item.description.trim() : "No description"
      },
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
    border-radius: 5px;
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
