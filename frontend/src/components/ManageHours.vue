<template>
  <div class="ManageHours">
    <div class="title">
      <h2>View Hour</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="search">
      <div class="form-row">
        <div class="form-group">
          <input type="text" placeholder="Name" required v-model="searchID">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Start Date</h3><input type="date" v-model="startDate">
        </div>
        <div class="form-group">
          <h3>End Date</h3><input type="date" v-model="endDate">
        </div>
      </div>
      <button>Search</button>
    </form>
    <div class="HoursDisplay" v-for="hour in hours" :key="`hour_${hour.hours_id}`">
      <div class="result">
        <h3>{{setDate(hour.date)}}</h3>
        <div class="row">
          <div class="time-slots">
            <p>Time In</p>
            <input type="time" v-model="hour.clock_in">
          </div>
          <div class="time-slots">
            <p>Meal In</p>
            <input type="time" v-model="hour.meal_in">
          </div>
          <div class="time-slots">
            <p>Meal Out</p>
            <input type="time" v-model="hour.meal_out">
          </div>
          <div class="time-slots">
            <p>Time Out</p>
            <input type="time" v-model="hour.clock_out">
          </div>
          <div class="time-slots">
            <p>Total</p>
            <p>{{hour.total}}</p>
          </div>
          <div>
            <button class="save-btn" @click=save(hour.clock_in,hour.meal_in,hour.meal_out,hour.clock_out,hour.date,hour.user_id)>Save</button>
          </div>
          <div>
            <button class="delete-btn" @click=deleteHours(hour.hours_id)>Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageHours',
  data() {
    return {
      searchID: '',
      startDate: '',
      endDate: '',
      hours: [],
      // result: '',
    };
  },
  methods: {
    search() {
      let body = {
        searchID: this.searchID,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      axios.post('/api/hours/admin/search', body).then((res) => {
        this.hours = res.data.hour;
      }).catch((err) => {
        let message = {
          message: err,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
    save(timeIn, mealIn, mealOut, timeOut, Date, userID) {
      let body = {
        timein: timeIn,
        mealout: mealOut,
        mealin: mealIn,
        timeout: timeOut,
        user_id: userID,
        date: Date,
      };
      axios.post('/api/hours/update', body).then((res) => {
        this.hours = res.data.hour;
      }).catch((err) => {
        let message = {
          message: err,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
    deleteHours(hourID) {
      let body = {
        hour_id: hourID,
      };
      axios.post('/api/hours/delete', body).then(() => {
      }).catch((err) => {
        let message = {
          message: err,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
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
  },
};
</script>

<style lang="scss" scoped>
.ManageHours{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  background-color:white;
  padding: 20px;
  .HoursDisplay{
    .result{
      margin-bottom: 20px;
      margin-top: 40px;
      .row{
        display:flex;
        border-bottom: 2px solid #f7f7f7;
        padding-bottom: 5px;
        .time-slots{
          margin-right: 10px;
        }
      }
    }
  }
}

.save-btn{
  padding: 10px 10px;
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
  padding: 10px 10px;
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
