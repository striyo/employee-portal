<template>
  <div class="EditEvents">
    <form @submit.prevent="submit" class="edit">
      <!-- <div class="form-row">
        <div class="form-group">
          <h1>{{event.title}}</h1>
        </div>
      </div>
      <div class="form-row">
      </div>
      <button>Submit</button> -->
    </form>
    </div>
</template>

<script>
// import SearchResults from './SearchResults.vue';

export default {
  name: 'EditEvents',
  data() {
    return {
      name: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
      description: null,
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
    background:rgba(255,255,255,0.9);
}
.edit{
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  padding: 20px;
  background-color:white;
  margin-top: 10%;
  margin-left: 30%;
  width: 50%;
}
</style>
