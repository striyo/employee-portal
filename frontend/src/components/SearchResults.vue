<template>
<div class="SearchResults">
  <div class="title">
    <h2>Search Results</h2>
    <div class="line"></div>
  </div>
  <div class="grid">
    <!-- <div v-for="event in results" :key="event.id">
     <p>{{event.startDate}} {{event.startTime}} </p>
      <h2> {{event.title}}</h2> -->
      <div class="left">
        <p>November 22, 2020 5PM</p>
        <h3>Shareholder Meeting</h3>
        </div>
      <div class="right">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
      </div>
    </div>
  </div>
<!-- </div> -->
</template>

<script>
// import axios from 'axios';

export default {
  name: 'AddEvents',
  data() {
    return {
    };
  },
  methods: {
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
</style>
