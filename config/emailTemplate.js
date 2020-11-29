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

function reportTemplate(data, user) {
  let contact = `
    <div class="input">
      <h3>Best time to contact</h3>
      <p>${data.contactTime}</p>
    </div>
  `;

  let position = `
    <div class="input">
      <h3>Position in company</h3>
      <p>${data.position}</p>
    </div>
  `;

  let managementInvolved= `
    <div class="input">
      <h3>Involved Supervisor or Management</h3>
      <p>${data.managementDetail}</p>
    </div>
  `;

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
        <h1>Anonymous Report</h1>
        <h3>From: ${data.anon === 'false' ? user.name : 'Anonymous'}</h3>
      </div>
      ${data.anon === 'false' ? `${contact} ${position}` : ""}
      <div class="input">
        <h3>People involved</h3>
        <p>${data.detailPeople}</p>
      </div>
      ${data.managementInvolved === 'true' ? managementInvolved : ""}
      <div class="input">
        <h3>Is management aware of this problem</h3>
        <p>${data.managementAware === 'true' ? "Yes" : "No"}</p>
      </div>
      <div class="input">
        <h3>Approximate date and time in which incident occured</h3>
        <p>${data.detailDate} ${data.detailTime}</p>
      </div>
      <div class="input">
        <h3>Approximate duration of incident</h3>
        <p>${data.detailDuration}</p>
      </div>
      <div class="input">
        <h3>People who have attempted to conceal this problem and the steps they took to conceal it</h3>
        <div class="box">
          <p>${data.detailConceal}</p>
        </div>
      </div>
      <div class="input">
        <h3>Details regarding the incident</h3>
        <div class="box">
          <p>${data.detailBody}</p>
        </div>
      </div>
      <div class="input">
        <h3>Supporting documents are attached below if any</h3>
      </div>
    </body>
    </html>
  `;
}

function timesheetTemplate(data, hours) {
  let hoursRow = '';
  let total = 0;
  for(let i = 0; i < hours.length; i++){
    let row = `
      <tr>
        <td>${hours[i].date}</td>
        <td>${hours[i].clock_in}</td>
        <td>${hours[i].meal_in}</td>
        <td>${hours[i].meal_out}</td>
        <td>${hours[i].clock_out}</td>
        <td>${hours[i].total}</td>
      </tr>
    `;
    total += hours[i].total;
    hoursRow = `${hoursRow} ${row}`;
  }

  let row = `
    <tr>
      <td>All</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>${total}</td>
    </tr>
  `;
  hoursRow = `${hoursRow} ${row}`;

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
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.8em;
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
      .time-table{
        margin: auto;
        margin-bottom: 20px;
      }
      .table{
        background-color:#f7f7f7;
        border: solid 1px #333;
        width:100%;
        border-collapse: collapse;
      }
  
      .table th{
        text-align: left;
        padding: 5px;
        border: 1px solid #333;
      }
      .table td{
        padding: 2px 5px;
        border: 1px solid #dddddd;
      }
      .table tr:nth-child(odd) {
        background-color: #d6d6d6;
      }
      .table-label{
        border-bottom: solid 5px #333;
        background-color:#15588f !important;
        color:white;
      }
      
      .signature{
        width:100%;
        margin-top: 50px;
      }
  
      .signature tr td{
        border-top: 1px solid #333;
      }
    </style>
  </head>
  <body>
    <img src="https://royalemeraldrx.com/img/mainlogo.png">  
    <div class="title">
      <h1>Timesheet</h1>
      <h3>${data.startDate} - ${data.endDate}</h3>
      <p>${data.employee.name}</p>
    </div>
    <div class="time-table">
      <table class="table">
        <tr class="table-label">
          <th>Date</th>
          <th>Time In</th>
          <th>Meal In</th>
          <th>Meal Out</th>
          <th>Time Out</th>
          <th>Total</th>
        </tr>
        ${hoursRow}
      </table>
    </div>
    <div class="time-table">
      <table class="table">
        <tr class="table-label">
          <th>Total Hours</th>
          <th>Rate/Hr</th>
          <th>Total Pay</th>
        </tr>
        <tr>
          <td>${total}</td>
          <td>${data.employee.rate}</td>
          <td>$${total * data.employee.rate}</td>
        </tr>
      </table>
    </div>
    <table class="signature">
    <tr>
      <td>Employee Signature</td>
      <td>Date</td>
      <td>Manager Signature</td>
      <td>Date</td>
    </tr>
  </table>
  </body>
  </html>
  `;
}

module.exports = {
  userInfoTemplate,
  passwordResetTemplate,
  timeOffTemplate,
  purchaseTemplate,
  reportTemplate,
  timesheetTemplate,
}