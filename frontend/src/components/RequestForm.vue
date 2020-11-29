<template>
  <div class="requestform">
    <div class="loading" v-if="loading">
      <div class="circle">
      </div>
    </div>
    <div class="title">
      <h2>Request Forms</h2>
      <div class="line"></div>
    </div>
    <form>
      <div class="form-group">
        <h3>Select the desired forms</h3>
        <select v-model="requestType">
          <option value="timeoff">Time Off</option>
          <option value="purchase">Purchase</option>
          <option value="report">Anonymous Report</option>
        </select>
      </div>
    </form>

    <TimeOff v-if="requestType == 'timeoff'" v-on:loading="loading = true" v-on:finished="loading = false" />
    <Purchase v-if="requestType == 'purchase'" v-on:loading="loading = true" v-on:finished="loading = false" />
    <Report v-if="requestType == 'report'" v-on:loading="loading = true" v-on:finished="loading = false"/>
  </div>
</template>

<script>
import TimeOff from '@/components/TimeOff.vue';
import Purchase from '@/components/Purchase.vue';
import Report from '@/components/AnonymousReport.vue';

export default {
  name: 'Request Form',
  components: {
    TimeOff,
    Purchase,
    Report,
  },
  data() {
    return {
      requestType: '',
      loading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.requestform{
  position:relative;
  padding: 20px;
  background-color:white;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
}

@media(min-width:1024px){
  .requestform{
    max-height:90vh;
    overflow:auto;
  }
}
</style>
