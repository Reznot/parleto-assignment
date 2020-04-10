<template>
  <v-dialog v-model="value" persistent width="600px">
    <v-card>
      <v-card-title>
        <span class="title">Dodaj pracownika</span>
      </v-card-title>

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
      newEmployee: {}
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
      console.log("save");
      this.closeDialog();
    }
  }
};
</script>
