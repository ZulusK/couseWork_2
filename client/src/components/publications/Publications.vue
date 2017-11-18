<template>
  <!--<v-content>-->
  <v-container>
    <v-layout column wrap class="center">
      <v-flex xs12 relative>
        <publication-list :items="publications"/>
      </v-flex>
      <v-flex xs12 md6 offset-md3>
        <div class="text-xs-center">
          <v-pagination :length="total" v-model="page" :total-visible="total%10" circle color="amber"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

  <!--</v-content>-->
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
        page: 1,
        total: 1
      }
    },
    created: async function () {
      console.log('Я родился');
      await this.loadItems();
      this.timer = setInterval(this.loadItems, 1000 * 60)
    },
    watch: {
      page: async function () {
        await this.loadItems();
      }
    },
    methods: {
      async loadItems () {
        console.log('Я обновился');
        try {
          let response = (await PublicationsService.index(this.page)).data;
          this.publications = response.items;
          this.total = Math.ceil(response.total/response.limit);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>
  .center {
    margin: auto;
    position: relative;
    text-align: center;
  }
</style>
