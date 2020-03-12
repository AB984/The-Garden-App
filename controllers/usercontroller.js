var router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// router.get('/', (req, res) => {
//     res.send('This is from the user controller!');
// });

router.post('/signup', (req, res) => {
    var email = req.body.user.email;
    var pass = req.body.user.password;

    User.create({
        email: email,
        password: bcrypt.hashSync(pass, 10)
    }).then(createSuccess = user => {
        var token = jwt.sign({
                id: user.id
            },
            process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            });
        res.json({
            email: user,
            message: 'created user',
            sessionToken: token
        });
    })
})

router.post('/login', (req, res) => {
    User.findOne( {
        where: { 
            email: req.body.user.email
        }
    })
    .then( user => {
            if(user){
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if(matches){
                        var token = jwt.sign({
                            id: user.id
                        }, process.env.JWT_SECRET, {
                            expiresIn: 60*60*24
                        });
                        res.json({
                            user: user,
                            message: "successfully logged in",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({error: "You have a bad gateway"});
                    }
                });
            } else {
                res.status(500).send({error: "failed to authenticate user"});
            }
    }, err => res.status(501).send({error: "failed to proccess authentication"}))
});


module.exports = router;