<template>
  <div class="container">
    <div class="box column is-8 is-offset-2">
      <div class="is-8 is-offset-2 columns">
        <div class="column is-6 container">
          <figure class="image is-256x256">
            <img src="https://bulma.io/images/placeholders/256x256.png">
          </figure>
        </div>
        <div class="column is-6">
          <section>
            <b-field label="Name">
              <b-input value="Kevin Garvey"></b-input>
            </b-field>
            <b-field label="Email"
                     type="is-danger"
                     message="This email is invalid">
              <b-input type="email"
                       value="john@"
                       maxlength="30">
              </b-input>
            </b-field>

            <b-field label="Username"
                     type="is-success"
                     message="This username is available">
              <b-input value="johnsilver" maxlength="30"></b-input>
            </b-field>

            <b-field label="Password"
                     type="is-warning"
                     :message="['Password is too short', 'Password must have at least 8 characters']">
              <b-input value="123" type="password" maxlength="30"></b-input>
            </b-field>

            <b-field label="Subject">
              <b-select placeholder="Select a subject">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </b-select>
            </b-field>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {},
    computed: {},
    props: [],
    created () {

    }
  }
</script>
<style scoped lang="scss">
  .is-256x256 {
    width: 256px;
    height: 256px;
  }
</style>
