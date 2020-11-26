<template>
  <div class="events page">
    <h1>Events</h1>
    <div class="grid">
      <div class="left">
          <AddEvents />
          <SearchEvents/>
      </div>
    </div>
  </div>
</template>

<script>
import AddEvents from '../components/AddEvents.vue';
import SearchEvents from '../components/SearchEvents.vue';

export default {
  name: 'Events',
  data() {
    return {
      events: null,
    };
  },
  components: {
    AddEvents,
    SearchEvents,
  },
};
</script>

<style lang="scss" scoped>
.grid{
  width:100%;
  display:grid;
  gap: 20px;
  grid-template-columns:1fr 1fr;
}
</style>
