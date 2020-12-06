<template>
  <div class="events page">
    <div class="grid">
      <div class="left">
          <AddEvents />
          <SearchEvents @results='display' />
      </div>
      <div class="right">
        <SearchResults :events='events' v-on:event-deleted="deleteEvent" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      events: [],
    };
  },
  created() {
    axios.get('/api/events/').then((res) => {
      this.events = res.data.events;
    });
  },
  methods: {
    display(results) {
      this.events = results;
    },
    deleteEvent(id) {
      this.events = this.events.filter((event) => event.event_id !== id);
    },
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

@media(min-width: 1200px) {
  .grid {
    display:grid;
    grid-template-columns:1fr 1fr;
  }
}
</style>
