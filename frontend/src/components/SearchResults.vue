<template>
<div class="SearchResults">
  <div class="title">
    <h2>Search Results</h2>
    <div class="line"></div>
  </div>
  <div>
    Placeholder Result
    <p>Nov 18, 2020 3:00PM</p>
    <h2>Shareholder meetings</h2>
    <button>edit</button>
    <button>delete</button>
  </div>
</div>
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
</style>
