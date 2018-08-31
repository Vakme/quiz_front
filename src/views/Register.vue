<template>
  <v-container fluid fill-height>
    Register {{ query_email }}
  </v-container>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      query_email: this.$route.query.email,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
