<template>
  <div class="events page">
    <h1>Events</h1>
    <AddEvents/>
  </div>
</template>

<script>
import AddEvents from '../components/AddEvents.vue';

export default {
  components: {
    AddEvents,
  },

};
</script>

<style lang="scss" scoped>

h1{
  margin-bottom: 2rem;
  margin-left:2rem;
}

.grid{
  width:100%;
  display:grid;
  gap: 20px;
  grid-template-columns:1fr;
}

@media(min-width: 1024px) {
  .grid {
    grid-template-columns:1fr 1fr;
  }
}
</style>
