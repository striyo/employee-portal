<template>
<div class="AddEvents">
  <div class="title">
    <h2>Add Events</h2>
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
    <div class="form-row">
      <div class="form-group">
        <h3>Start Time: </h3><input type="time" v-model="startTime">
      </div>
      <div class="form-group">
        <h3>End Time: </h3><input type="date" v-model="endTime">
      </div>
    </div>
    <button>Submit</button>
  </form>
</div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'AddEvents',
  data() {
    return {
      name: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      description: null,
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.AddEvents{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color:white;
  margin-bottom: 20px;
}
</style>
