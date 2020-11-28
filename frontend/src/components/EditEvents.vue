<template>
  <div class="EditEvents">
    <div class="edit">
      <h1>Edit Event</h1>
      <form @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group">
            <input type="text" v-model="title" placeholder="Title">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <h3>Start Date: </h3><input type="date" v-model="startDate">
          </div>
          <div class="form-group">
            <h3>End Date: </h3><input type="date" v-model="endDate">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <h3>Start Time: </h3><input type="time" v-model="startTime">
          </div>
          <div class="form-group">
            <h3>End Time: </h3><input type="time" v-model="endTime">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <input type="text" v-model="body" placeholder="Description">
          </div>
        </div>
        <div class="form-row">
          <button class="cancel-btn">Cancel</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import SearchResults from './SearchResults.vue';

export default {
  name: 'EditEvents',
  data() {
    return {
      title: 'Event Title',
    };
  },
  props: ['event'],
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.EditEvents{
position:fixed;
    padding:0;
    margin:0;

    top:0;
    left:0;

    width: 100%;
    height: 100%;
    background:rgba(255,255,255,0.8);
}
.edit{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color:white;
  margin-top: 10%;
  margin-left: 30%;
  width: 50%;
}

.cancel-btn{
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
</style>
