// what you need for routes
const express = require('express');
const router = express.Router();

// other dependencies
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const {getUser, getAllUser, createUser, updatePassword} = require('../model/UserModel.js');
const {createResetToken, deleteResetToken, getResetToken} = require('../model/PwdResetModel.js');
const template = require('../config/emailTemplate.js');
const mail = require('../config/email.js');

// routes

// login status
router.get('/status', (req, res) => {
  return res.status(200).json({
    user: req.session.user,
  });
});

// Login
router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password){
    return res.status(422).json({
      message: 'Please fill out all required fields',
    });
  }

  // query user table
  let user = getUser(req.body.email);

  user.then((data) => {
    // If the user does not exist
    if( data == null ){
      return res.status(401).json({
        message: 'Invalid Credentials',
      });
    }
  
    // check if password matches
    bcrypt.compare(req.body.password, data[0].password, (err, result) => {
      if (!result) {
        return res.status(401).json({
          message: 'Invalid Credentials',
        });
      }

      // store user data except their password
      let output = {
        name: data[0].name,
        email: data[0].email,
        phone: data[0].phone,
        is_admin: data[0].is_admin,
        is_active: data[0].is_active,
        rate: data[0].rate,
        salaried: data[0].salaried,
        profile_picture: data[0].profile_picture,
      }

      req.session.user = output;
      return res.status(200).json({
        message: 'Successfully Logged In',
        user: output,
      });
    })
  // Internal error
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Error in querying user',
    });
  })
})


// logout
router.post('/logout', (req,res) => {
  req.session.destroy();
  res.status(200).json({
    message: 'Logged out',
  });
});

// register
router.post('/register', (req, res) => {
  const saltRounds = 10;
  let hashed_password = '';

  // check if the person making request is logged in and an admin
  /*
  if (!req.session.user.isAdmin) {
    return res.status(403).json({
      message: "Unathorized",
    });
  }
  */

  // check if all fields are filled
  if (!req.body.name || !req.body.phone || !req.body.email || !req.body.rate || req.body.salaried == null || req.body.is_admin == null){
    return res.status(422).json({
      message: "Please fill out all required fields",
    });
  }

  // generate random password
  let password = generator.generate({length:15, numbers:true});

  // hash password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    hashed_password = hash;
    let result = createUser(req.body.name, req.body.phone, req.body.email, hashed_password, req.body.rate, req.body.salaried, req.body.is_admin, true);

    // check query results
    result.then(() => { // success query
      // Email information
      let mailInfo = {
        from: '"Royal Emerald Portal" <portal@re-rx.com>',
        to: req.body.email,
        subject: "Royal Emerald Portal Account",
        html: template.userInfoTemplate(req.body.name, req.body.email, password),
      };

      // email the user
      mail.transporter.sendMail(mailInfo,(err, info) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Internal server error in sending email',
          });
        }
        console.log(info);
        return res.status(200).json({
          message: 'User created',
        });
      });
    }).catch((err) => {
      return res.status(500).json({
        message: 'Internal server error in creating a user',
      });
    });
  });
});

// forgot password
router.post('/forgotpassword', (req, res) => {
  // check if user input email
  if(!req.body.email){
    return res.status(422).json({
      message: 'Please enter your email',
    });
  }

  let user = null;
  let token = generator.generate({length:50, numbers:true});

  // check if user exists
  getUser(req.body.email).then((data) => {
    user = data;
    // if the user doesn't exist
    if (data[0] == null) {
      return res.status(200).json({
        message: 'A password reset link has been has been sent to the specified email',
      });
    }

    return bcrypt.hash(token, 10);
  }).then((hash)=> {
    return createResetToken(user[0].user_id, hash);
  }).then(() => {
    let link = `http://localhost:8080/changepassword/${user[0].user_id}/${token}`;
    let mailInfo = {
      from: '"Royal Emerald Portal" <portal@re-rx.com>',
      to: req.body.email,
      subject: "Royal Emerald Portal Password Reset",
      html: template.passwordResetTemplate(link),
    };

    return mail.transporter.sendMail(mailInfo);
  }).then(() => {
    return res.status(200).json({
      message: 'A password reset link has been sent to the specified email. Please check your email for further instructions on how to reset your password.',
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error in creating a password reset form',
    });
  });
});

// change password
router.post('/changepassword', (req,res) => {
  // check if input is filled
  if(!req.body.password || !req.body.password2){
    return res.status(422).json({
      message: "Please fill out all required form fields",
    });
  }

  // check if password matches
  if(req.body.password != req.body.password2){
    return res.status(422).json({
      message: "Passwords do not match",
    });
  }

  // check if password is 8 char or more
  if( req.body.password.length < 8 ){
    return res.status(422).json({
      message: "Password must be atleast 8 characters",
    });
  }

  let resetToken = null;

  // get reset token
  let token = getResetToken(req.body.user_id);
  token.then((reset) => {
    resetToken = reset;

    // check if token exists and not expired
    if (reset[0] == null) {
      return res.status(401).json({
        message: "The link is either invalid or has expired. Please send another request if you wish to reset your password."
      });
    }

    // check if the token is valid
    return bcrypt.compare(req.body.token, reset[0].token);
  }).then((compareResult) => {
    if(!compareResult){
      return res.status(401).json({
        message: "The link is either invalid or has expired. Please send another request if you wish to reset your password."
      })
    }

    // hash password
    return bcrypt.hash(req.body.password, 10);
  }).then((hash) => {
    // update password
    return updatePassword(req.body.user_id, hash);
  }).then(() => {
    // delete token and return success message
    deleteResetToken(resetToken[0].reset_id);
    return res.status(200).json({
      message: "Your password was successfully reset",
    });
  }).catch((err) => {
    // log any error
    console.log(err);
    return res.status(500).json({
      message: "Internal server error in resetting password",
    });
  })
});

module.exports = router;