<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Publicaions">
        <slot>
          <v-layout row>
            <v-btn
              slot="action"
              :to="{name: 'publications.create'}"
              color="success"
              light
              medium
              absolute
              right
              middle
              fab>
              <v-icon color="white">add</v-icon>

            </v-btn>
            <div v-for="publication in publications" :key="publication.id" class="ma-3">
              <panel :title="publication.title">
                {{publication.title}}
                {{publication.difficult}}
                {{publication.description}}
                <div v-for="tag in publication.tags">
                  {{tag}}
                </div>
              </panel>
            </div>
          </v-layout>
        </slot>
      </panel>
    </v-flex>
  </v-layout>

</template>
<script>
  import Panel from '@/components/global/Panel'
  import PublicationsService from '@/services/PublicationsService'

  export default {
    components: {
      Panel,
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
