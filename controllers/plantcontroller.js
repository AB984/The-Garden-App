var router = require('express').Router();

var Plant = require('../db').import('../models/plant');


//  POST create plant entry
router.post('/plants', (req, res) => {
    var owner = req.user.id;
    var common_name = req.body.common_name;
    var scientific_name = req.body.scientific_name;
    var images = req.body.images;
    var specifications = req.body.specifications;

    Plant.create({
        owner: owner,
        common_name: common_name,
        scientific_name: scientific_name,
        Images: images,
        specifications: specifications
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.json( { error: err } ))
});

//  GET ALL plants !! MOVE THIS TO APP.JS TO GET WITHOUT VALIDATION
router.get('/plants', (req, res) => {
    var userid = req.user.id;

    Plant.findAll({
        where: {owner: userid}
    }).then( findAllSuccess = data => {
            res.json(data);
        },
        findAllError = err => {
            res.send(500, err.message);
        }
    );
});

//  GET user's plant
router.get('/plants/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    Plant
        .findOne({
            where: { id: data, owner: userid}
        }).then(
            findOneSuccess = data => {
                res.json(data);
            },
            findOneError = err => {
                res.send(500, err.message);
            }
        );
});

// PUT update user's plant
router.put('/plants/:id', (req, res) => {
    Plant.update(req.body, { where: {id: req.params.id } })
        .then(log => res.status(200).send(`log ${req.params.id} updated!`))
        .catch(err => res.json({ error: err }))


});

// DELETE user's plant
router.delete('/plants/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    Plant
        .destroy({
            where: { id: data, owner: userid}
        }).then(
            deleteLogSuccess = data => {
                res.send("you removed a log");
            },
            deleteLogError = err => {
                res.send(500, err.message);
            }
        );
});

module.exports = router;