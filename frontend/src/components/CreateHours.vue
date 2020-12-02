<template>
  <div class="CreateHours">
    <div class="title">
      <h2>Create Hours</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group">
          <input type="text" placeholder="Name" required v-model="searchID" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Date</h3>
          <input type="date" required v-model="date" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Time In:</h3>
          <input type="time" required v-model="timein" />
        </div>
        <div class="form-group">
          <h3>Meal In:</h3>
          <input type="time" required v-model="mealin" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Meal Out:</h3>
          <input type="time" required v-model="mealout" />
        </div>
        <div class="form-group">
          <h3>Time Out:</h3>
          <input type="time" required v-model="timeout" />
        </div>
      </div>
      <button>Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreateHours',
  data() {
    return {
      searchID: '',
      date: '',
      mealin: null,
      timein: null,
      mealout: null,
      timeout: null,
    };
  },
  methods: {
    submit() {
      let body = {
        search: this.searchID,
        date: this.date,
        mealin: this.mealin,
        timein: this.timein,
        mealout: this.mealout,
        timeout: this.timeout,
      };

      axios.post('/api/hours/admin/create', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.CreateHours {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 20px;
  .HoursDisplay {
    .result {
      margin-bottom: 20px;
      margin-top: 40px;
      .row {
        display: flex;
        border-bottom: 2px solid #f7f7f7;
        padding-bottom: 5px;
        .time-slots {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
