<script>
  import AuthAPI from '#/Auth';
  export default {
    methods: {
      async checkTimeOfTokens () {
        if (this.isNotLogged()) return;
        console.log(0)
        //check is access token are valid
        if (await this.isValidAccessToken()) {
          return;
        }
        console.log(1)
        //check is refresh token are valid
        if (!await this.isValidRefreshToken()) {
          this.logout();
          return;
        }
        console.log(2)
        await this.updateAccessToken();
      },
      async updateAccessToken () {
        // update access token
        try {
          const response = await AuthAPI.updateAccessToken();
          if (result.success) {
            this.$store.dispatch('setToken_access', response.data.tokens.access);
          } else {
            if (this.logout) {
              this.logout();
            } else {
              this.logout();
            }
          }
        } catch (err) {
          this.logout();
        }
      },
      async isValidRefreshToken () {
        try {
          const response = await AuthAPI.checkTokenRefresh();
          console.log(response.data)
          return response.data.success;
        } catch (err) {
          return false;
        }
      },
      async isValidAccessToken () {
        try {
          const response = await AuthAPI.checkTokenAccess();
          return response.data.success;
        } catch (err) {
          return false;
        }
      },
      logout () {
        this.$store.dispatch('setToken_access', null);
        this.$store.dispatch('setToken_refresh', null);
        this.$store.dispatch('setUser', null);
      },
      isLogged () {
        return this.$store.getters.isLogged();
      },
      isNotLogged () {
        return !this.isLogged();
      }
    },
  }
</script>
