<template>
  <v-footer class="pl-2 pr-2 grey--text">
    <a :href="telegramLink" target="_blank">
      <v-btn fab flat color="blue" value="telegram">
        <v-avatar size="30px" tile>
          <img
            src="https://image.flaticon.com/icons/png/512/355/355977.png"
            alt="telegram">
        </v-avatar>
      </v-btn>
    </a>
    <a :href="instagramLink" target="_blank">
      <v-btn flat fab color="pink">
        <v-avatar size="30px" tile>
          <img
            src="https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png"
            alt="telegram">
        </v-avatar>
      </v-btn>
    </a>
    <v-spacer></v-spacer>
    <div class="body-1">
      &copy Danil Kazimirov KPI, FAM student {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>

<script>
  import VAvatar from "vuetify/src/components/VAvatar/VAvatar";
  import VContent from "vuetify/src/components/VGrid/VContent";

  export default {
    data () {
      return {
        telegramLink: 'https://telegram.me/ZulusK',
        instagramLink: 'https://www.instagram.com/idanilk'
      }
    },
    components: {
      VContent,
      VAvatar
    },
    methods: {}
  }
</script>

<style scoped>

</style>
