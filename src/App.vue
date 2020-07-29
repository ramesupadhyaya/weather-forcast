<template>
  <v-app>
    <v-card color="white" class="main-content mb-2">
      <v-img
        src="./assets/main_background.jpg"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="100vh"
      >
        <v-hover v-slot:default="{ hover }">
          <v-app-bar
            :class="hover || weatherData.id ? 'front-face' : 'back-face'"
            transparent
            height="100%"
            app
            dark
          >
            <div class="header-font d-flex align-center">
              Weather Forecast
            </div>

            <v-spacer></v-spacer>

            <v-btn
              v-if="weatherData.id"
              @click="resetSearchedData"
              class="mr-4"
              x-large
              icon
            >
              <v-icon>search</v-icon>
            </v-btn>
          </v-app-bar>
        </v-hover>

        <v-card-text>
          <v-overlay
            :absolute="true"
            :opacity="0.75"
            color="black"
            :value="loading"
          >
            <v-progress-circular indeterminate :size="50" color="primary" />
          </v-overlay>
          <Search />
        </v-card-text>
      </v-img>
    </v-card>
  </v-app>
</template>

<script>
import * as searchWeatherStore from "./store/search";

import Search from "./components/search";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: { Search },
  beforeCreate() {
    this.$store.registerModule("search-weather", searchWeatherStore);
  },
  computed: {
    ...mapState("search-weather", ["weatherData", "loading"])
  },
  methods: {
    ...mapActions("search-weather", ["resetSearchedData"])
  },
  destroyed() {
    this.$store.unregisterModule("search-weather");
  }
};
</script>

<style scoped>
.header-font {
  font-weight: bolder;
  font-size: 30px;
  opacity: 1;
}
.main-content {
  max-height: 100%;
  overflow-y: hidden;
  position: fixed;
  top: 0;
  left: 0;
}
.v-app-bar {
  transition: opacity 0.4s ease-in-out;
}
.back-face {
  opacity: 0.7;
}

.front-face {
  opacity: 0.95;
}
</style>
