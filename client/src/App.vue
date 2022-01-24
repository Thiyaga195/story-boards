<template>
  <v-app>
    <v-row class="ma-0 pa-20"
      style="flex: none; box-shadow: 2px 0px 8px #999999;"
       app>
      <v-col><h2>Demo App</h2></v-col>
      <v-col sm4 v-if="!user" align="right">
        <v-btn
          color="secondary"
          elevation="2" small
          class="mr-6" :to="{ name: 'login' }">Login</v-btn>
        <v-btn color="primary"
          elevation="2" small
          :to="{ name: 'SignUp' }">SignUp</v-btn>
      </v-col>
      <v-col sm4 v-if="user" align="right">
        <v-btn color="secondary" elevation="2" small @click="logout">LogOut</v-btn>
      </v-col>
    </v-row>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      // user: null,
    };
  },

  computed: {
    ...mapState('auth', { user: 'payload' }),
  },

  mounted() {
    this.authenticate().then(() => {
      this.$router.push('/boards');
    }).catch((error) => {
      console.error('not authenticated', error);
    });
  },

  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout().then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>

<style lang="stylus">
.v-toolbar {
  flex: none;
}
</style>
