<template>
<div class="hours page">
    <h1>Hours</h1>
    <div class="row">
      <div class="left">
        <TotalHours />
        <LogHours />
      </div>
      <div class="right">
        <ViewHours />
      </div>
    </div>
</div>
</template>

<script>
import TotalHours from '../components/TotalHours.vue';
import LogHours from '../components/LogHours.vue';
import ViewHours from '../components/ViewHours.vue';

export default {
  components: {
    TotalHours,
    LogHours,
    ViewHours,
  },
};
</script>

<style lang="scss" scoped>

.left{
  float: left;
  margin-left: 2rem;
}
.right{
  float: right;
  margin-right: 2rem;
}

h1{
  margin-bottom: 2rem;
  margin-left:2rem;
}
</style>
