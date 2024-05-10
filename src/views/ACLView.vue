<template>
  <div id="ACLView">
    <UserACLTable />
    <div style="margin: 20px 20px" />
    <ProcessACLTable />
  </div>
</template>

<script>
import UserACLTable from "@/components/UserACLTable.vue";
import ProcessACLTable from "@/components/ProcessACLTable.vue";

export default {
  name: "ACLView",
  components: { UserACLTable, ProcessACLTable },
};
</script>

<style scoped>
#ACLView {
  max-width: 1500px;
  margin: 0 auto;
}
</style>
