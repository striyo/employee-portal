// what you need for routes
const express = require('express');
const router = express.Router();
const multer = require('multer');

// other dependencies
const bcrypt = require('bcrypt');
const generator = require('generate-password');
const {getUser, getAllUser, createUser, updatePassword, searchUsers, updateUser, updateUserPicture} = require('../model/UserModel.js');
const {createResetToken, deleteResetToken, getResetToken} = require('../model/PwdResetModel.js');
const template = require('../config/emailTemplate.js');
const mail = require('../config/email.js');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './profile/');
  },
  filename: (req, file, cb) => {
    const fileName =  Date.now() + file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  },
});

var upload = multer(
  {
    storage: storage,
    fileFilter: function(_req, file, cb){
      if( file.mimetype == 'image/png' || file.mimptype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  }
);

// routes

// login status
router.get('/status', (req, res) => {
    return res.status(200).json({
        user: req.session.user,
    });
});

// Login
router.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            message: 'Please fill out all required fields',
        });
    }

    let user = null;

    // query user table
    getUser(req.body.email).then((data) => {
        // If the user does not exist
        if (data.length == 0) {
            return Promise.reject('Invalid Credentials', 401);
        }

        user = data[0];
        // check if password matches
        return bcrypt.compare(req.body.password, data[0].password);
    }).then((result) => {
        if (!result) {
            return Promise.reject('Invalid Credentials', 401);
        }
        // store user data except their password
        let output = {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            is_admin: user.is_admin,
            is_active: user.is_active,
            rate: user.rate,
            salaried: user.salaried,
            profile_picture: user.profile_picture,
        }

        if (user.is_active == 0) {
            return Promise.reject('Invalid Credentials', 401);
        }

        req.session.user = output;
        return res.status(200).json({
            message: 'Successfully Logged In',
            user: output,
        });
        // Internal error
    }).catch((err, status = 500) => {
        console.log(err);
        return res.status(status).json({
            message: err,
        });
    })
})

// logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({
        message: 'Logged out',
    });
});

// register
router.post('/register', (req, res) => {
    const saltRounds = 10;

    // check if the person making request is logged in and an admin
    /*
    if (!req.session.user.isAdmin) {
      return res.status(403).json({
        message: "Unathorized",
      });
    }
    */

    // check if all fields are filled
    if (!req.body.name || !req.body.phone || !req.body.email || !req.body.rate || req.body.salaried == null || req.body.is_admin == null) {
        return res.status(422).json({
            message: "Please fill out all required fields",
        });
    }

    // generate random password
    let password = generator.generate({ length: 15, numbers: true });

    // hash password
    bcrypt.hash(password, saltRounds).then((hash) => {
        return createUser(req.body.name, req.body.phone, req.body.email, hash, req.body.rate, req.body.salaried, req.body.is_admin, true)
    }).then(() => {
        // Email information
        let mailInfo = {
            from: '"Royal Emerald Portal" <portal@re-rx.com>',
            to: req.body.email,
            subject: "Royal Emerald Portal Account",
            html: template.userInfoTemplate(req.body.name, req.body.email, password),
        };

        // email the user
        return mail.transporter.sendMail(mailInfo);
    }).then(() => {
        return res.status(200).json({
            message: 'User created',
        });
    }).catch((err, status = 500) => {
        return res.status(status).json({
            message: err,
        });
    });
});

// forgot password
router.post('/forgotpassword', (req, res) => {
    // check if user input email
    if (!req.body.email) {
        return res.status(422).json({
            message: 'Please enter your email',
        });
    }

    let user = null;
    let token = generator.generate({ length: 50, numbers: true });

    // check if user exists
    getUser(req.body.email).then((data) => {
        user = data;
        // if the user doesn't exist
        if (data.length == 0) {
            return Promise.reject('A password reset link has been has been sent to the specified email', 200);
        }

        return bcrypt.hash(token, 10);
    }).then((hash) => {
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
    }).catch((err, status = 500) => {
        console.log(err);
        res.status(status).json({
            message: err,
        });
    });
});

// change password
router.post('/changepassword', (req, res) => {
    // check if input is filled
    if (!req.body.password || !req.body.password2) {
        return res.status(422).json({
            message: "Please fill out all required form fields",
        });
    }

    // check if password matches
    if (req.body.password != req.body.password2) {
        return res.status(422).json({
            message: "Passwords do not match",
        });
    }

    // check if password is 8 char or more
    if (req.body.password.length < 8) {
        return res.status(422).json({
            message: "Password must be at least 8 characters",
        });
    }

    let resetToken = null;

    // get reset token
    let token = getResetToken(req.body.user_id);
    token.then((reset) => {
        resetToken = reset;

        // check if token exists and not expired
        if (reset.length == 0) {
            return Promise.reject('Invalid Credentials', 401);
        }

        // check if the token is valid
        return bcrypt.compare(req.body.token, reset[0].token);
    }).then((compareResult) => {
        if (!compareResult) {
            return Promise.reject("The link is either invalid or has expired. Please send another request if you wish to reset your password.", 401);
        }

        // hash password
        return bcrypt.hash(req.body.password, 10);
    }).then((hash) => {
        // update password
        return updatePassword(req.body.user_id, hash);
    }).then(() => {
        // delete token and return success message
        return deleteResetToken(resetToken[0].reset_id);
    }).then(() => {
        return res.status(200).json({
            message: "Your password was successfully reset",
        });
    }).catch((err, status = 500) => {
        // log any error
        console.log(err);
        return res.status(status).json({
            message: err,
        });
    })
});

router.post('/search', (req, res) => {
    // check if user is logged in
    if (req.session.user == null) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    // check if there's a search field
    if (!req.body.search) {
        return res.status(422).json({
            message: 'Please fill out all required form fields',
        });
    }

    // query db
    searchUsers(req.body.search).then((users) => {
        return res.status(200).json({
            users: users,
            message: 'Employees fetched',
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: err,
        });
    });
});

// update profile picture
router.put('/picture',upload.single('picture'), (req,res) => {
  // check if logged and has permission
  if (req.session.user == null || req.body.user_id != req.session.user.user_id ) {
    return res.status(403).json({
      message: 'Unauthorized',
    });
  }

  // check file exists
  if( req.file == null ){
    return res.status(422).json({
      message: 'Please select a picture to upload',
    });
  }

  let remove = null;
  // delete profile picture if exist
  if( req.session.user.profile_picture != null ){
    remove = new Promise((resolve, reject) => {
      fs.unlink(`./profile/${req.session.user.profile_picture}`, () => {
        resolve();
      });
    });
  }

  // query db
  remove.then(() => {
    return updateUserPicture(req.body.user_id, req.file.filename);
  }).then(() => {
    req.session.user.profile_picture = req.file.filename;
    return res.status(200).json({
      message: 'Picture updated',
      picture: req.file.filename,
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).json({
      message: err,
    });
  });
});

router.put('/', (req, res) => {
    // check if logged and has permission
    if (req.session.user == null || req.session.user.is_admin == 0) {
        return res.status(403).json({
            message: 'Unauthorized',
        });
    }

    // query db
    updateUser(req.body.user).then(() => {
        return res.status(200).json({
            message: 'Employee info updated',
        });
    }).catch((err) => {
        console.log(err);
        return res.status(500).json({
            message: err,
        });
    });
})

// get user profile picture
router.get('/picture/:file', (req, res) => {
  // check if logged in
  if(req.session.user == null){
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  let file = `./profile/${req.params.file}`;

  fs.access( file, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    }

    return res.status(200).sendFile(path.resolve(file));
  });
});


module.exports = router;