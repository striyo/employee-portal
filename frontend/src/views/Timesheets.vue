<template>
  <div class="timesheets page">
    <div class="grid">
      <div class="left">
        <GenerateTimesheets />
        <CreateHours />
      </div>
      <div class="right">
        <ManageHours />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GenerateTimesheets from '@/components/GenerateTimesheets.vue';
import ManageHours from '@/components/ManageHours.vue';
import CreateHours from '@/components/CreateHours.vue';

export default {
  name: 'Timesheets',
  components: {
    GenerateTimesheets,
    ManageHours,
    CreateHours,
  },
  data() {
    return {
      search: '',
      startDate: '',
      endDate: '',
      name: '',
      email: '',
      phone: null,
      rate: 0,
      salaried: false,
      is_admin: false,
      response: '',
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
      // create reqest body
      let body = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        rate: this.rate,
        salaried: this.salaried,
        is_admin: this.is_admin,
      };

      axios.post('/api/users/register', body).then((res) => {
        this.loading = false;
        console.log(res);
        this.response = res.data.message;

        // clear input fields on success
        this.name = '';
        this.email = '';
        this.phone = null;
        this.rate = 0;
        this.salaried = false;
        this.is_admin = false;
      }).catch((err) => {
        this.loading = false;
        console.log(err.response.data);
        this.response = err.response.data.message;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
