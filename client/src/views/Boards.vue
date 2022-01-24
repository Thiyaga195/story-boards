<template>
  <v-container>
        <v-progress-circular
              v-if="creating"
              indeterminate
              color="primary"
            ></v-progress-circular>
        <div v-if="!loading" style="display:inline-block">
          <v-flax sm3 v-for="board in boards" :key="board._id">
            <v-card style="width: 200px; margin:10px; display: inline-block;">
              <v-img
                :src="board.background"
                contain></v-img>
              <v-card-title primary-title>
                <div class="grey--text text-darken-1 mb-2">{{board.name}}</div>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="primary"
                  :to="{ name: 'board', params: { id: board._id } }"
                  >Go</v-btn>
              </v-card-actions>
            </v-card>
          </v-flax>
        </div>
        <v-flex style="display:inline-block">
        <v-card class="mx-auto" style="width: 220px; padding: 10px;">
            <v-card-title
              style="justify-content:center">
                {{title}}
            </v-card-title>
            <v-form
                v-if="!creating"
                v-model="valid"
                @submit.prevent="createBoard"
                @keydown.prevent.enter
                >
                  <v-text-field
                    v-model="board.name"
                    :rules="notEmptyRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="board.background"
                    :rules="notEmptyRules"
                    label="Background"
                    required
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    :disabled="!valid"
                    >Create</v-btn>
              </v-form>
        </v-card>
        </v-flex>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default ({
  name: 'Boards',

  data: () => ({
    valid: false,
    title: 'Create Board',
    board: {
      name: '',
      background: '',
    },
    notEmptyRules: [
      (value) => !!value || 'Required',
    ],
  }),

  mounted() {
    this.findBoards({ query: {} })
      .then((response) => {
        const boards = response.data || response;
        console.log(boards);
      });
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    createBoard() {
      const { Board } = this.$FeathersVuex.api;
      const board = new Board(this.board);
      board.save();
      this.board = {
        name: '',
        background: '',
      };
    },
  },

  computed: {
    ...mapState('boards', {
      loading: 'isFindPending',
      creating: 'isCreatePending',
    }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },
  },

});
</script>
