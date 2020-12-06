<template>
<div class="SearchResults">
  <div class="title">
    <h2>Search Results</h2>
    <div class="line"></div>
  </div>
  <div
    v-for="event in events"
    :key="event.event_id"
    class="grid"
    style="border-bottom: 1px solid #ccc"
  >
    <div class="left">
      <p>{{event.formatted_start_date}}{{`${event.formatted_start_date == event.formatted_end_date ? ` @${event.formatted_start_time} - ${event.formatted_end_time}` : ` @${event.formatted_start_time} - ${event.formatted_end_date} ${event.formatted_end_time}`}`}}</p>
      <h3>{{event.title}}</h3>
    </div>
    <div class="right">
      <button class="edit-btn" @click="setEvent(event); edit=true">Edit</button>
      <button class="delete-btn" @click="deleteEvent(event)">Delete</button>
    </div>
    <div v-if="edit==true">
      <EditEvents v-bind:event="this.event" v-on:close-popup="edit=false"/>
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
  props: ['events'],
  components: {
    EditEvents,
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    setTime(time) {
      let theTime = (time.split(':'));
      let hour = theTime[0];
      let minute = theTime[1];
      if (hour < 12) {
        return (hour.toString()).concat(':').concat(minute.toString()).concat(' AM');
      }
      if (hour === '24' || hour === '12') {
        return ('12'.concat(':')).concat(minute.toString()).concat(' PM');
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
        this.$emit('event-deleted', event.event_id);
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
  grid-template-columns:1fr;
  padding: 10px 0;
  margin-bottom: 10px;
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

@media(min-width:600px){
  .grid{
    grid-template-columns: 1fr 200px;
  }
}
@media(min-width:1200px){
  .grid{
    grid-template-columns: 1fr;
  }
}

@media(min-width:1300px){
  .grid{
    grid-template-columns: 1fr 200px;
  }
}

</style>
