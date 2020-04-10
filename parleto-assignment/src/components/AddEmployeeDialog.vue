<template>
  <v-dialog v-model="value" persistent width="600px">
    <v-card>
      <v-card-title>
        <span class="title">Dodaj pracownika</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="rf_newEmployee">
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="newEmployee.imie"
                  :rules="[rules.required]"
                  placeholder="Imie"
                  required
                />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="newEmployee.nazwisko"
                  placeholder="Nazwisko"
                  :rules="[rules.required]"
                  required
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="newEmployee.dzial"
                  :items="departments"
                  :rules="[rules.required]"
                  placeholder="Dział"
                  required
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="newEmployee.wynagrodzenieKwota"
                  :rules="[rules.required]"
                  placeholder="Wynagrodzenie"
                  type="number"
                  required
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="newEmployee.wynagrodzenieWaluta"
                  :items="currencies"
                  :rules="[rules.required]"
                  placeholder="Waluta"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-row class="ma-1" justify="space-between">
          <v-btn text color="red lighten-1" @click="closeDialog()">
            Anuluj
          </v-btn>
          <v-btn text color="#4be7d4" @click="save()">
            Zapisz
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["value", "departments"],
  data() {
    return {
      component: {
        name: "AddEmployeeDialog"
      },
      newEmployee: {},
      currencies: ["PLN", "EUR", "USD"],
      rules: {
        required: value => !!value || "Pole obowiązkowe!"
      }
    };
  },
  computed: {
    dialog() {
      return this.value;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
    save() {
      if (this.$refs.rf_newEmployee.validate()) {
        this.$store.dispatch("addEmployee", this.newEmployee);
        this.$emit("update", true);
        this.closeDialog();
      }
    }
  }
};
</script>
