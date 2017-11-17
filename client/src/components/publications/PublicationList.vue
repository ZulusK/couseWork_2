<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs3 v-for="publication in items" :key="publication.title">
        <publication-card  :publication="publication"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PublicationCard from '@/components/publications/PublicationCard.vue'

  export default {
    components: {
      PublicationCard
    },
    data () {
      return {}
    },
    props: [
      'items'
    ]
  }
</script>
