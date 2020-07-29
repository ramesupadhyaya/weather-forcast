<template>
  <div>
    <v-hover ref="hover" #default="{ hover }">
      <v-card
        :elevation="hover ? 24 : 0"
        :raised="hover"
        class="search-box"
        :class="hover ? 'search-hovered' : ''"
      >
        <v-card-text>
          <vuetify-google-autocomplete
            v-if="weatherByLocation"
            id="map"
            placeholder="Search Place"
            v-on:placechanged="getAddressData"
            outlined
            hide-details
          >
            <template #prepend-inner>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="black"
                    @click="showByLocation()"
                    v-bind="attrs"
                    v-on="on"
                    >room</v-icon
                  >
                </template>
                <span>Toogle to Add Latitude and Longitude</span>
              </v-tooltip>
            </template>
            <template #append>
              <v-icon
                :color="selectedDate ? 'primary' : 'black'"
                @click="showDateDialogToggle(true)"
                >event</v-icon
              >
            </template>
          </vuetify-google-autocomplete>
          <v-form v-else>
            <v-text-field
              label="Enter Latitude and Longitude"
              hint="Please give 38.9072, 77.0369 for 38.9072° N, 77.0369° W"
              persistent-hint
              v-model="la_lo"
              outlined
              placeholder="Please give 38.9072, 77.0369 for 38.9072° N, 77.0369° W"
              hide-details
              required
              :rules="[
                v => !!v || 'Field is required.',
                v =>
                  (!!v && /^([0-9]+.[0-9]+),([0-9]+.[0-9]+)$/.test(v)) ||
                  'Invalid Latitude and Longitude'
              ]"
            >
              <template #prepend-inner>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="black"
                      @click="showByLocation(true)"
                      v-bind="attrs"
                      v-on="on"
                      >map</v-icon
                    >
                  </template>
                  <span>Toogle to Location</span>
                </v-tooltip>
              </template>
              <template #append>
                <div>
                  <v-icon
                    :color="selectedDate ? 'primary' : 'black'"
                    @click="showDateDialogToggle(true)"
                    >event</v-icon
                  >
                  <v-icon :disabled="!la_lo" @click="seachByLaLo" class="ml-2"
                    >search</v-icon
                  >
                </div>
              </template>
            </v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-hover>
    <DateSelector v-if="showDateDialog" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";

import DateSelector from "./DateSelector";

export default {
  name: "SearchBox",
  components: {
    DateSelector,
    VuetifyGoogleAutocomplete
  },
  data: function() {
    return {
      weatherByLocation: true,
      la_lo: null
    };
  },

  computed: {
    ...mapState("search-weather", ["showDateDialog", "selectedDate"])
  },
  methods: {
    ...mapActions("search-weather", ["showDateDialogToggle", "getWeather"]),
    getAddressData(val) {
      this.getWeather({ latitude: val.latitude, longitude: val.longitude });
    },
    showByLocation(value) {
      this.weatherByLocation = value;
    },
    seachByLaLo() {
      const [latitude, longitude] = this.la_lo.split(",");
      this.getWeather({ latitude, longitude });
    }
  }
};
</script>
<style scoped>
.search-box {
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10%;
}
</style>
