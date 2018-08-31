<template>
  <v-layout
          fluid
          fill-height
          column
  >
    <v-flex ma-3 px-3>
      <v-subheader class="headline">
        {{ title }}
      </v-subheader>
    </v-flex>
    <v-btn
            absolute
            dark
            fab
            top
            right
            color="red"
            @click="cancel"
    >
      <v-icon>close</v-icon>
    </v-btn>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ currentQuestion.num }}. {{ currentQuestion.content }}</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout align-space-around justify-space-around row wrap>
      <v-flex xs6 sm3 ma-3 v-for="answer in currentQuestion.answers" :key="answer.num">
        <v-card
                :dark = "answer.solved"
                hover
                @click.native="answerQuestion(currentQuestion.num, answer.num, answer)"
                class="cursor"
        >
          <v-card-title primary-title>
            <div>
              <h3 class="mb-0">{{ answer.content }}</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn
            absolute
            dark
            fab
            bottom
            left
            color="pink"
            v-if="index > 1"
            @click="previousQuestion"
    >
      <v-icon>chevron_left</v-icon>
    </v-btn>
    <v-btn
            absolute
            dark
            fab
            bottom
            right
            color="green"
            v-if="index === questions.length"
            @click="submit"
    >
      <v-icon>check</v-icon>
    </v-btn>
    <v-dialog
            persistent
            v-model="showResults"
            width="500"
    >
      <v-card>
        <v-card-title
                class="headline grey lighten-2"
                primary-title
        >
          Wyniki
        </v-card-title>

        <v-card-text>
          <div v-for="result in results">
            <strong>{{ result.category }}:</strong> {{ result.weight | resultValue }}
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="primary"
                  flat
                  @click="closeDialog"
          >
            Zamknij
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  name: 'Public',
  data() {
    return {
      questions: '',
      currentQuestion: '',
      title: '',
      uuid: this.$route.params.uuid,
      type: '',
      answerMap: new Map(),
      index: 1,
      results: [],
      showResults: false
    };
  },
  mounted: async function() {
    try {
      const response = await axios.get("/rest/manage/get/" + this.$route.params.uuid);
      this.title = response.data.name;
      this.type = response.data.type;
      this.questions = response.data.questions;
      console.log(this.questions);
      this.changeQuestion();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    changeQuestion() {
      this.currentQuestion = this.questions.find(item => item.num === this.index);
    },
    answerQuestion(qNum, aNum, answer) {
      this.currentQuestion.answers.forEach(answer => this.$set(answer, 'solved', false));
      this.answerMap.set(qNum, aNum);
      this.$set(answer, 'solved', true);
      if(qNum < this.questions.length) {
        this.index++;
        this.changeQuestion();
      }
    },
    previousQuestion() {
      this.index--;
      this.changeQuestion();
    },
    cancel() {
      this.answerMap.clear();
      this.questions.forEach(question => question.answers.forEach(answer => this.$set(answer, 'solved', false)));
      this.index = 1;
      this.results = [];
      this.showResults = false;
      this.changeQuestion();
    },
    submit: async function() {
      let answerObj = {};
      this.answerMap.forEach((value, key) =>
        this.$set(answerObj, key.toString(), value)
      );
      let answers = {
        uuid: this.uuid,
        type: this.type,
        solution: answerObj
      };
      console.log(JSON.stringify(answers));
      try {
        const response = await axios.post('/rest/solve', answers);
        console.log(response);
        this.cancel();
        this.$notify({
          title: 'Udało się!',
          type: 'success',
          text: 'Quiz został wysłany, poczekaj, aż opracujemy rezultaty'
        });
        this.results = response.data.results;
        this.showResults = true;
      } catch (error) {
        console.log(error);
        this.$notify({
          title: 'Błąd',
          type: 'error',
          text: 'Ups, coś nie wyszło, spróbuj ponownie'
        });
      }
    },
    closeDialog() {
      this.showResults = false;
      this.results = [];
    }
  },
  filters: {
    resultValue: function (value) {
      if (!value) return '';
      value *= 100;
      return value.toString() + '%';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cursor {
  cursor: pointer;
}
</style>
