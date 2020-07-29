export const mutations = {
  setShowDateDialog(state, value = false) {
    state.showDateDialog = value;
  },
  setSelectedDate(state, date = null) {
    state.selectedDate = date;
  },

  setLoading(state, value) {
    state.loading = value;
  },
  setWhereOnEarthDetail(state, { key, value }) {
    state.whereOnEarth = {
      ...state.whereOnEarth,
      [key]: value
    };
  },
  setWeatherData(state, data) {
    state.weatherData = data;
  },
  setNoRecords(state, value) {
    state.noRecords = value;
  }
};
