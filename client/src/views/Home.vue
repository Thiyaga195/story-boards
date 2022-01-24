<template>
  <v-container>
    <v-row align-content="center" justify="center">
      <div class="text-center">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-row>
  </v-container>
</template>
