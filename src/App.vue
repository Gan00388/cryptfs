<template>
  <div id="app">
    <ACLView />
    <div class="footer" />
  </div>
</template>

<script>
import ACLView from "@/views/ACLView.vue";

export default {
  name: "App",
  components: { ACLView },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.footer {
  height: 50px;
  width: 100%;
}
</style>
