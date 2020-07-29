<template>
  <v-layout>
    <v-flex>
      <v-fade-transition>
        <SearchBox v-if="!weatherData.id" />
      </v-fade-transition>
      <v-fab-transition>
        <ShowWeather v-if="weatherData.id" />
      </v-fab-transition>

      <v-snackbar timeout="-1" :value="noRecords" color="error" top>
        No Records Available for Mentioned Date/Place
        <template v-slot:action="{ attrs }">
          <v-btn dark icon text v-bind="attrs" @click="setNoRecords()">
            <v-icon>close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState, mapActions } from "vuex";
import SearchBox from "./SearchBox";
import ShowWeather from "./ShowWeather";
export default {
  name: "Search",
  components: {
    SearchBox,
    ShowWeather
  },

  computed: {
    ...mapState("search-weather", ["loading", "weatherData", "noRecords"])
  },
  methods: {
    ...mapActions("search-weather", ["setNoRecords"])
  }
};
</script>
