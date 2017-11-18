<template>
  <v-container>
    <v-card>
      <v-card-title>

      </v-card-title>
    </v-card>
  </v-container>
</template>
<script>
  import Panel from '@/components/global/Panel.vue'
  import PublicationsService from '@/services/PublicationsService'
  import PublicationList from '@/components/publications/PublicationList.vue'

  export default {
    components: {
      Panel,
      PublicationList
    },
    data () {
      return {
        publication: {
          title: "",
          author: "",
          difficult: null,

        },
        timer: null,
      }
    },
    created: async function () {
      console.log('Я родился');
      await this.getItem();
      this.timer = setInterval(this.getItem, 1000 * 60)
    },

    methods: {
      async getItem () {
        console.log('Я обновился');
        try {
          this.publication = (await PublicationsService.get(this.$route.query.id)).data.items[0];
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
