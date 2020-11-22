<template>
  <div class="search">
    <div class="title">
      <h2>Search Events</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="searchEvents">
      <div class="form-group">
        <input type="text" placeholder="Event Title" v-model="search">
      </div>
      <div class="form-group">
        <input type="date" placeholder="Start Date" v-model="search">
      </div>
      <div class="form-group">
        <input type="date" placeholder="End Date" v-model="search">
      </div>
      <button>Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchEvents',
  data() {
    return {
      events: [],
      search: '',
    };
  },
  methods: {
    searchEvents() {
      //TODO
    },
  },
};
</script>

<style lang="scss" scoped>
.search{
  padding: 20px;
  background-color:white;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
}
</style>
