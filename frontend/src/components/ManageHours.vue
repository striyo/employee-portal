<template>
  <div class="ManageHours">
    <div class="loading" v-if="loading">
      <div class="circle">
      </div>
    </div>
    <div class="title">
      <h2>Manage Hours</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="search">
      <div class="form-row">
        <div class="form-group">
          <input type="text" placeholder="Name" v-model="searchID" />
        </div>
      </div>
      <div class="form-row dates">
        <div class="form-group">
          <h3>Start Date</h3>
          <input type="date" v-model="startDate" />
        </div>
        <div class="form-group">
          <h3>End Date</h3>
          <input type="date" v-model="endDate" />
        </div>
      </div>
      <button>Search</button>
    </form>
    <div
      class="HoursDisplay"
    >
      <div class="result"
        v-for="(hour, index) in hours"
        :key="`hour_${hour.hours_id}`"
      >
        <h3 v-if="isNameDiff(hours, index)">{{ hour.name }}</h3>
        <h4>{{hour.date}}</h4>
        <div class="row">
          <div class="time-group">
            <div class="time-slots">
              <p>Time In</p>
              <input type="time" v-model="hour.clock_in" />
            </div>
            <div class="time-slots">
              <p>Meal In</p>
              <input type="time" v-model="hour.meal_in" />
            </div>
          </div>
          <div class="time-group">
            <div class="time-slots">
              <p>Meal Out</p>
              <input type="time" v-model="hour.meal_out" />
            </div>
            <div class="time-slots">
              <p>Time Out</p>
              <input type="time" v-model="hour.clock_out" />
            </div>
          </div>
          <div class="time-group">
            <div class="time-slots">
              <p>Total</p>
              <p>{{ hour.total }}</p>
            </div>
            <div>
              <button class="save-btn" @click="save(hour)" > Save </button>
            </div>
            <div>
              <button class="delete-btn" @click="deleteHours(hour.hours_id)"> Delete </button>
            </div>
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
      tempDate: null,
      displayDate: null,
      loading: false,
    };
  },
  methods: {
    isNameDiff(hours, index) {
      if ((index === 0) || (hours[index - 1].name !== hours[index].name)) {
        return true;
      }
      return false;
    },
    search() {
      this.loading = true;
      let body = {
        search: this.searchID,
        startDate: this.startDate,
        endDate: this.endDate,
      };

      axios.post('/api/hours/admin/search', body).then((res) => {
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        this.hours = res.data.hours;
      }).catch((err) => {
        this.loading = false;
        let message = {
          message: err.response.data.message,
          error: true,
        };
        this.hours = [];
        this.$store.dispatch('pushNotifications', message);
      });
    },
    save(hours) {
      let temptimein = (hours.clock_in == null) ? '00:00' : hours.clock_in;
      let temptimeout = (hours.clock_out == null) ? '00:00' : hours.clock_out;
      let tempmealin = (hours.meal_in == null) ? '00:00' : hours.meal_in;
      let tempmealout = (hours.meal_out == null) ? '00:00' : hours.meal_out;
      let total = ((parseInt(temptimeout.split(':')[0] * 60) + parseInt(temptimeout.split(':')[1])) - (parseInt(tempmealout.split(':')[0] * 60) + parseInt(tempmealout.split(':')[1])) + (parseInt(tempmealin.split(':')[0] * 60) + parseInt(tempmealin.split(':')[1])) - (parseInt(temptimein.split(':')[0] * 60) + parseInt(temptimein.split(':')[1]))) / 60;

      let body = {
        timein: hours.clock_in,
        mealout: hours.meal_out,
        mealin: hours.meal_in,
        timeout: hours.clock_out,
        user_id: hours.user_id,
        total,
        date: hours.date,
      };

      console.log(hours);

      axios.post('/api/hours/update', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };
        this.$store.dispatch('pushNotifications', message);

        for (let i = 0; i < this.hours.length; i += 1) {
          if (this.hours[i].hours_id === hours.hours_id) {
            this.hours[i].total = total;
            break;
          }
        }
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: true,
        };
        this.$store.dispatch('pushNotifications', message);
      });
    },
    deleteHours(hourID) {
      let body = {
        hours_id: hourID,
      };
      axios.post('/api/hours/delete', body).then(() => {
        this.search();
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
.ManageHours {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  position: relative;
  max-height: 80vh;
  overflow: auto;
  .HoursDisplay {
    width:100%;
    .result {
      h3{
        margin-bottom: 20px;
      }
      margin-bottom: 20px;
      margin-top: 20px;
      .row {
        width:100%;
        display: flex;
        border-bottom: 2px solid #f7f7f7;
        padding-bottom: 5px;
        flex-wrap: wrap;
        .time-group{
          display:flex;
          margin-bottom: 10px;
          width:100%;
          .time-slots {
            margin-right: 10px;
            width:100%;
            input{
              width:100%;
              font-family: Arial, Helvetica, sans-serif;
            }
          }
        }
      }
    }
  }
}

.save-btn {
  padding: 10px 10px;
  font-size: 15px;
  border: none;
  background-color: #1fbd70;
  color: white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }
  margin-right: 20px;
}

.delete-btn {
  padding: 10px 10px;
  font-size: 15px;
  border: none;
  background-color: #bd241f;
  color: white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }
  margin-right: 20px;
}

@media(max-width: 414px) {
  .dates {
    display: grid;
    grid-template-columns:1fr;
  }
}
</style>
