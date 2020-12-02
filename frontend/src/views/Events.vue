<template>
  <div class="events page">
    <h1>Events</h1>
    <div class="grid">
      <div class="left">
          <AddEvents />
          <SearchEvents @results='display' />
      </div>
      <div class="right">
        <SearchResults :resultArr='resultsArr' />
      </div>
    </div>
  </div>
</template>

<script>
import AddEvents from '../components/AddEvents.vue';
import SearchEvents from '../components/SearchEvents.vue';
import SearchResults from '../components/SearchResults.vue';

export default {
  name: 'Events',
  components: {
    AddEvents,
    SearchEvents,
    SearchResults,
  },
  data() {
    return {
      resultsArr: [],
    };
  },
  methods: {
    display(variable) {
      this.resultsArr = variable;
    },
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

@media(max-width: 1200px) {
  .grid {
    display:grid;
    grid-template-columns:1fr;
  }
}
</style>
