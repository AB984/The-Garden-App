var router = require('express').Router();
// let fetch = require('node-fetch');
// const request = require('request');
const fetch = require('node-fetch')
// var Trefle = require('../db').import('../models/trefle');
var Trefle = require('../db').import('../models/plant');

//  POST create plant entry
router.post('/trefle', (req, res) => {
    var owner = req.user.id;
    var scientific_name = req.body.scientific_name;
    var common_name = req.body.common_name;
    var specifications = req.body.specifications;

    Trefle.create({
        owner: owner,
        scientific_name: scientific_name,
        common_name: common_name,
        specifications: specifications
    })
    .then(data => res.status(200).json(data))
    .catch(err => res.json( { error: err } ))
});


router.get('/trefleauth', async (req, res) => {
    try {
        
        let fetchAllPlants = await fetch("https://trefle.io/api/plants?=", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'M0RnR3hmWTl1aFpCdk9hM2F1MzVEZz09'
            }
        })
        
        let jsonData = await fetchAllPlants.json()
        let moreInfo = await handleData();
        
        
        async function handleData() {
    
            let responseObj = {
                    plants: []
                }

                for(let plant of jsonData) {
                    let fetchEach = await fetch(plant.link, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'M0RnR3hmWTl1aFpCdk9hM2F1MzVEZz09'
                    }})
                    let json = await fetchEach.json();
                    let plantObj = {
                            scientific_name: plant.scientific_name,
                            common_name: plant.common_name,
                            images: json.images
                            }
                    responseObj.plants.push(plantObj)
                }
                return responseObj
    }

    res.status(200).send(moreInfo)


    } catch(e) {
        console.log(e)
        res.status(500).json({error: e})
    }
})

//  GET ALL plants !! 
router.get('/trefle', (req, res) => {
    var userid = req.user.id;

    Trefle.findAll({
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
router.get('/trefle/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    Trefle
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
router.put('/trefle/:id', (req, res) => {
    Trefle.update(req.body, { where: {id: req.params.id } })
        .then(log => res.status(200).send(`log ${req.params.id} updated!`))
        .catch(err => res.json({ error: err }))


});

// DELETE user's plant
router.delete('/trefle/:id', (req, res) => {
    var data = req.params.id;
    var userid = req.user.id;

    Trefle
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