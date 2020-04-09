<template>
  <v-container>
    <v-row justify="center">
      Filters
    </v-row>

    <v-row justify="center">
      <v-data-table
        :headers="headers"
        :items="employees"
        :items-per-page="5"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ item.imie }}</td>
              <td>{{ item.nazwisko }}</td>
              <td>{{ item.dzial }}</td>
              <td class="text-center">
                {{ item.wynagrodzenieKwota }} {{ item.wynagrodzenieWaluta }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import plDict from "../locale/plDict.json";

export default {
  data() {
    return {
      component: {
        name: "EmployeesDataTable"
      },
      headers: [
        {
          text: plDict.employees.headers.name,
          align: "left",
          sortable: true,
          value: "imie"
        },
        {
          text: plDict.employees.headers.surname,
          align: "left",
          sortable: true,
          value: "nazwisko"
        },
        {
          text: plDict.employees.headers.department,
          align: "left",
          sortable: true,
          value: "dzial"
        },
        {
          text: plDict.employees.headers.salary,
          align: "center",
          sortable: true,
          value: "wynagrodzenieKwota"
        }
      ],
      employees: []
    };
  },
  methods: {
    getEmployees() {
      return this.$store.getters.getEmployees;
    }
  },
  mounted() {
    this.employees = this.getEmployees();
    console.log(this.employees);
  }
};
</script>
