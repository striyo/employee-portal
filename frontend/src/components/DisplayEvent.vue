<template>
  <div class="ViewEvent">
    <div class="view">
      <p style="font-size: 20px; float:right; cursor: pointer" @click="$emit('close-view')">X</p>
      <div class="title">
          <h2>{{title}}</h2>
          <div class="line"></div>
      </div>
      <div class="dates">
        <p style="color:#777">{{event.formatted_start_date}}{{`${event.formatted_start_date == event.formatted_end_date ? ` @${event.formatted_start_time} - ${event.formatted_end_time}` : ` @${event.formatted_start_time} - ${event.formatted_end_date} ${event.formatted_end_time}`}`}}</p>
      </div>
      <div class="info">
        <p style="white-space: pre-wrap;">{{bodyParagraph}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import SearchResults from './SearchResults.vue';

export default {
  name: 'ViewEvent',
  data() {
    return {
      title: this.event.title,
      startDate: this.event.start_date,
      endDate: this.event.end_date,
      startTime: this.event.start_time,
      endTime: this.event.end_time,
      formatted_start_date: this.event.formatted_start_date,
      formatted_end_date: this.event.formatted_end_date,
      formatted_start_time: this.event.formatted_start_time,
      formatted_end_time: this.event.formatted_end_time,
      bodyParagraph: this.event.body,
    };
  },
  props: ['event', 'view'],
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
  },
};
</script>

<style lang="scss" scoped>
.ViewEvent{
  position:fixed;
  top:0;
  left:0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: auto;
  background:rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.view{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  font-size: 16px;
  background-color:white;
  width:90%;
  max-width: 800px;
}

.close-btn{
  padding: 10px 20px;
  font-size: 20px;
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
