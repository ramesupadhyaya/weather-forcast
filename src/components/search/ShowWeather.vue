<template>
  <div v-on:mouseover="hovered = true" v-on:mouseleave="hovered = false">
    <v-carousel :value="value">
      <v-carousel-item v-for="(item, i) in weatherData.data" :key="i">
        <v-card dark class="weather-details" height="100vh">
          <v-card-title class="mx-2" style="font-size: 35px">
            {{ weatherData.city }}
            <v-spacer></v-spacer>
            <span>{{ currentTime }}</span>
            <v-spacer></v-spacer>

            {{ item.applicable_date }}

            <span style="font-size:20px" v-if="selectedDate">
              (Time: {{ getTime(item) }})
            </span>
          </v-card-title>
          <v-card-text>
            <v-row justify="center" class="ml-6 mt-10 pt-8">
              <v-col class="row d-flex justify-center" cols="3">
                <v-hover #default="{ hover }">
                  <v-card dark color="transparent" :elevation="hover ? 24 : 0">
                    <v-img
                      style="margin:auto"
                      width="150"
                      src="../../assets/humidity.svg"
                    >
                    </v-img>

                    <v-card-text class="weather-font-styles" style="">
                      <div>Humidity: {{ item.humidity }}</div>

                      <div>
                        Air Pressure:
                        {{ item.air_pressure.toString().slice(0, 5) }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>

              <v-col class="d-flex justify-center" cols="3">
                <v-hover #default="{ hover }">
                  <v-card dark color="transparent" :elevation="hover ? 24 : 0">
                    <v-img
                      style="margin:auto"
                      width="150"
                      src="../../assets/compass.svg"
                    >
                    </v-img>

                    <v-card-text class="weather-font-styles" style="">
                      <div>
                        Wind Direction: {{ item.wind_direction_compass }}
                      </div>

                      <div>
                        Wind Speed: {{ item.wind_speed.toString().slice(0, 4) }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col class="d-flex justify-center" cols="3">
                <v-hover #default="{ hover }">
                  <v-card dark color="transparent" :elevation="hover ? 24 : 0">
                    <v-img
                      style="margin:auto"
                      width="150"
                      src="../../assets/thermometer.svg"
                    >
                    </v-img>

                    <v-card-text class="weather-font-styles" style="">
                      <div>
                        Low: {{ item.min_temp.toString().slice(0, 4) }}&#8451;
                      </div>

                      <div>
                        High: {{ item.max_temp.toString().slice(0, 4) }}&#8451;
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col class="d-flex justify-center" cols="3">
                <v-hover #default="{ hover }">
                  <v-card dark color="transparent" :elevation="hover ? 24 : 0">
                    <v-img
                      style="margin:auto"
                      width="150"
                      :src="
                        `https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`
                      "
                    >
                    </v-img>

                    <v-card-text class="weather-font-styles" style="">
                      <div>State: {{ item.weather_state_name }}</div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "ShowWeather",

  data: function() {
    return {
      value: 0,
      autoInterval: null,
      hovered: false,
      currentDate: new Date(),
      currentDateIterval: null
    };
  },
  created() {
    this.autoInterval = setInterval(() => {
      if (!this.hovered)
        this.value = (this.value + 1) % this.weatherData.data.length;
    }, 2000);

    this.currentDateIterval = setInterval(
      () => (this.currentDate = new Date()),
      1000
    );
  },
  computed: {
    ...mapState("search-weather", ["weatherData", "selectedDate"]),
    currentTime() {
      return this.currentDate.toString().slice(0, 24);
    }
  },
  methods: {
    getTime(item) {
      const dateString = new Date(item.created).toISOString();

      return dateString.slice(11, dateString.length - 5);
    }
  },
  destroyed() {
    clearInterval(this.autoInterval);
    clearInterval(this.currentDateIterval);
  }
};
</script>
<style scoped>
.weather-details {
  background: rgba(0, 0, 0, 0.9);
  /* color: black; */
  font-size: 35px !important;
}
.weather-font-styles {
  font-size: 25px;
  line-height: 1.6;
  text-align: center;
}
</style>
