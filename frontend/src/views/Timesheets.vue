<template>
  <div class="timesheets page">
    <GenerateTimesheets />
  </div>
</template>

<script>
import axios from 'axios';
import GenerateTimesheets from '@/components/GenerateTimesheets.vue';

export default {
  name: 'Timesheets',
  components: {
    GenerateTimesheets,
  },
  data() {
    return {
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
.timesheets{
  .container{
    display:grid;
    grid-template-columns: 1fr;
    gap: 20px;

    .register-form{
      background-color:white;
      padding: 20px;
      box-shadow: 0 4px 4px rgba(0,0,0,0.1);
      position: relative;
    }
  }
}

@media(min-width:1300px){
  .timesheets{
    .container{
      grid-template-columns: 1fr 1fr;
    }
  }
}

</style>
