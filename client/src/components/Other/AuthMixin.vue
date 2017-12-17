<script>
  export default {
    methods: {
      async checkTimeOfTokens () {
        if (this.isNotLogged()) return;
        //check is access token are valid
        if (await this.isValidAccessToken()) {
          return;
        }
        //check is refresh token are valid
        if (!await this.isValidRefreshToken()) {
          if (this.logout) {
            this.logout();
          } else {
            this.logout();
          }
        }
        await this.updateAccessToken();
      },
      async updateAccessToken () {
        // update access token
        try {
          const response = await AuthAPI.updateAccessToken();
          if (result.success) {
            this.$store.dispatch('setToken_access', response.data.tokens.access);
          } else {
            if(this.logout) {
              this.logout();
            }else{
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
