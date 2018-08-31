<template>
  <v-container fluid fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-space-around justify-space-around row fill-height>
        <v-flex xs12 sm5 lg5>
          <call-to-login></call-to-login>
        </v-flex>
        <v-flex xs12 sm5 lg5>
          <v-card
                  color="white"
                  height="100%"
                  img="img/line.png"
          >
            <v-card-title primary-title>
              <div class="headline">Nie potrzebujesz logowania?</div>
            </v-card-title>
            <v-card-actions>
              <v-layout align-center justify-center column height="100%" width="100%">
                <v-flex xs12 sm5 lg5 pa-3 ma-4>
                  <v-btn dark color="purple" to="/public" ma-3>Zobacz publiczne quizy</v-btn>
                </v-flex>
                <v-flex xs12 sm5 lg5 pa-3 ma-4>
                  <v-btn ma-3 to="/new">Stwórz własny quiz</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import CallToLogin from './../components/CallToLogin'

export default {
  name: 'Home',
  components: {
    'call-to-login': CallToLogin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
