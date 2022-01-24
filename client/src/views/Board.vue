<template>
  <v-container>
    <v-row wrap style="margin-top: 25px;">
        <v-progress-circular
              v-if="loadingBoard || loadingLists"
              indeterminate
              color="primary"
            ></v-progress-circular>
        <v-flax xs12>
            <h2 v-if="board">{{board.name}}</h2>
        </v-flax>
        <div v-if="!loadingLists">
          <v-flax sm3 v-for="list in lists" :key="list._id">
            <v-card
                style="width: 200px; margin:0px; display: inline-block; margin-right: 10px;">
              <v-img
                :src="board.background"
                contain></v-img>
              <v-card-title primary-title>
                <div class="grey--text text-darken-1 mb-2">{{list.name}}</div>
              </v-card-title>
            </v-card>
          </v-flax>
        </div>
        <v-flex>
        <v-card class="mx-auto" style="width: 225px; padding: 10px;">
            <v-card-title
                style="justify-content:center">
                    {{title}}
                </v-card-title>
            <v-form
                v-if="!creatingList"
                v-model="validList"
                @submit.prevent="createList"
                @keydown.prevent.enter
                >
                  <v-text-field
                    v-model="list.name"
                    :rules="notEmptyRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    :disabled="!validList"
                    >Create List</v-btn>
              </v-form>
        </v-card>
        </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default ({
  name: 'Board',

  data: () => ({
    board: { },
    title: 'Create List',
    validList: false,
    list: {
      name: '',
      order: 0,
      archived: false,
    },
    notEmptyRules: [
      (value) => !!value || 'Required',
    ],
  }),

  mounted() {
    this.getBoard(this.$route.params.id)
      .then((response) => {
        this.board = response.data || response;
      });
    this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    }).then((response) => {
      const lists = response.data || response;
      console.log(lists);
    });
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    createList() {
      if (this.validList) {
        const { Lists } = this.$FeathersVuex.api;
        this.list.boardId = this.$route.params.id;
        const list = new Lists(this.list);
        list.save();
        this.list = {
          name: '',
          order: 0,
          archived: false,
        };
      }
    },
  },

  computed: {
    ...mapState('boards', {
      loadingBoard: 'isGetPending',
    }),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending',
    }),
    ...mapGetters('lists', { findListsInStore: 'find' }),
    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
  },

});
</script>
