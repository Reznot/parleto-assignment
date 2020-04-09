import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: [
      {
        imie: "Jan",
        nazwisko: "Kowalski",
        dzial: "IT",
        wynagrodzenieKwota: "3000",
        wynagrodzenieWaluta: "PLN"
      },
      {
        imie: "Anna",
        nazwisko: "Bąk",
        dzial: "Administracja",
        wynagrodzenieKwota: "2400.50",
        wynagrodzenieWaluta: "PLN"
      },
      {
        imie: "Paweł",
        nazwisko: "Zabłocki",
        dzial: "IT",
        wynagrodzenieKwota: "3300",
        wynagrodzenieWaluta: "PLN"
      },
      {
        imie: "Tomasz",
        nazwisko: "Osiecki",
        dzial: "Administracja",
        wynagrodzenieKwota: "2100",
        wynagrodzenieWaluta: "PLN"
      },
      {
        imie: "Iwona",
        nazwisko: "Leihs-Gutowska",
        dzial: "Handlowiec",
        wynagrodzenieKwota: "3100",
        wynagrodzenieWaluta: "PLN"
      }
    ]
  },
  mutations: {},
  getters: {
    getEmployees(state) {
      return state.employees;
    }
  },
  actions: {},
  modules: {}
});
