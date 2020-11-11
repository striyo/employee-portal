<template>
<div class="LogHours">
    <form @click="submit">
        <h1>Log Hours</h1>
          <div class="top">
              <div id="timeIn">
                  <h3>Time In: </h3><input type="time">
              </div>
              <div id="mealIn">
                  <h3>Meal In: </h3><input type="time">
              </div>

          </div>
        <div class="bottom">

              <div id="timeOut">
                  <h3>Time Out: </h3><input type="time">
              </div>
              <div id="mealOut">
                  <h3>Meal Out: </h3><input type="time">
              </div>
        </div>
        <button>Submit!</button>

    </form>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.LogHours{
    margin-top: 5rem;
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    padding: 20px;
    width: 30rem;
    // max-width: 400px;
    height: 20rem;;
    background-color:white;
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

  #timeIn,#mealOut{
    float: left;
    margin-left: 5rem;
  }

  #mealIn,#timeOut{
    float: right;
    margin-right: 5rem;
  }

  .bottom{
      margin-top: 5rem;;
  }

  button{
      margin-top: 10rem;
  }

</style>
