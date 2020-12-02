<template>
  <div class="files">
    <div class="title">
      <h2>Timesheets</h2>
      <div class="line"></div>
    </div>
    <div class="files-list">
      <a v-for="file in files" :key="file" :href="`/api/timesheets/${$store.state.user.user_id}/${file}`" target="_blank" class="file-box">
        <i class="fas fa-file-alt"></i>
        <p>{{file}}</p>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'View Timesheets',
  data() {
    return {
      files: [],
    };
  },
  created() {
    console.log(this.$store.state.user.user_id);
    axios.get(`/api/timesheets/${this.$store.state.user.user_id}`).then((res) => {
      this.files = res.data.files;
    }).catch((err) => {
      console.log(err);
    });
  },
};
</script>

<style lang="scss" scoped>
.files{
  background-color:white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 4px rgba(0,0,0,0.1);
  .files-list{
    display:flex;
    flex-wrap: wrap;
    .file-box{
      display:flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100px;
      margin-right: 20px;
      margin-bottom: 20px;
      i{
        font-size: 2.5em;
        margin-bottom: 5px;
        color:#1fbd70;
        transition: all 0.3s ease-in-out;
      }
      p{
        font-size: 0.7em;
        color:#333;
        text-align: center;
      }

      &:hover{
        i{
          color:darkgreen;
        }
      }

    }
  }
}

</style>
