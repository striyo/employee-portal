<template>
  <div class="resources page">
    <div class="col">
      <RequestForm />
    </div>
    <div class="col">
      <Files/>
      <EmployeeSearch />
    </div>
  </div>
</template>

<script>
import RequestForm from '@/components/RequestForm.vue';
import EmployeeSearch from '@/components/EmployeeSearch.vue';
import Files from '@/components/Files.vue';

export default {
  name: 'Resources',
  components: {
    RequestForm,
    EmployeeSearch,
    Files,
  },
};
</script>

<style lang="scss" scoped>
.resources{
  display:grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media(min-width:1024px){
  .resources{
    grid-template-columns: 1fr 1fr;
  }
}
</style>
