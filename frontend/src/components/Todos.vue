<template>
  <div class="Todos">
    <div class="title">
      <h2>Todos</h2>
      <div class="line"></div>
    </div>
    <form @submit.prevent="submit">
      <div class="form-row">
        <div class="form-group">
          <input
            type="text"
            required
            v-model="people"
            placeholder="Person A, Person B, ..."
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <input type="text" v-model="description" placeholder="Description" />
        </div>
      </div>
      <button>Create</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Todos',
  data() {
    return {
      people: null,
      description: null,
    };
  },
  methods: {
    submit() {
      let peopleList = this.people.split(',');
      for (let i = 0; i < peopleList.length; i += 1) {
        peopleList[i] = peopleList[i].trim();
      }
      let body = {
        people: peopleList,
        description: this.description,
      };
      axios.post('/api/todos/add', body).then((res) => {
        let message = {
          message: res.data.message,
          error: false,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(res.data.message);
      }).catch((err) => {
        let message = {
          message: err.response.data.message,
          error: true,
        };

        this.$store.dispatch('pushNotifications', message);
        console.log(err.response.data.message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Todos {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
}
</style>
