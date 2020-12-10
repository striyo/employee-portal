<template>
  <div class="changepassword">
    <img src="@/assets/logo.png" alt="">
    <div class="login-box">
      <div class="loading" v-if="loading">
        <div class="circle">
        </div>
      </div>
      <h1>Invalid Link</h1>
      <p style="text-align: center">Your Password Reset Link is either invalid or has expired.</p>
      <p style="text-align: center">Please send another request if you would like to reset your password.</p>
      <router-link to='/forgotpassword' style="font-weight: 700">Send Another Request</router-link>
      <router-link to='/'>Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Invalid Link',
};
</script>

<style lang="scss" scoped>
.changepassword{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width:100%;
  img{
    width: 70%;
    max-width:400px;
  }

  .login-box{
    box-shadow: 0 4px 4px rgba(0,0,0,0.1);
    padding: 20px;
    width: 90%;
    max-width: 500px;
    background-color:white;
    position: relative;
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
}
</style>
