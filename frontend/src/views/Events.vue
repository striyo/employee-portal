<template>
  <div class="events page">
    <h1>Events</h1>
    <div class="grid">
      <div class= "left">
        <div>
          <AddEvents/>
          <SearchEvents/>
        </div>
      </div>
      <div class="right">
        <SearchResults/>
      </div>
    </div>
  </div>
</template>

<script>
import AddEvents from '../components/AddEvents.vue';
import SearchEvents from '../components/SearchEvents.vue';
import SearchResults from '../components/SearchResults.vue';

export default {
  components: {
    AddEvents,
    SearchEvents,
    SearchResults,
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
