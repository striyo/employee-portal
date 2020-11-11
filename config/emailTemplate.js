function userInfoTemplate(name, email, password){
  return `
    <style>
      img{
        max-width: 200px;
        height:auto;
      }
      .body{
        margin: auto;
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
      }
      p{
        width:100%;
      }
    </style>
    <div class="body">
      <img style="width:200px" src="https://royalemeraldrx.com/img/mainlogo.png">
      <h1>Welcome to Royal Emerald Pharmaceuticals</h1>
      <p>Hello ${name}, an employee portal account has been created. Below are your login information.</p>
      <p>Once you log in, please navigate to the personal page and reset your password.</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
    </div>
  `
}

function passwordResetTemplate(link){
  return `
    <style>
      img{
        max-width: 200px;
        height:auto;
      }
      .body{
        margin: auto;
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
      }
      p{
        width:100%;
      }
    </style>
    <div class="body">
      <img style="width:200px" src="https://royalemeraldrx.com/img/mainlogo.png">
      <h1>Royal Emerald Portal Password Reset</h1>
      <p>We recieved a password reset request for the account associated with this email.</p>
      <p>The password reset link is below. You will be directed to a page where you can reset your password.</p>
      <p>If you did not make this request, please ignore this email.</p>
      <p>Here is your reset link:</p>
      <a href="${link}">${link}</a>
    </div>
  `
}

module.exports = {
  userInfoTemplate,
  passwordResetTemplate
}