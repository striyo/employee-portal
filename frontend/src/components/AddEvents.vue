<template>
<div class="AddEvents">
  <div class="title">
    <h2>Add Events</h2>
    <div class="line"></div>
  </div>
  <form @submit.prevent="submit">
    <div class="form-row">
      <div class="form-group">
        <input type="text" v-model="title" placeholder="Title">
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
        <h3>End Time: </h3><input type="time" v-model="endTime">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <input type="text" v-model="body" placeholder="Description">
      </div>
    </div>
    <button>Submit</button>
  </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddEvents',
  data() {
    return {
      title: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      description: null,
    };
  },
  methods: {
    submit() {
      let body = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime,
        body: this.body,
      };
      console.log(body);
      axios.post('/api/events/add', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(res.data.message);
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(err.response.data.message);
      });
    },
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
