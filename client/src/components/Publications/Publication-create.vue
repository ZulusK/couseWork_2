<template>
  <div class="ma-20">
    <b-loading :active="UI.isLoading"/>
    <div v-if="$store.getters.isLogged()">
      <div class="columns is-desktop">
        <div class="column is-12-mobile is-6-desktop">
          <publication-edit :publication="publication"/>
        </div>
        <div class="column is-12-mobile is-6-desktop">
          <publication-prev :author="$store.state.user" :publication="publication"/>
        </div>
      </div>
      <div class="ma-15 has-text-centered">
        <a class="button is-large is-success" v-ripple @click.stop="save">
          <span>Save</span>
          <b-icon
            icon="checkbox-marked-circle-outline"/>
        </a>
        <a class="button is-large is-danger" v-ripple @click.stop="clear">
          <span>Clear</span>
          <b-icon
            icon="delete"/>
        </a>
      </div>
    </div>
    <div v-else class="hero">
      <div class="hero-body container">
        <div class="notification is-danger">
          <h1 class="is-size-1">
            <b-icon
              size="is-large"
              icon="alert-decagram"/>
            Attention
          </h1>
          <p class="is-size-4">You need to log in, if you wish to continue</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AuthMixin from '%/Other/AuthMixin';
  import MessageMixin from '%/Other/MessageMixin';
  import PublicationPrev from '%/Publications/Publication'
  import PublicationEdit from '%/Publications/Publication-edit-area'
  import APIPublication from '#/Publications';
  import APIRes from '#/Res';

  export default {
    mixins: [AuthMixin, MessageMixin],
    components: {
      PublicationPrev,
      PublicationEdit
    },
    data () {
      return {
        UI: {
          isLoading: false
        },
        allowLeave: false,
        publication: {
          title: "",
          tags: [],
          logo: null,
          created: Date.now(),
          edited: Date.now(),
          difficult: 1,
          author: this.$store.state.user,
          description: "",
          text: ""
        }
      }
    },
    methods: {
      confirmLeave () {
        return window.confirm('Do you really want to leave? you have unsaved changes!')
      },
      confirmClear () {
        return window.confirm('Do you really want to clear?');
      },
      confirmSave () {
        return true;
        return window.confirm('Do you really ready to save?');
      },
      clear () {
        if (this.confirmClear()) {
          this.publication = this.emptyPublication;
        }
      },
      compressPublication () {
        return {
          title: this.publication.title,
          description: this.publication.description,
          text: this.publication.text,
          difficult: this.publication.difficult,
          tags: this.publication.tags,
          logo: this.publication.logoLoaded || this.publication.logo
        }
      },
      async processFile () {
        if (this.publication.file) {
          //save file to res
          try {
            const result = await APIRes.save(this.publication.file);
            if (result.data.success && result.data.id) {
              this.publication.logoID = result.data.id;
              this.publication.logoLoaded = `/api/v1/res/${result.data.id}`;
              return true;
            } else {
              this.error(result.data.message || "Uploading logo: Server says 'no'");
              return false;
            }
          } catch (err) {
            this.error(err.response.data.message || err.message);
            return false;
          }
        } else {
          return true;
        }
      },
      async savePublication () {
        try {
          const result = await APIPublication.save(this.compressPublication());
          if (result.data.success && result.data.item) {
            return result.data.item.id;
          } else {
            console.log(result.data)
            this.error(result.data.message || "Saving publication:Server says 'no'");
            return false;
          }
        } catch (err) {
          this.error(err.response.data.message || err.message);
        }
      },
      async processRemovingFile () {
        if (this.publication.logoID) {
          try {
            const result = await APIRes.delete(this.publication.logoID);
            if (result.data.success) {
              return true;
            } else {
              this.error(result.data.message || "Deleting uploaded logo: server says 'no'");
            }
          } catch (err) {
            this.error(err.response.message || err.message);
          }
        } else {
          return true;
        }
      },
      async pushPublication () {
        this.UI.isLoading = true;
        //todo check validation
        //check access and refresh
        await this.checkTimeOfTokens();
        if (this.isNotLogged()) {
          this.error('You are not authorized');
          this.UI.isLoading = false;
          return;
        }
        if (!await this.processFile()) {
          this.UI.isLoading = false;
          return;
        }
        const id = await this.savePublication();
        if (!id) {
          await this.processRemovingFile()
        } else {
          this.allowLeave = true;
          this.$router.push({name: 'Publications-view', params: {id: id}})
        }
        this.UI.isLoading = false;
      },
      async save () {
        if (this.confirmSave()) {
          await this.pushPublication();
        }
      }
    },
    computed: {

      emptyPublication () {
        return {
          title: "",
          tags: [],
          logo: null,
          created: Date.now(),
          edited: Date.now(),
          difficult: 1,
          author: this.$store.state.user,
          description: "",
          text: ""
        }
      }
    },
    props: [],
    beforeRouteLeave (to, from, next) {
      if (this.allowLeave || this.confirmLeave()) {
        next()
      } else {
        next(false)
      }
    },
    created () {

    }
  }
</script>
<style scoped lang="scss">
</style>
