// what you need for routes
const express = require('express');
const router = express.Router();
module.exports = router;

const { get, getAllUser, createUser, updatePassword, searchUsers, updateUser } = require('../model/UserModel.js');

router.post('/add', (req, res) => {
    let users_exist = true;
    let users_mult = false;
    // let users = [];
    let promises = [];
    // let promises2 = [];
    for (let i = 0; i < req.body.people.length; i += 1) {
        promises.push(searchUsers(req.body.people[i]).then((users) => {
            console.log(req.body.people[i]);
            if (users.length === 0) {
                users_exist = false;
            } else if (users.length > 1) {
                users_mult = true;
            }
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: err,
            });
        }));
    }
    Promise.all(promises).then(() => {
        if (!users_exist) {
            return res.status(422).json({
                message: "Please make sure all users exist",
            });
        } else if (users_mult) {
            return res.status(422).json({
                message: "Please make sure all users are unique",
            });
        }
        createTodo(req.session.user.user_id, req.body.description).then(() => {
            return res.status(200).json({
                message: 'Your todo has been created.',
            });
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: err,
            });
        });
        // for (i = 0; i < req.body.people.length; i += 1) {
        //     promises2.push(createTodo(req.body, req.body.endDate, req.body.startTime, req.body.endTime, req.body.title, req.body.body).then(() => {
        //     }).catch((err) => {
        //         console.log(err);
        //         return res.status(500).json({
        //             message: err,
        //         });
        //     }));
        // }
        // Promise.all(promises2).then(() => {
        //     return res.status(200).json({
        //         message: 'Your todo has been created.',
        //     });
        // }).catch((err) => {
        //     return res.status(500).json({
        //         message: err,
        //     });
        // });
    }).catch((err) => {
        return res.status(500).json({
            message: err,
        });
    });
})


module.exports = router;