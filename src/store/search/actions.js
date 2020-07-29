import axios from "axios";

export const actions = {
  showDateDialogToggle({ commit }, value) {
    commit("setShowDateDialog", value);
  },

  setSelectedDate({ commit }, date) {
    commit("setSelectedDate", date);
  },
  async getWeather({ commit, state, dispatch }, { latitude, longitude }) {
    commit("setLoading", true);

    if (state.whereOnEarth[`${latitude},${longitude}`]) {
      await dispatch(
        "getWeatherDetailsFromWhereOnEarth",
        state.whereOnEarth[`${latitude},${longitude}`]
      );

      commit("setLoading", false);
    }
    try {
      const { data: whereOnEarthDetails } = await axios({
        method: "get",
        url: `http://localhost:8000/https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`
      });

      whereOnEarthDetails.forEach(detail =>
        commit("setWhereOnEarthDetail", {
          key: detail.latt_long,
          value: { id: detail.woeid, cityName: detail.title }
        })
      );

      // also set `${latitude},${longitude}` value to first result as its the most nearest weather forcast
      // available with us
      commit("setWhereOnEarthDetail", {
        key: `${latitude},${longitude}`,
        value: {
          id: whereOnEarthDetails[0].woeid,
          cityName: whereOnEarthDetails[0].title
        }
      });

      await dispatch("getWeatherDetailsFromWhereOnEarth", {
        id: whereOnEarthDetails[0].woeid,
        cityName: whereOnEarthDetails[0].title
      });

      commit("setLoading", false);
    } catch (err) {
      console.error(err);
      return dispatch("setNoRecords", true);
    }
  },

  async getWeatherDetailsFromWhereOnEarth(
    { commit, state, dispatch },
    details
  ) {
    const selectedDate = state.selectedDate;
    const weatherData = await axios({
      method: "get",
      url: `http://localhost:8000/https://www.metaweather.com/api/location/${
        details.id
      }${
        selectedDate
          ? `/${new Date(selectedDate)
              .toISOString()
              .slice(0, 10)
              .replace(/-/g, "/")}`
          : ""
      }`
    });

    // with date API is giving different response
    const weatherDataList = selectedDate
      ? weatherData.data.slice(0)
      : weatherData.data.consolidated_weather;

    if (!weatherDataList.length) {
      return dispatch("setNoRecords", true);
    }

    commit("setWeatherData", {
      id: details.id,
      city: details.cityName,
      data: weatherDataList.slice(0, 5)
    });
  },
  resetSearchedData({ commit }) {
    commit("setLoading", true);
    commit("setWeatherData", {});
    // just to improve User Experience
    setTimeout(() => commit("setLoading", false), 500);
  },
  setNoRecords({ commit }, value) {
    commit("setNoRecords", value);
  }
};
