<template>
  <v-snackbar
    :timeout="timeout"
    :vertical="true"
    top="true"
    v-model="show"
    @close="hide()"
  >
    <h2>{{ message }}</h2>

    <v-btn flat color="pink" @click="hide()">Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        timeout: 3000,
        multiline: true,
        vertical: true,
        color: "error",
      }
    },
    props: [
      'message',
      'show'
    ],
    methods: {
      hide () {
        this.$emit('update:show', false)
      }
    }
  }
</script>
