<template>
<div class="SearchResults">
  <div class="title">
    <h2>Search Results</h2>
    <div class="line"></div>
  </div>
  <div
    v-for="event in resultArr"
    :key="event.id"
    class="grid"
  >
    <div class="left">
      <p>{{setDate(event.start_date)}}   @{{setTime(event.start_time)}}</p>
      <h2>{{event.title}}</h2>
    </div>
    <div class="right">
        <button class="edit-btn" @click="setEvent(event), edit=true">Edit</button>
        <button class="delete-btn" @click="deleteEvent">Delete</button>
    </div>
    <div v-if="edit==true">
      <EditEvents v-bind:event="event" v-on:close-edit="edit=false"/>
  </div>
  </div>
</div>
<!-- </div> -->
</template>

<script>
import axios from 'axios';
import EditEvents from './EditEvents.vue';

export default {
  name: 'SearchResults',
  props: {
    resultArr: Array,
  },
  components: {
    EditEvents,
  },
  data() {
    return {
      event: null,
      edit: false,
    };
  },
  watch: {
    resultArr(val) {
      this.events = val;
    },
  },

  methods: {
    setTime(time) {
      let theTime = (time.split(':'));
      let hour = theTime[0];
      let minute = theTime[1];
      if (hour < 12) {
        return (hour.toString()).concat(':').concat(minute.toString()).concat(' AM');
      }
      hour %= 12;
      return (hour.toString()).concat(':').concat(minute.toString()).concat(' PM');
    },
    setDate(paramDate) {
      let theDay = new Date(paramDate);
      let weekday = (theDay.toString().split(' ')[0]);
      let month = (theDay.toString().split(' ')[1]);
      let date = (theDay.toString().split(' ')[2]);
      let year = (theDay.toString().split(' ')[3]);
      return weekday.concat(', ').concat(date).concat(' ').concat(month)
        .concat(' ')
        .concat(year);
    },
    setEvent(param) {
      this.event = param;
    },
    deleteEvent(event) {
      console.log(`What is this ${event}`);
      let body = {
        event_id: event.event_id,
      };
      console.log(body);
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
    // view() {
    //   console.log(this.event);
    // },
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

button{
  background: none;
  border: none;
  text-align: start;
}
</style>
