// what you need for routes
const express = require('express');
const router = express.Router();
module.exports = router;

//userModel
const { get, getAllUser, createUser, updatePassword, searchUsers, updateUser } = require('../model/UserModel.js');
//eventModel
const { createTodo, createTodoReceiver } = require('../model/TodosModel.js');

router.post('/add', (req, res) => {
    let users_exist = true;
    let users_mult = false;
    let user_ids = [];
    let promises = [];
    let promises2 = [];
    for (let i = 0; i < req.body.people.length; i += 1) {
        promises.push(searchUsers(req.body.people[i]).then((users) => {
            if (users.length === 0) {
                users_exist = false;
            } else if (users.length > 1) {
                users_mult = true;
            }
            user_ids.push(users[0].user_id);
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
            for (i = 0; i < user_ids.length; i += 1) {
                promises2.push(createTodoReceiver(req.session.user.user_id, req.body.description, user_ids[i]).then(() => {
                }).catch((err) => {
                    console.log(err);
                    return res.status(500).json({
                        message: err,
                    });
                }));
            }
            Promise.all(promises2).then(() => {
                return res.status(200).json({
                    message: 'Your todo has been created.',
                });
            }).catch((err) => {
                return res.status(500).json({
                    message: err,
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                message: err,
            });
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err,
        });
    });
})


module.exports = router;