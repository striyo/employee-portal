<template>
<div class="ViewHours">
    <form @click="submit">
        <h1>View Hours</h1>
        <div class="row">
            <label >Start Date</label>
            <input type="date">
            <label >Start Date</label>
            <input type="date">
            <button>Search</button>
        </div>
    </form>

    <div class="HoursDisplay">
        <div class="result">
            <label>Date: </label>
            <span>11/10/2020</span>
            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>

            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>
        </div>
                <div class="result">
            <label>Date: </label>
            <span>11/10/2020</span>
            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>

            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>
        </div>
                <div class="result">
            <label>Date: </label>
            <span>11/10/2020</span>
            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>

            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>
        </div>
                <div class="result">
            <label>Date: </label>
            <span>11/10/2020</span>
            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>

            <label>Time In: </label>
            <span>9:00</span>
            <label>Lunch Out: </label>
            <span>12:30</span>
        </div>
    </div>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.ViewHours{
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    padding: 20px;
    width: 60rem;
    // max-width: 400px;
    background-color:white;
    margin-top: 2px;
    h1{
      text-align: center;
      margin-bottom: 20px;
    }

    a{
      text-align: center;
      display:block;
      margin-top: 10px;
      color:#333;
    }
  }

  .ViewHours, label{
    margin: auto;
    // width: 52rem;
    // border: 2px solid green;
    padding: 2rem;
  }
  input{
      margin-right:8rem;
      margin-bottom: 2rem;
  }

  button{
      margin-bottom: 3rem;
  }
</style>
