<script>
    export default {
        methods: {
          error (msg) {
            this.$toast.open({
              duration: 5000,
              message: msg || "Something is going wrong",
              position: 'is-top',
              queue: false,
              type: 'is-danger'
            })
          },
          success (msg) {
            this.$toast.open({
              duration: 5000,
              message: msg || "All is ok",
              position: 'is-top',
              queue: false,
              type: 'is-success'
            })
          },
        },
    }
</script>
