<template>
  <v-container fluid class="fill-height">
      <v-layout column align-center>
      <v-card-title primary-title>{{title}}</v-card-title>
      <v-card-text class="col-5">
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="login"
          @keydown.prevent.enter
          >
            <v-text-field
              v-model="user.email"
              type="email"
              :rules="notEmptyRules"
              label="User Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              :rules="notEmptyRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              :disabled="!valid"
              color="primary"
              :loading="isAuthenticatePending"
              >Login</v-btn>
        </v-form>
        </v-card-text>
      </v-layout>
    </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    valid: false,
    title: 'Login',
    user: {
      email: '',
      password: '',
    },
    notEmptyRules: [
      (value) => !!value || 'Required',
    ],
  }),

  computed: {
    ...mapState('auth', ['isAuthenticatePending']),
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    login() {
      if (this.valid) {
        this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(() => {
          console.log('login success');
          this.$router.push('/boards');
        }).catch((error) => {
          console.log('login error', error);
        });
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.login-btn {
    width : 100%;
    text-align: center;
}
</style>
