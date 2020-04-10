<template>
  <v-dialog v-model="value" persistent width="600px">
    <v-card>
      <v-card-title>
        <v-row justify="space-between">
          <span class="title ml-1">Filtruj pracowników</span>
          <v-btn icon color="red lighten-1" @click="closeDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="filters.person" label="Osoba" />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="filters.department"
                :items="departments"
                label="Dział"
                multiple
              ></v-select>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="filters.amountFrom"
                :items="amounts"
                label="Wynagrodzenie - od"
                clearable
              />
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="filters.amountTo"
                :items="amounts"
                label="Wynagrodzenie - do"
                clearable
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-row class="mx-1" justify="space-between">
          <v-btn text color="blue lighten-1" @click="clearFilter()">
            Wyczyść
          </v-btn>
          <v-btn text color="#4be7d4" @click="filter()">
            Filtruj
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="snackbar">
      {{}}
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  props: ["value", "employees", "departments"],
  data() {
    return {
      component: {
        name: "FilterEmployees"
      },
      filters: {},
      amounts: [1000, 2000, 3000, 4000, 5000],
      snackbar: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
    filter() {
      console.log("filter");
    },
    clearFilter() {
      console.log("clear fitlers");
    }
  },
  watch: {
    "filters.amountFrom": function() {
      if (this.filters.amountFrom && this.filters.amountTo) {
        if (this.filters.amountFrom > this.filters.amountTo) {
          this.filters.amountTo = "";
        }
      }
    },
    "filters.amountTo": function() {
      if (this.filters.amountFrom && this.filters.amountTo) {
        if (this.filters.amountFrom > this.filters.amountTo) {
          this.filters.amountFrom = "";
        }
      }
    }
  }
};
</script>
