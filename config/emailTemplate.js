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

function timeOffTemplate(name, startDate, endDate, reason){
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        *{
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        h3, h1{
          text-align: center
        }
        img{
          display:block;
          margin:auto;
        }
        body{
          padding: 20px;
        }
        .reason{
          margin-top: 20px;
          width:100%;
          padding: 10px;
          border: solid 2px #e6e6e6;
        }
      </style>
    </head>
    <body>
      <img src="https://royalemeraldrx.com/img/mainlogo.png" style="width:200px">  
      <h1>Time Off Request</h1>
      <h3>${startDate} to ${endDate}</h3>
      <p>Name:</p>
      <p>${name}</p>
      <div class="reason">
        ${reason}
      </div>
    </body>
    </html>
  `;
}

function purchaseTemplate(data) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        *{
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        img{
          display:block;
          margin: auto;
          width: 200px;
          margin-bottom: 50px;
        }
        body{
          padding: 20px;
        }
        .title{
          width:100%;
          text-align: center;
          margin-bottom: 30px;
        }
        .input{
          border-bottom: 1px solid #333;
          margin-bottom: 10px;
        }
        .input h3{
          margin-bottom: 5px;
        }
        .box{
          width:100%;
          padding: 10px;
          margin-bottom: 10px;
          border: solid 1px #666;
          min-height: 100px;
        }
      </style>
    </head>
    <body>
      <img src="https://royalemeraldrx.com/img/mainlogo.png">  
      <div class="title">
        <h1>Purchase Request</h1>
        <h3>From: ${data.name}</h3>
        <h4>${data.date}</h4>
      </div>
      <div class="input">
        <h3>Department</h3>
        <p>${data.department}</p>
      </div>
      <div class="input">
        <h3>Items, quantities, and prices</h3>
        <div class="box">
          <p>${data.items}</p>
        </div>
      </div>
      <div class="input">
        <h3>Purpose</h3>
        <div class="box">
          <p>${data.purpose}</p>
        </div>
      </div>
      <div class="input">
        <h3>Total</h3>
        <p>$${data.total}</p>
      </div>
    </body>
    </html>
  `;
}

module.exports = {
  userInfoTemplate,
  passwordResetTemplate,
  timeOffTemplate,
  purchaseTemplate,
}