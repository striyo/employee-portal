<template>
<div class="SearchResults">
  <div class="title">
    <h2>Search Results</h2>
    <div class="line"></div>
  </div>
  <div
    v-for="event in resultArr"
    :key="event.id"
  >
    <div class="left">
      <p>{{event.startDate}} {{event.startTime}}</p>
      <h2>{{event.title}}</h2>
    </div>
    <div class="right">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn" @click="getRid">Delete</button>
    </div>
  </div>
</div>
<!-- </div> -->
</template>

<script>
import axios from 'axios';

export default {
  name: 'SearchResults',
  props: {
    resultArr: Array,
  },
  data() {
    return {
      events: [{ event_id: '3' }],
    };
  },
  watch: {
    resultArr(val) {
      this.events = val;
    },
  },

  methods: {
    getRid() {
      let body = {
        event_id: 1,
      };
      axios.post('/api/events/delete', body).then((res) => {
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
.SearchResults{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color:white;
}
.grid{
  width:100%;
  display:grid;
  gap: 20px;
  //grid-row:1/span 2;
  grid-template-columns:1fr 1fr;
}
.edit-btn{
  padding: 10px 20px;
  font-size: 15px;
  border:none;
  background-color:#1FBD70;
  color:white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover{
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  }
  margin-right: 20px;
}
.delete-btn{
  padding: 10px 20px;
  font-size: 15px;
  border:none;
  background-color:#bd241f;
  color:white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover{
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  }
  margin-right: 20px;
}
</style>
