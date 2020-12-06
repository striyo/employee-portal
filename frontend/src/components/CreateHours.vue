<template>
  <div class="CreateHours" @click="toggleAutoComplete">
    <div class="loading" v-if="loading">
      <div class="circle">
      </div>
    </div>
    <div class="title">
      <h2>Create Hours</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group">
          <div class="selection" v-if="peopleArr.length != 0">
            <p style="margin-bottom: 5px; color:darkgreen;">Click to remove a selection</p>
            <label v-for="person in peopleArr" :key="`person_${person.user_id}`" @click="removeSelection(person)">{{person.name}}</label>
          </div>
          <div class="no-selection" v-else>
            <label>No employee selected</label>
          </div>
          <div style="position:relative; width:100%">
            <input
              type="text"
              v-model="people"
              placeholder="Employee Name"
              class="employee-input"
              v-if="peopleArr.length == 0"
            />
            <div class="auto-complete" v-if="focus">
              <p v-for="user in users " :key="`auto_${user.user_id}`"
              @click="selectUser(user)">{{user.name}} -- {{user.email}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Date</h3>
          <input type="date" v-model="date" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Time In:</h3>
          <input type="time" v-model="timein" />
        </div>
        <div class="form-group">
          <h3>Meal In:</h3>
          <input type="time" v-model="mealin" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <h3>Meal Out:</h3>
          <input type="time" v-model="mealout" />
        </div>
        <div class="form-group">
          <h3>Time Out:</h3>
          <input type="time" v-model="timeout" />
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
      people: null,
      description: null,
      users: [],
      peopleArr: [],
      date: null,
      mealin: null,
      timein: null,
      mealout: null,
      timeout: null,
      timer: null,
      focus: false,
      loading: false,
    };
  },
  watch: {
    people(val) {
      if (this.timer != null) {
        clearTimeout(this.timer);
      }

      if (this.click) {
        this.click = false;
        return;
      }

      let self = this;
      if (val.length !== 0) {
        this.timer = setTimeout(() => {
          let body = {
            search: self.people,
          };

          axios.post('/api/users/search', body).then((res) => {
            self.users = res.data.users;
          }).catch((err) => {
            console.log(err.response.data);
          });
        }, 500);
      } else {
        this.users = [];
      }
    },
  },
  methods: {
    selectUser(user) {
      this.peopleArr = [user];
      this.people = '';
      this.users = [];
      this.click = true;
    },
    toggleAutoComplete(e) {
      if (e.target.className === 'employee-input') {
        this.focus = true;
      } else {
        this.focus = false;
      }
    },
    removeSelection(user) {
      this.peopleArr = this.peopleArr.filter((person) => person.user_id !== user.user_id);
    },
    submit() {
      this.loading = true;
      let temptimein = (this.timein == null) ? '00:00' : this.timein;
      let temptimeout = (this.timeout == null) ? '00:00' : this.timeout;
      let tempmealin = (this.mealin == null) ? '00:00' : this.mealin;
      let tempmealout = (this.mealout == null) ? '00:00' : this.mealout;
      let total = ((parseInt(temptimeout.split(':')[0] * 60) + parseInt(temptimeout.split(':')[1])) - (parseInt(tempmealout.split(':')[0] * 60) + parseInt(tempmealout.split(':')[1])) + (parseInt(tempmealin.split(':')[0] * 60) + parseInt(tempmealin.split(':')[1])) - (parseInt(temptimein.split(':')[0] * 60) + parseInt(temptimein.split(':')[1]))) / 60;

      if (total < 0) {
        total = 0;
      }
      let body = {
        user: this.peopleArr[0],
        date: this.date,
        hours: {
          mealin: this.mealin,
          timein: this.timein,
          mealout: this.mealout,
          timeout: this.timeout,
          date: this.date,
          total,
        },
      };

      axios.post('/api/hours/', body).then((res) => {
        this.loading = false;
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        this.timein = null;
        this.timeout = null;
        this.mealin = null;
        this.mealout = null;
        this.peopleArr = [];
        this.date = null;
      }).catch((err) => {
        this.loading = false;
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
  position: relative;
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

.selection{
  margin-bottom: 10px;
  label{
    background-color:#f7f7f7;
    padding: 5px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    margin-right: 5px;
    display:inline-block;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
.no-selection{
  margin-bottom: 10px;
  label{
    background-color:#f7f7f7;
    padding: 5px;
  }

}

.auto-complete {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: absolute;
  top: 30px;
  z-index: 2;
  background-color: white;
  p {
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
  }
}
</style>
