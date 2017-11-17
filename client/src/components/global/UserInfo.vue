<template>
  <v-card>
    <v-layout column text-xs-center layout>
      <div v-if="$store.state.isUserLoggedIn">
        <v-flex>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-avatar
            :tile="false"
            :size="avatarHeight"
            class="grey lighten-4">
            <img class="croped"
                 src="http://cp12.nevsepic.com.ua/93/1348001954-76201-9009437024-www.nevspc.com.ua.jpg"
                 alt="user avatar"
                 onerror="this.src=`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*100)}.jpg`">
          </v-avatar>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-card-text>
            <div class="display-1 grey--text text--darken-3">{{username()}}</div>
          </v-card-text>
        </v-flex>
      </div>
      <div v-else>
        <v-card-text>
          <div class="subheading light-grey--text">You need to log in</div>
        </v-card-text>
        <v-layout row>
          <v-flex>
            <v-btn color="amber" flat to="login">
              <v-icon large color="amber">person</v-icon>
            </v-btn>
            <v-btn color="amber" flat to="signup">
              <v-icon large color="amber">person_add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-layout>
  </v-card>
</template>
<script>
  import VSubheader from "vuetify/src/components/VSubheader/VSubheader";
  import VCardTitle from "vuetify/src/components/VCard/VCardTitle";

  export default {
    components: {
      VCardTitle,
      VSubheader
    },
    data () {
      return {}
    },
    computed: {
      avatarHeight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '150px'
          case 'sm':
          case 'md':
            return '250px'
          case 'lg':
          case 'xl':
            return '300px'
          default:
            return '100px'
        }
      }
    },
    methods: {
      username: function () {
        return this.$store.state.username;
      }
    }
  }
</script>

<style scoped>
  .croped {
    object-fit: cover;
    object-position: center;
  }

</style>
