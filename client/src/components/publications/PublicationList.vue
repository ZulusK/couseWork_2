<template>
  <!--<v-container fluid grid-list-xl>-->
  <div class="flex-publication-prev-container">
    <div v-for="publication in items" :key="publication.title">
      <publication-card :publication="publication"/>
    </div>
  </div>
  <!--</v-container>-->
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

<style scoped>
  .flex-publication-prev-container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-flow: row wrap;
    margin: 20px;
    position: relative;
  }
</style>
