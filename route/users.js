// what you need for routes
const express = require('express');
const router = express.Router();

// other dependencies
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const {getUser, getAllUser, createUser} = require('../model/UserModel.js');
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

  // check if user exists
  let user = getUser(req.body.email);

  user.then((data) => {
    // if the user doesn't exist
    if (data[0] == null) {
      console.log('No user found');
      return res.status(200).json({
        message: 'A password reset link has been has been sent to the specified email',
      });
    }
    
    // generate reset token
    let user_id = data[0].user_id;
    let token = generator.generate({length:50, numbers:true});
    let currentDate = new Date();
    let date = `${parseInt(currentDate.getMonth()) + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
    currentDate.setHours(currentHours() + 1);
    let time= `${currentDate.getHours()}:${currentDate.getMinutes()}`;
    let datetime = `${date} ${time}`;
    let link = `http://localhost:8080/changepassword/${user_id}/${token}`;

    bcrypt.hash(token, 10, (err, hash) => {
      if(err){
        return res.status(500).json({
          message: 'Internal server error in generating password reset link',
        });
      }

      // create the token in the database
      let pwdToken = createResetToken(user_id, hash, datetime);

      pwdToken.then(() => {
        // email the user the link
        let mailInfo = {
          from: '"Royal Emerald Portal" <portal@re-rx.com>',
          to: req.body.email,
          subject: "Royal Emerald Portal Password Reset",
          html: template.passwordResetTemplate(link),
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
            message: 'A password reset link has been sent to the specified email. Please check your email for further instructions on how to reset your password.',
          });
        });
      }).catch(() => {
        return res.status(500).json({
          message: 'Internal server error in generating password reset link',
        });
      })
    })
  })
});

module.exports = router;