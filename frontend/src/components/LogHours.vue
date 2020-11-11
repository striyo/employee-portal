<template>
<div class="LogHours">
    <div class="title">
        <h2>Log Hours</h2>
        <div class="line"></div>
    </div>
    <form @click="submit">
          <div class="top">
              <div id="timeIn">
                  <h3>Time In: </h3><input type="time">
              </div>
              <div id="mealIn">
                  <h3>Meal In: </h3><input type="time">
              </div>

          </div>
        <div class="bottom">
              <div id="mealOut">
                  <h3>Meal Out: </h3><input type="time">
              </div>
              <div id="timeOut">
                  <h3>Time Out: </h3><input type="time">
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
    width: 20rem;
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

  #timeIn,#timeOut{
    float: left;
    margin-bottom: 1rem;
  }

  #mealIn,#mealOut{
    float: right;
    margin-bottom: 1rem;
  }

  .bottom{
      margin-top: 5rem;;
  }
  button{
     margin-top: 2rem;
     margin-left: 0px;
      margin-bottom: 3rem;
      // background-color: blue;
  }

</style>
