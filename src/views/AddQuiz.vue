<template>
  <v-container fluid fill-height>
    <v-layout align-space-around justify-space-around row fill-height>
    <v-stepper v-model="el" class="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="el > 1" step="1" editable>Stwórz quiz</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="el > 2" step="2" editable>Dodaj wyniki</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="el > 3" step="3" editable>Dodaj odpowiedzi</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">Gotowe!</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card
                  class="mb-5"
                  height="300px"
                  flat
          >
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Podstawowe informacje</h3>
                </div>
            </v-card-title>
            <v-form ref="form" lazy-validation>
              <v-text-field
                      v-model="quiz.name"
                      :error-messages="nameErrors"
                      label="Nazwa"
                      required
                      @input="$v.quiz.name.$touch()"
                      @blur="$v.quiz.name.$touch()"
              ></v-text-field>

              <v-layout align-space-between justify-space-between row>
                <v-flex xs12 sm5 >
              <v-select
                      v-model="quiz.type"
                      :items="types"
                      :error-messages="typeErrors"
                      label="Typ"
                      required
                      @change="$v.quiz.type.$touch()"
                      @blur="$v.quiz.type.$touch()"
              ></v-select>
                </v-flex>
                <v-flex xs12 sm5 offset-sm2>
              <v-select
                      v-model="quiz.privacy"
                      :items="privacies"
                      :error-messages="privacyErrors"
                      label="Widoczność"
                      required
                      @change="$v.quiz.privacy.$touch()"
                      @blur="$v.quiz.privacy.$touch()"
              ></v-select>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>

          <v-layout align-space-between justify-space-between row>
            <v-btn flat>Cofnij</v-btn>

          <v-btn
                  color="primary"
                  @click="el = 2"
          >
            Następny krok
          </v-btn>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="2">

          <v-card
                  class="mb-5"
                  height="300px"
                  flat
          >
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Dodawanie wyników</h3>
              </div>
            </v-card-title>
            <v-form ref="form" lazy-validation>
              <v-text-field
                      v-for="(item, index) in results"
                      :key = "item.num"
                      class = "text-field"
                      v-model="results[index].name"
                      :error-messages="resultErrors"
                      :label="'Wynik ' + results[index].num"
                      required
                      @input="$v.results.$touch()"
                      @blur="$v.results.$touch()"
              ></v-text-field>
              <v-btn
                      v-if="letAdd"
                      relative
                      dark
                      fab
                      top
                      left
                      color="pink"
                      @click="addResult"
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-form>
          </v-card>

          <v-layout align-space-between justify-space-between row>
            <v-btn flat>Cofnij</v-btn>

            <v-btn
                    color="primary"
                    @click="el = 3"
            >
              Następny krok
            </v-btn>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
                  class="mb-5"
                  color="grey lighten-1"
                  height="200px"
          ></v-card>


          <v-layout align-space-between justify-space-between row>
            <v-btn flat>Cofnij</v-btn>

            <v-btn
                    color="primary"
                    @click="el = 4"
            >
              Następny krok
            </v-btn>
          </v-layout>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card
                  class="mb-5"
                  color="grey lighten-1"
                  height="200px"
          ></v-card>

          <v-layout align-space-between justify-space-between row>
            <v-btn flat>Cofnij</v-btn>

            <v-btn
                    color="primary"
                    @click="submit"
            >
              Wyślij
            </v-btn>
          </v-layout>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    </v-layout>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'


export default {
  mixins: [validationMixin],
  validations: {
    quiz: {
      name: {required, maxLength: maxLength(300)},
      type: {required},
      privacy: {required}
    },
    result: {required}
  },
  name: 'Register',
  data() {
    return {
      el: 0,
      letAdd: true,
      valid: false,
      types: ['category', 'test'],
      privacies: ['public', 'private'],
      quiz: {
        name: '',
        type: '',
        privacy: ''
      },
      results: [{
        name: '',
        num: 1
      }] //TODO make this an array
    }
  },
  methods: {
    addResult() {
      if(this.results.length < 4) {
        this.$set(this.results, this.results.length, {
          name: '',
          num: this.results.length + 1
        });
        console.log(this.results);
        if(this.results.length === 4)
          this.letAdd = false;
      }
      else {
        this.letAdd = false;
      }
    },
    submit() {
      alert('Wysłane!');
      console.log(JSON.stringify(this.quiz));
    }
  },

  computed: {
    nameErrors () {
      const errors = [];
      if (!this.$v.quiz.name.$dirty) return errors;
      !this.$v.quiz.name.maxLength && errors.push('Name must be at most 300 characters long');
      !this.$v.quiz.name.required && errors.push('Name is required.');
      return errors
    },

    typeErrors() {
      const errors = [];
      if (!this.$v.quiz.type.$dirty) return errors;
      !this.$v.quiz.type.required && errors.push('Field is required');
      return errors;
    },

  resultErrors() {
    const errors = [];
    if (!this.$v.quiz.type.$dirty) return errors;
    !this.$v.quiz.type.required && errors.push('Field is required');
    return errors;
  },

    privacyErrors() {
      const errors = [];
      if (!this.$v.quiz.privacy.$dirty) return errors;
      !this.$v.quiz.privacy.required && errors.push('Field is required');
      return errors;
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stepper {
  width: 100%;
}
  .select {
    width: 200px;
  }
  .text-field {
    width: 80%;
  }
</style>
