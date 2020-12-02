<template>
  <div class="ViewEvent">
    <div class="view">
      <div>
        <div class="form-row">
          <div class="form-group">
            <h1>{{title}}</h1>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <h3>Start Date: {{setDate(startDate)}}</h3>
          </div>
          <div class="form-group">
            <h3>End Date: {{setDate(endDate)}}</h3>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <h3>Start Time: {{setTime(startTime)}} </h3>
          </div>
          <div class="form-group">
            <h3>End Time: {{setTime(endTime)}} </h3>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <p><strong>About:</strong> {{bodyParagraph}}</p>
          </div>
        </div>
        <div class="form-row">
          <button class="close-btn" @click="$emit('close-view')">Close</button>
        </div>
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
  padding:0;
  margin:0;

  top:0;
  left:0;

  width: 100%;
  height: 100%;
  background:rgba(255,255,255,0.8);
}
.view{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  font-size: 15px;
  background-color:white;
  margin-top: 5%;
  margin-left: 30%;
  width: 60%;
  h1{
    font-size: 2rem;
  }
  p{
    margin: 1rem 0rem;
    //font-size: 2rem;
  }
}

@media(max-width: 1024px) {
  .view {
    width: 80%;
    margin-left:10% ;
    text-align: center;
  }
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
