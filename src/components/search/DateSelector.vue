<template>
  <v-dialog persistent :value="true" max-width="350">
    <v-card>
      <v-card-title>Select Date</v-card-title>
      <v-card-text>
        <v-date-picker
          :value="selectedDate"
          @input="setSelectedDate"
          no-title
          show-current
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="
              setSelectedDate();
              showDateDialogToggle();
            "
            >Reset</v-btn
          >
          <v-btn
            text
            color="primary"
            :disabled="!selectedDate"
            @click="showDateDialogToggle()"
            >OK</v-btn
          >
        </v-date-picker>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DateSelector",
  computed: {
    ...mapState("search-weather", ["selectedDate"])
  },
  methods: {
    ...mapActions("search-weather", ["setSelectedDate", "showDateDialogToggle"])
  }
};
</script>
