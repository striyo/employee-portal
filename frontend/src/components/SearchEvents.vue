<template>
<div class="SearchEvents">
  <div class="title">
    <h2>Search Events</h2>
    <div class="line"></div>
  </div>
  <form @submit.prevent="submit">
    <div class="form-row">
      <div class="form-group">
        <h3>Name </h3><input type="text" v-model="name">
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
    <button>Submit</button>
  </form>
</div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'SearchEvents',
  data() {
    return {
      name: null,
      startDate: null,
      endDate: null,
    };
  },
  methods: {
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
