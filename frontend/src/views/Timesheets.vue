<template>
  <div class="timesheets page">
    <h1>Timesheets</h1>
    <ManageHours/>
  </div>
</template>

<script>
import ManageHours from '@/components/ManageHours.vue';

export default {
  components: {
    ManageHours,
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
  grid-template-columns:1fr 1fr;
}

@media(min-width: 1024px) {
  .grid {
    grid-template-columns:1fr 1fr;
  }
}
</style>
