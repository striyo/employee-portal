<template>
  <div class="ViewEvents">
    <div class="title">
      <h2>Events</h2>
      <div class="line"></div>
    </div>
    <div v-for="event in events" :key="event.id" >
      <div class="event" v-on:click="viewEvent(event)">
        <p>{{setDate(event.start_date)}}   @{{setTime(event.start_time)}}</p>
        <h3>{{event.title}}</h3>
      </div>
    </div>
    <div v-if="view==true">
      <DisplayEvent v-bind:event="event" v-on:close-view="view=false"/>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios';
import DisplayEvent from '@/components/DisplayEvent.vue';

export default {
  name: 'ViewEvents',
  data() {
    return {
      event: null,
      events: null,
      view: false,
    };
  },
  components: {
    DisplayEvent,
  },
  created() {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let todayDate = `${year}-${month}-${day}`;
    let body = {
      title: '',
      startDate: todayDate,
      endDate: '9999-12-30',
    };
    axios.post('/api/events/search', body).then((res) => {
      this.events = res.data.events;
    }).catch((err) => {
      let message = {
        message: err.response.data.message,
        error: true,
      };
      this.$store.dispatch('pushNotifications', message);
      console.log(err.response.data.message);
    });
  },
  methods: {
    viewEvent(param) {
      this.view = true;
      this.event = param;
    },
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
  },
};
</script>

<style lang="scss" scoped>
.ViewEvents{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color:white;
}

h2{
  margin-right: 0px;
}
.event{
  margin: 5px 0px;
}
.event:hover{
  transform: scale(1.1, 1.1);
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  background-color: #1FBD70;
  color: white;
}
</style>
