<template>
  <div class="dashboard page">
    <h1>Dashboard</h1>
    <div class="grid">
      <LogHours/>
      <ViewEvents/>
    </div>
  </div>
</template>

<script>
import ViewEvents from '../components/ViewEvents.vue';
import LogHours from '../components/LogHours.vue';

export default {
  name: 'Dashboard',
  components: {
    ViewEvents,
    LogHours,
  },
};
</script>

<style>
.grid{
  width:100%;
  display:grid;
  gap: 20px;
  grid-template-columns:1fr 1fr;
}

@media(max-width: 1024px) {
  .grid {
    grid-template-columns:1fr;
  }
}
</style>
