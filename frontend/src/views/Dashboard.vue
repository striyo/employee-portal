<template>
  <div class="dashboard page">
    <div class="grid">
      <div class="col">
        <LogHours v-if="$store.state.user != null && $store.state.user.salaried == 0"/>
        <Todos />
      </div>
      <div class="col">
        <ViewEvents/>
      </div>
    </div>
  </div>
</template>

<script>
import ViewEvents from '../components/ViewEvents.vue';
import LogHours from '../components/LogHours.vue';
import Todos from '../components/Todos.vue';

export default {
  name: 'Dashboard',
  components: {
    ViewEvents,
    LogHours,
    Todos,
  },
};
</script>

<style lang="scss" scoped>
.grid{
  width:100%;
  display:grid;
  gap: 20px;
  grid-template-columns:1fr;
  .col{
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media(min-width: 1200px) {
  .grid {
    grid-template-columns:1fr 1fr;
  }
}
</style>
