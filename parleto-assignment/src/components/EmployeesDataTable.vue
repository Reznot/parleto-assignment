<template>
  <v-container>
    <v-row justify="center">
      Filters
    </v-row>

    <!-- Employees Table -->
    <v-row justify="center">
      <v-data-table
        :headers="headers"
        :items="employees"
        :items-per-page="5"
        hide-default-footer
        :loading="!isDataReady"
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

    <!-- Sum of salaries by department -->
    <v-row justify="center">
      <v-data-table
        :headers="salarySumTableHeaders"
        :items="getSalarySumByDepartment()"
        :items-per-page="5"
        hide-default-footer
        class="elevation-1 mt-2"
      >
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
      salarySumTableHeaders: [
        {
          text: plDict.salarySumTable.headers.department,
          align: "left",
          sortable: true,
          value: "dzial"
        },
        {
          text: plDict.salarySumTable.headers.sum,
          align: "center",
          sortable: true,
          value: "sum"
        }
      ],
      employees: [],
      totalSum: null,
      isDataReady: false
    };
  },
  methods: {
    getEmployees() {
      return this.$store.getters.getEmployees;
    },
    getSalarySumByDepartment() {
      let tableData = [];

      this.employees.forEach(employee => {
        let idx = tableData.findIndex(el => el.dzial === employee.dzial);
        if (idx !== -1) {
          tableData[idx].sum += parseFloat(employee.wynagrodzenieKwota);
        } else {
          tableData.push({
            dzial: employee.dzial,
            sum: parseFloat(employee.wynagrodzenieKwota)
          });
        }
      });

      let tmpSum = 0;
      tableData.forEach(el => { //! Zrobic w promise
        tmpSum += el.sum;
      });
      this.totalSum = tmpSum;
      console.log(this.totalSum)
      return tableData;
    }
  },
  mounted() {
    this.employees = this.getEmployees();
    this.isDataReady = true;
  }
};
</script>
