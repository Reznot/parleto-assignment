<template>
  <!-- <v-dialog v-model="value" persistent width="600px"> -->
  <v-card>
    <v-card-title>
      <v-row class="title mx-1" justify="space-between">
        <span class="title mx-1">Filtruj pracowników</span>
        <v-btn icon color="red lighten-1" @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-card-title>

    <v-card-text class="pb-0">
      <v-row class="mx-1">
        <v-col cols="3">
          <v-text-field v-model="filters.person" label="Osoba" clearable />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="filters.department"
            :items="departments"
            label="Dział"
            multiple
          ></v-select>
        </v-col>

        <v-col cols="3">
          <v-select
            v-model="filters.amountFrom"
            :items="amounts"
            label="Wynagrodzenie - od"
            clearable
          />
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="filters.amountTo"
            :items="amounts"
            label="Wynagrodzenie - do"
            clearable
          />
        </v-col>
      </v-row>
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
  <!-- </v-dialog> -->
</template>

<script>
export default {
  props: ["value", "employees", "departments"],
  data() {
    return {
      component: {
        name: "FilterEmployees"
      },
      filters: {
        person: "",
        department: [],
        amountFrom: null,
        amountTo: null
      },
      amounts: [1000, 2000, 3000, 4000, 5000],
      snackbar: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
    filter() {
      this.$emit("filter", this.filters);
    },
    clearFilter() {
      this.filters = {
        person: "",
        department: [],
        amountFrom: null,
        amountTo: null
      };
      this.$emit("clearFilters", true);
    }
  },
  watch: {
    "filters.amountFrom": function() {
      if (this.filters.amountFrom && this.filters.amountTo) {
        if (this.filters.amountFrom > this.filters.amountTo) {
          this.filters.amountTo = null;
        }
      }
    },
    "filters.amountTo": function() {
      if (this.filters.amountFrom && this.filters.amountTo) {
        if (this.filters.amountFrom > this.filters.amountTo) {
          this.filters.amountFrom = null;
        }
      }
    },
    "filters.person": function() {
      if (!this.filters.person) {
        this.filters.person = "";
      }
    }
  }
};
</script>
