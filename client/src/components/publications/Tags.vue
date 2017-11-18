<template>

  <div class="tags">
    <v-chip v-for="(tag,i) in tags" class="tag" label :color="tagColor(i)" text-color="white" :key="i">
      {{tag.slice(0, 10)}}
    </v-chip>
  </div>

</template>

<script>
  export default {
    data () {
      return {}
    },
    props: ['tags'],
    methods: {
      tagColor (i) {
        let colors = ['primary', 'red', 'blue', 'green', 'secondary', 'error'];
        return colors[Math.floor(Math.random(i) * colors.length)];
      }
    }
  }
</script>

<style scoped>
  .tag {
    color: white;
    width: auto;
    flex-grow: 1;
    flex-basis: 25%;
    flex-shrink: 1;
    margin: 5px;
  }

  .tags {
    /*display: flex;*/
    width: 90%;
    justify-content: space-around;
    align-items: center;
    flex-flow: row wrap;
    margin: 5px auto;
    background: transparent;
  }
</style>
