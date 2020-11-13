<template>
<div class="ViewHours">
  <div class="title">
    <h2>View Hour</h2>
    <div class="line"></div>
  </div>
  <form @submit.prevent="submit">
    <div class="form-row">
      <div class="form-group">
        <h3>Start Date</h3><input type="date" v-model="startDate">
      </div>
      <div class="form-group">
        <h3>End Date</h3><input type="date" v-model="endDate">
      </div>
    </div>
    <button>Search</button>
  </form>

  <div class="HoursDisplay">
    <div class="result">
      <h3>Date: 11/10/2020</h3>
      <div class="row">
        <div class="time-slots">
          <p>Time In</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Meal In</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Meal Out</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Time Out</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Total</p>
          <p>9 hours</p>
        </div>
      </div>
    </div>
    <div class="result">
      <h3>Date: 11/10/2020</h3>
      <div class="row">
        <div class="time-slots">
          <p>Time In</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Meal In</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Meal Out</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Time Out</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Total</p>
          <p>9 hours</p>
        </div>
      </div>
    </div>
    <div class="result">
      <h3>Date: 11/10/2020</h3>
      <div class="row">
        <div class="time-slots">
          <p>Time In</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Meal In</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Meal Out</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Time Out</p>
          <p>9:00</p>
        </div>
        <div class="time-slots">
          <p>Total</p>
          <p>9 hours</p>
        </div>
      </div>
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
  background-color:white;
  padding: 20px;

  .HoursDisplay{
    .result{
      margin-bottom: 20px;
      .row{
        display:flex;
        border-bottom: 2px solid #f7f7f7;
        padding-bottom: 5px;
        .time-slots{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
