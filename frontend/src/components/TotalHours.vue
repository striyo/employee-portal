<template>
<div class="TotalHours">
  <div class="title">
    <h2>Total Hour</h2>
    <div class="line"></div>
  </div>
  <p> {{payPeriod}}</p>
  <h1>{{totalHours}}</h1>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Total Hour',
  data() {
    return {
      totalHours: '',
      payPeriod: '',
    };
  },
  created() {
    const today = new Date();
    let startPeriod;
    let endPeriod;
    let total = 0;
    if (today.getDate() < 15) {
      startPeriod = `${today.getFullYear()}-${(today.getMonth() + 1)}-1`;
      endPeriod = `${today.getFullYear()}-${(today.getMonth() + 1)}-${(today.getDate())}`;
      this.payPeriod = `${(today.getMonth() + 1)}/1/${today.getFullYear()} - ${(today.getMonth() + 1)}/14/${today.getFullYear()}`;
    } else {
      startPeriod = `${today.getFullYear()}-${(today.getMonth() + 1)}-15`;
      endPeriod = `${today.getFullYear()}-${(today.getMonth() + 1)}-${(today.getDate())}`;
      // 31 days
      if (((today.getMonth() + 1) === 4) || ((today.getMonth() + 1) === 6) || ((today.getMonth() + 1) === 9) || ((today.getMonth() + 1) === 11)) {
        this.payPeriod = `${(today.getMonth() + 1)}/15/${today.getFullYear()} - ${(today.getMonth() + 1)}/30/${today.getFullYear()}`;
      }
      // Feb
      if (((today.getMonth() + 1) === 2)) {
        let leapYear = ((today.getFullYear() % 4 === 0) && (today.getFullYear() % 100 !== 0)) || (today.getFullYear() % 400 === 0);
        if (leapYear) {
          this.payPeriod = `${(today.getMonth() + 1)}/29/${today.getFullYear()} - ${(today.getMonth() + 1)}/30/${today.getFullYear()}`;
        } else {
          this.payPeriod = `${(today.getMonth() + 1)}/28/${today.getFullYear()} - ${(today.getMonth() + 1)}/30/${today.getFullYear()}`;
        }
      } else {
        this.payPeriod = `${(today.getMonth() + 1)}/15/${today.getFullYear()} - ${(today.getMonth() + 1)}/31/${today.getFullYear()}`;
      }
    }
    /**
     * if today is less than 14
     * startPeriod = 1
     * endPeriod = today
     * else
     * startPeriod = 14
     * endPeriod = today
     */
    // post
    let body = {
      startDate: startPeriod,
      endDate: endPeriod,
    };
    axios.post('/api/hours/search', body).then((res) => {
      let i = 0;
      for (i; i < res.data.hour.length; i += 1) {
        total += res.data.hour[i].total;
      }
      this.totalHours = total;
    }).catch((err) => {
      let message = {
        message: err,
        error: true,
      };
      this.$store.dispatch('pushNotifications', message);
    });
  },
};
</script>

<style lang="scss" scoped>
.TotalHours{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  // max-width: 400px;
  background-color:white;
  margin-bottom: 20px;
}
</style>
