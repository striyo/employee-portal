<template>
  <form @submit.prevent="report">
    <div class="form-checkbox">
      <h3>Do you wish to remain ANONYMOUS for this report?</h3>
      <input type="checkbox" v-model="anon"> <label>Yes, I want to remain anonymous</label>
    </div>
    <div class="form-group" v-if="!anon">
      <h3>Best time to contact you?</h3>
      <input type="time" v-model="contactTime">
    </div>
    <div class="form-group" v-if="!anon">
      <h3>What is your position in the company?</h3>
      <input type="text" v-model="position">
    </div>
    <div class="form-group">
      <h3>Please identify the people involved <span class="required">*</span></h3>
      <input type="text" placeholder="Person A, Person B, Person C, etc..." v-model="detail.people">
    </div>
    <div class="form-checkbox">
      <h3>Do you suspect or know that a supervisor or management is invovled?</h3>
      <input type="checkbox" v-model="management.involved"> <label>Yes, I suspect or know that a supervisor or management is involved</label>
    </div>
    <div class="form-group" v-if="management.involved">
      <h3>Please name the supervisor or management involved.  If you wish to not disclose, you can leave this blank</h3>
      <input type="text" placeholder="Person A, Person B, Person C, etc..." v-model="management.detail">
    </div>
    <div class="form-checkbox">
      <h3>Is management aware of this problem?</h3>
      <input type="checkbox" v-model="management.aware"> <label>Yes, management is aware of this problem</label>
    </div>
    <div class="form-group">
      <h3>Please provide an approximate time in which this incident occured <span class="required">*</span></h3>
      <input type="date" v-model="detail.date">
      <input type="time" v-model="detail.time">
    </div>
    <div class="form-group">
      <h3>How long do you think this violation has been going on? <span class="required">*</span></h3>
      <input type="text" v-model="detail.duration">
    </div>
    <div class="form-group">
      <h3>Please identify anyone who have attempted to conceal this problem and the steps they took to conceal it</h3>
      <textarea v-model="detail.conceal"></textarea>
    </div>
    <div class="form-group">
      <h3>Please provide all details regarding the alleged violation, including the locations of witnesses and any other information that could be valuable in the evaluation and ultimate resolution of this solution. <span class="required">*</span></h3>
      <p>Please take your time and provide as much detail as possible, but exercise care to not provide details that may reveal your identity unless you wish to do so. It may be important to know if you are the only person aware of this situatio</p>
      <textarea v-model="detail.body"></textarea>
    </div>
    <div class="form-group">
      <h3>If you have a document or file that supports your report, most common file types can be uploaded:</h3>
      <input id="document" type="file">
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
        people: '',
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
        body: '',
      },
    };
  },
  methods: {
    report() {
      this.$emit('loading');

      let body = new FormData();
      body.append('document', document.getElementById('document').files[0]);
      body.append('anon', this.anon);
      body.append('contactTime', this.contactTime);
      body.append('position', this.position);
      body.append('managementInvolved', this.management.involved);
      body.append('managementDetail', this.management.detail);
      body.append('managementAware', this.management.aware);
      body.append('detailPeople', this.detail.people);
      body.append('detailNature', this.detail.nature);
      body.append('detailCity', this.detail.location.city);
      body.append('detailState', this.detail.location.state);
      body.append('detailZip', this.detail.location.zip);
      body.append('detailCountry', this.detail.location.country);
      body.append('detailDate', this.detail.date);
      body.append('detailTime', this.detail.time);
      body.append('detailDuration', this.detail.duration);
      body.append('detailAware', this.detail.aware);
      body.append('detailConceal', this.detail.conceal);
      body.append('detailBody', this.detail.body);

      axios.post('/api/resources/report', body, { headers: { 'content-type': 'multipart/form-data' } }).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        this.$emit('finished');
      }).catch((err) => {
        this.$emit('finished');
        console.log(err);
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
      });
    },
    selectFiles(e) {
      this.detail.document = e.target.files;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
