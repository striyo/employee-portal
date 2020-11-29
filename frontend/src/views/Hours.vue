<template>
<div class="hours page">
  <div class="grid">
    <div class="left">
      <TotalHours />
      <LogHours />
    </div>
    <div class="right">
      <ViewTimesheets />
      <ViewHours />
    </div>
  </div>
</div>
</template>

<script>
import TotalHours from '../components/TotalHours.vue';
import LogHours from '../components/LogHours.vue';
import ViewHours from '../components/ViewHours.vue';
import ViewTimesheets from '../components/ViewTimesheets.vue';

export default {
  components: {
    TotalHours,
    LogHours,
    ViewHours,
    ViewTimesheets,
  },
};
</script>

<style lang="scss" scoped>

h1{
  margin-bottom: 2rem;
  margin-left:2rem;
}

.grid{
  width:100%;
  display:grid;
  gap: 20px;
  grid-template-columns:1fr;
}

@media(min-width: 1024px) {
  .grid {
    grid-template-columns:1fr 1fr;
  }
}
</style>
