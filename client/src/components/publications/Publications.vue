<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Publicaions">
        <slot>
          <v-layout row>
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
      Panel
    },
    data () {
      return {
        publications: []
      }
    },
    async mounted () {
      //do a req to api
      try {
        this.publications = PublicationsService.index().response.items;
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>

<style scoped>

</style>
