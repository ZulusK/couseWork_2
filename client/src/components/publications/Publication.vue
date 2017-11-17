<template>
  <v-content>
    <v-container>
      <v-layout row wrap class="text-xs-center">
        <v-flex xs12 xl10 offset-xl1>
          <publication-list :items="publications"/>
        </v-flex>
      </v-layout>
    </v-container>

  </v-content>
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
        publications: [],
        timer: null,
      }
    },
    created: async function () {
      console.log('Я родился');
      await this.getItems();
      this.timer = setInterval(this.getItems, 1000 * 60)
    },
    methods: {
      async getItems () {
        console.log('Я обновился');
        try {
          this.publications = (await PublicationsService.index()).data.items;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
