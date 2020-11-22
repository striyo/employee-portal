<template>
  <form @submit.prevent="report">
    <div class="form-checkbox">
      <h3>Do you wish to remain ANONYMOUS for this report?</h3>
      <input type="checkbox" v-model="anon"> <label>Yes, I want to remain anonymous</label>
    </div>
    <div class="form-group" v-if="anon">
      <h3>Best time to contact you?</h3>
      <input type="time" v-model="contactTime">
    </div>
    <div class="form-group">
      <h3>What is your position in the company?</h3>
      <input type="text" v-model="position">
    </div>
    <div class="form-group">
      <h3>Please identify the people involved</h3>
      <input type="text" placeholder="Person A, Person B, Person C, etc..." v-model="detail.people">
    </div>
    <div class="form-checkbox">
      <h3>Do you suspect or know that a supervisor or management is invovled?</h3>
      <input type="checkbox" v-model="management.involved"> <label>Yes, I suspect or know that a supervisor or management is involved</label>
    </div>
    <div class="form-group" v-if="management.involved">
      <h3>Please name the supervisor or management involved.  If you wish to not disclose, you can leave this blank</h3>
      <input type="text" placeholder="Person A, Person B, Person C, etc..." v-model="managment.detail">
    </div>
    <div class="form-checkbox">
      <h3>Is management aware of this problem?</h3>
      <input type="checkbox" v-model="management.aware"> <label>Yes, management is aware of this problem</label>
    </div>
    <div class="form-group">
      <h3>Please provide an approximate time in which this incident occured</h3>
      <input type="date" v-model="detail.date">
      <input type="time" v-model="detail.time">
    </div>
    <div class="form-group">
      <h3>How long do you think this violation has been going on?</h3>
      <input type="text" v-model="detail.duration">
    </div>
    <div class="form-group">
      <h3>Please identify anyone who have attempted to conceal this problem and the steps they took to conceal it</h3>
      <textarea v-model="detail.conceal"></textarea>
    </div>
    <div class="form-group">
      <h3>Please provide all details regarding the alleged violation, including the locations of witnesses and any other information that could be valuable in the evaluation and ultimate resolution of this solution.</h3>
      <p>Please take your time and provide as much detail as possible, but exercise care to not provide details that may reveal your identity unless you wish to do so. It may be important to know if you are the only person aware of this situatio</p>
      <textarea v-model="detail.body"></textarea>
    </div>
    <button>Send</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Purchase',
  data() {
    return {
      anon: false,
      contactTime: '',
      position: '',
      management: {
        involved: false,
        detail: '',
        aware: false,
      },
      detail: {
        people: '',
        nature: '',
        location: {
          city: '',
          state: '',
          zip: '',
          country: '',
        },
        time: null,
        date: null,
        duration: null,
        aware: null,
        conceal: '',
        document: null,
        body: '',
      },
    };
  },
  methods: {
    report() {
      let body = {
      };

      axios.post('/api/resources/purchase', body).then((res) => {
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
</style>
