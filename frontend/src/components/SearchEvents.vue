<template>
<div class="SearchEvents">
  <div class="title">
    <h2>Search Events</h2>
    <div class="line"></div>
  </div>
  <form @submit.prevent="submit">
    <div class="form-row">
      <div class="form-group">
        <h3>Title </h3><input type="text" v-model="title">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <h3>Start Date: </h3><input type="date" v-model="startDate">
      </div>
      <div class="form-group">
        <h3>End Date: </h3><input type="date" v-model="endDate">
      </div>
    </div>
    <button @click="$emit('search', events)">Submit</button>
  </form>
  <!-- <SearchResults v-bind:events="events"></SearchResults> -->
</div>
</template>

<script>
import axios from 'axios';
// import SearchResults from './SearchResults.vue';

export default {
  name: 'SearchEvents',
  data() {
    return {
      title: null,
      startDate: null,
      endDate: null,
      events: null,
    };
  },
  methods: {
    submit() {
      let body = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      axios.post('/api/events/search', body).then((res) => {
        // this.events = res.data.events;
        // console.log(this.events);
        this.$emit('results', res.data.events);
      }).catch((err) => {
        let message = {
          message: err,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.SearchEvents{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color:white;
}
</style>
