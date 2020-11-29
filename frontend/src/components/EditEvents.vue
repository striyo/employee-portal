<template>
  <div class="EditEvents">
    <div class="edit">
      <h1>Edit Event: </h1>
      <form @submit.prevent="save">
        <div class="form-row">
          <div class="form-group">
            <input type="text" v-model="title" placeholder="Title">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <h3>Start Date: {{setDate(startDate)}}</h3><input type="date" v-model="startDate">
          </div>
          <div class="form-group">
            <h3>End Date: {{setDate(endDate)}}</h3><input type="date" v-model="endDate">
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
            <input type="text" v-model="bodyParagraph" placeholder="Description">
          </div>
        </div>
        <div class="form-row">
          <button class="cancel-btn" @click="$emit('close-edit')">Cancel</button>
          <button class="edit-btn" type="submit" >Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import SearchResults from './SearchResults.vue';

import axios from 'axios';

export default {
  name: 'EditEvents',
  data() {
    return {
      title: this.event.title,
      startDate: this.event.start_date,
      endDate: this.event.end_date,
      startTime: this.event.start_time,
      endTime: this.event.end_time,
      bodyParagraph: this.event.body,
      id: this.event.event_id,
    };
  },
  props: ['event', 'edit'],
  methods: {
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
    save() {
      let body = {
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime,
        bodyParagraph: this.bodyParagraph,
        id: this.id,
      };
      axios.post('/api/events/update', body).then(() => {
      }).catch((err) => {
        let message = {
          message: err,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.EditEvents{
position:fixed;
    padding:0;
    margin:0;

    top:0;
    left:0;

    width: 100%;
    height: 100%;
    background:rgba(255,255,255,0.8);
}
.edit{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  font-size: 15px;
  background-color:white;
  margin-top: 10%;
  margin-left: 30%;
  width: 50%;
}

.cancel-btn{
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

.edit-btn{
  padding: 10px 20px;
  font-size: 20px;
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
}
</style>
