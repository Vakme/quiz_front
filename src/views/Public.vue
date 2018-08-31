<template>
  <v-layout
          fluid
          fill-height
          column
  >
    <v-flex ma-3 px-3>
      <v-subheader class="headline">
        Publiczne quizy
      </v-subheader>
    </v-flex>

    <v-container fluid grid-list-xs>
    <v-list
            three-line
            light
            expand
            width="100%"
    >
      <template v-for="(item, index) in questions">

        <v-divider
        v-if="index===0"></v-divider>
        <v-list-tile
                :key="item.uuid"
                :to="{ name: 'quiz', params: { uuid: item.uuid }}"
        >

          <v-list-tile-content>
            <v-list-tile-title v-html="item.name"></v-list-tile-title>
            <v-list-tile-sub-title v-if="item.userinfo" class="text--primary"><strong>Użytkownik:</strong> {{ item.userinfo.login }}</v-list-tile-sub-title>
            <v-list-tile-sub-title><strong>Typ:</strong> {{ item.type }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </template>
    </v-list>
  </v-container>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  name: 'Public',
  data() {
    return {
      questions: ""
    };
  },
  mounted: async function() {
    try {
      const response = await axios.get("/rest/manage/getPublic");
      this.questions = response.data;
      console.log(this.questions);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
