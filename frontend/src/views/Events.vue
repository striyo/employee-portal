<template>
  <div class="events page">
    <div class="grid">
      <div class="left">
        <AddEvents />
        <SearchEvents/>
      </div>
      <div class="right">
        <SearchEventsResults />
      </div>
    </div>
  </div>
</template>

<script>
// import AddEvents from '../components/AddEvents.vue';
import SearchEvents from '../components/SearchEvents.vue';
import SearchEventsResults from '../components/SearchEventsResults.vue';

export default {
  components: {
    SearchEvents,
    SearchEventsResults,
  },
};
</script>

<style lang="scss" scoped>
.grid{
  width:100%;
  display:grid;
  gap: 20px;
  grid-template-columns:1fr;
}

</style>
