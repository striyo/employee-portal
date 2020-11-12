<template>
<div class="ViewHours">
    <form @click="submit">
      <div class="title">
        <h2>View Hour</h2>
        <div class="line"></div>
    </div>
        <div class="row">
            <div >Start Date: <input type="date"></div>
            <div >Start Date <input type="date"></div>
            <button>Search</button>
        </div>
    </form>

    <div class="HoursDisplay">
        <div class="result">
            <label class="date">Date: <span>11/10/2020</span></label>
            <br>
            <label class="timeIn">Time In: <span>9:00</span></label>
            <label class="lunchOut">Lunch Out: <span>12:30</span></label>
            <label class="lunchIn">Lunch In: <span>9:00</span></label>
            <label class="timeOut">Time Out: <span>12:30</span></label>
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
    min-width: 42rem;
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

  .ViewHours, .result{
    padding: 1rem;
    margin-left:1rem;
    // margin-top: 2rem;
  }
 .timeIn, .timeOut, .lunchIn, .lunchOut{
     margin-right:1rem;
  }
  input{
    //   margin-right:1rem;
      margin-bottom: 1rem;
  }

 button{
    margin-left: 0px;
      margin-bottom: 3rem;
  }

  @media screen and (max-width: 800px) {
  .result {
    display:grid;
    grid-template-columns:1fr 1fr;
    margin-bottom: 1rem;
  }
  .ViewHours{
      min-width: 20rem;
      margin-left:1rem;
  }

  .right{
    margin-top:1rem;
  }

}
</style>
