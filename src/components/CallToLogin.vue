<template>

    <v-card light color="white" height="100%">
        <v-card-media
                height="200px"
                src="https://cdn.pixabay.com/photo/2016/10/12/19/54/homework-1735644_960_720.png"
        >
        </v-card-media>
        <v-card-title primary-title>
            <div class="headline">Nudzą cię papierowe testy?</div>
            <div>Podaj swojego maila i zarządzaj quizami przez nasz panel administracyjny!</div>
        </v-card-title>
        <v-flex align-space-around justify-space-around ma-2 pa-2 row>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        solo
                        required
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                ></v-text-field>
                <v-btn color="orange" @click="submit">Wyślij</v-btn>
                <v-btn @click="clear">Wyczyść</v-btn>
            </v-form>
        </v-flex>
    </v-card>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: "CallToLogin",
    mixins: [validationMixin],

    validations: {
      email: {required, email},
    },
    data() {
      return {
        email: '',
      }
    },
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail');
        !this.$v.email.required && errors.push('E-mail is required');
        return errors;
      }
    },

    methods: {
      submit() {
        this.$v.$touch();
        this.$router.push({ path: 'register', query: { email: this.email }})
      },
      clear() {
        this.$v.$reset();
        this.email = '';
      }
    }
  }
</script>

<style scoped>

</style>
