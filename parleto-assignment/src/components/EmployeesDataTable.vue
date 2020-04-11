<template>
  <v-container>
    <!-- Employees Table -->
    <v-row v-if="isDataReady" justify="center">
      <v-col cols="10">
        <v-data-table
          v-model="employees"
          :headers="headers"
          :items="employees"
          hide-default-footer
          :loading="!isDataReady"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-row class="d-flex justify-space-between">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-5 mt-2"
                    small
                    icon
                    color="#4be7d4"
                    v-on="on"
                    @click="vd_filterEmployees = !vd_filterEmployees"
                  >
                    <v-icon>mdi-filter</v-icon>
                  </v-btn>
                </template>
                <span>Filtruj</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mr-5 mt-2"
                    small
                    icon
                    color="#4be7d4"
                    v-on="on"
                    @click="vd_addEmployee = !vd_addEmployee"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Dodaj pracownika</span>
              </v-tooltip>
            </v-row>
          </template>

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
      </v-col>
    </v-row>

    <!-- Sum of salaries by department -->
    <v-row v-if="isDataReady" justify="center">
      <v-data-table
        :headers="salarySumTableHeaders"
        :items="getSalarySumByDepartment()"
        :items-per-page="5"
        hide-default-footer
        class="elevation-1 mt-2"
      >
        <template v-slot:footer>
          <v-divider />
          <tr class="footerRow">
            <th>{{ totalSumHeader }}</th>
            <th>{{ totalSum }}</th>
          </tr>
        </template>
      </v-data-table>
    </v-row>

    <AddEmployeeDialog
      v-if="vd_addEmployee"
      v-model="vd_addEmployee"
      :departments="departments"
      @update="update()"
    />
    <FilterEmployees
      v-if="vd_filterEmployees"
      v-model="vd_filterEmployees"
      :departments="departments"
      :employees="employees"
      @filter="filterData"
      @clearFilters="employees = getEmployees()"
    />
  </v-container>
</template>

<script>
import plDict from "../locale/plDict.json";
import AddEmployeeDialog from "./AddEmployeeDialog.vue";
import FilterEmployees from "./FilterEmployees.vue";

export default {
  components: { AddEmployeeDialog, FilterEmployees },
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
      departments: [],
      totalSum: null,
      isDataReady: false,

      vd_addEmployee: false,
      vd_filterEmployees: false
    };
  },
  computed: {
    totalSumHeader() {
      return plDict.salarySumTable.headers.totalSum;
    }
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
      tableData.forEach(el => {
        tmpSum += el.sum;
      });
      this.totalSum = tmpSum;
      return tableData;
    },
    getDepartments() {
      let tmpDepartments = [];
      this.employees.forEach(el => {
        tmpDepartments.push(el.dzial);
      });
      return [...new Set(tmpDepartments)];
    },
    update() {
      this.employees = this.getEmployees();
    },
    filterData(value) {
      console.log(value);
      let empToFilter = this.getEmployees()
      const filtered = empToFilter.filter(el => {
        return (el.imie.toLowerCase().includes(value.person.toLowerCase()) || el.nazwisko.toLowerCase().includes(value.person.toLowerCase())) 
        && (value.department.length ? value.department.includes(el.dzial) : true) 
        && (value.amountFrom ? el.wynagrodzenieKwota >= value.amountFrom : true)
        && (value.amountTo ? el.wynagrodzenieKwota <= value.amountTo : true);
      })
      this.employees = filtered;
    }
  },
  mounted() {
    this.employees = this.getEmployees();
    this.departments = this.getDepartments();
    this.isDataReady = true;
  }
};
</script>

<style scoped>
.footerRow {
  vertical-align: middle !important;
}
</style>
