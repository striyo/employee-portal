<template>
<div class="TotalHours">
    <form @click="submit">
        <h1>Total Hours</h1>
        <div class="row">
          <span> Pay Period Goes Here</span>
          <h1 class="pay"><span>40 Hours</span></h1>
        </div>
    </form>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.TotalHours{
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    padding: 20px;
    width: 30rem;
    // max-width: 400px;
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

  .pay{
    margin-left: 10rem;
  }
</style>
