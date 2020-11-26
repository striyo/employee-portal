<template>
<div class="SearchResults">
  <div class="title">
    <h2>Search Results</h2>
    <div class="line"></div>
  </div>
  <div v-for="event in events" v-bind:key="event.event_id">
<!--    <button>-->
      <p>Date: {{event.start_date}} ' - ' {{event.end_date}}</p>
      <div class="row">
        <h3>{{event.title}}</h3> <button class="edit-btn" @click="$emit('edit', event), edit=true"> edit</button ><button @click="deleteEvent(event)" class="delete-btn"> delete</button>
      </div>
<!--    </button>-->
  </div>
  <div v-if="edit==true">
    <EditEvents v-bind:event="event" v-bind:edit="edit"/>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import EditEvents from './EditEvents.vue';

export default {
  name: 'SearchResults',
  data() {
    return {
      event: null,
      edit: false,
    };
  },
  components: {
    EditEvents,
  },
  props: ['events'],
  methods: {
    deleteEvent(event) {
      console.log(`What is this ${event}`);
      let body = {
        event_id: event.event_id,
      };
      console.log(body);
      axios.post('/api/events/delete', body).then((res) => {
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
    // view() {
    //   console.log(this.event);
    // },
  },
};
</script>

<style lang="scss" scoped>
.SearchResults{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color:white;
}
.grid{
  width:100%;
  display:grid;
  gap: 20px;
  //grid-row:1/span 2;
  grid-template-columns:1fr 1fr;
}
.edit-btn{
  padding: 10px 20px;
  font-size: 15px;
  border:none;
  background-color:#1FBD70;
  color:white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover{
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  }
  margin-right: 20px;
}
.delete-btn{
  padding: 10px 20px;
  font-size: 15px;
  border:none;
  background-color:#bd241f;
  color:white;
  transition: all 0.1s ease;
  cursor: pointer;
  font-weight: 700;
  &:hover{
    transform: scale(1.1, 1.1);
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  }
  margin-right: 20px;
}

button{
  background: none;
  border: none;
  text-align: start;
}
</style>
