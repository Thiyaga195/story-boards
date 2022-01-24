<template>
  <v-container fluid class="fill-height">
      <v-layout column align-center>
        <v-card-title primary-title>{{title}}</v-card-title>
      <v-card-text class="col-5">
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="signup"
          @keydown.prevent.enter
          >
            <v-text-field
              v-model="user.email"
              type="email"
              :rules="notEmptyRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.displayName"
              :rules="notEmptyRules"
              label="Display Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              :rules="notEmptyRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.confirmPassword"
              :rules="confirmPasswordRules"
              label="confirm Password"
              type="password"
              required
            ></v-text-field>
            <v-btn
              type="submit"
              :disabled="!valid"
              @click="signup"
              >Sign Up </v-btn>
        </v-form>
        <div class="text-center">
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        </v-card-text>
      </v-layout>
    </v-container>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { mapState } from 'vuex';

export default defineComponent({
  valid: false,
  name: 'signup',
  data: (vm) => ({
    title: 'SignUp',
    user: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
    valid: '',
    notEmptyRules: [
      (value) => !!value || 'Required',
    ],
    confirmPasswordRules: [
      (confirmPassword) => confirmPassword === vm.user.password || 'Passwords must match',
    ],

  }),

  beforeDestroy() {
    clearInterval(this.interval);
  },

  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },

  methods: {
    signup() {
      if (this.valid) {
        // eslint-disable-next-line no-console
        console.log('This form is valid');
        const { User } = this.$FeathersVuex.api;
        const user = new User(this.user);
        console.log(user);
        user.save()
          .then(() => {
            this.$router.push('/login');
          });
      }
    },
  },
});
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
