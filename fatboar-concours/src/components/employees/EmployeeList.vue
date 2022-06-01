<template>
  <v-container>
    <item-list
      model="employee"
      title="Liste des employés"
      :items="employees"
      :headers="headers"
      :loading="loading"
    >
    </item-list>
  </v-container>
</template>
<script lang="ts">
import { Employee } from "@/models";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EmployeeList extends Vue {
  public loading = false;
  get headers() {
    return [
      { text: "#", value: "id" },
      { text: "Name", value: "fullname" },
      { text: "Email", value: "email" },
    ];
  }
  get employees() {
    const employees = this.$store.getters["employeeStore/getAll"];
    return employees
      .filter((employee) => !!employee)
      .map((employee: Employee) => {
        return {
          ...employee,
          fullname: `${employee.firstname} ${employee.lastname.toUpperCase()}`,
        };
      });
  }

  mounted(): void {
    this.loading = true;
    this.$store
      .dispatch("employeeStore/fetchAll")
      .finally(() => (this.loading = false));
  }
}
</script>
