const express = require('express')
const { Genre, validate } = require('../model/genre')
const route = express.Router()
const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

route.get('/', async (req, res) => {

    try{

        const genres = await Genre.find().sort('name');

        res.send(genres)

    }catch(err) {
        res.status(500).json({success: false, err: err.message})
    }
})

route.get('/:id', validateObjectId, async (req, res) => {

    const genre = await Genre.findById(req.params.id);
  
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    res.send(genre);
});

  
route.post('/', auth, async (req, res) => {

    try{

        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const { name } = req.body

        const genre = new Genre({ name });
        await genre.save();
    
        res.status(200).send(genre);
    }catch(err) {
        console.log(err.message)
        res.status(500).send(err)
    }
})

route.put('/:id', auth, async (req, res) => {

    try{

        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
    
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
        });
    
        if (!genre) return res.status(404).send('The genre with the given ID was not found.');
        
        res.status(200).send(genre);

    }catch(err) {
        console.log(err.message)
        res.status(500).send(err)
    }
});
  
route.delete('/:id', [auth, admin], async (req, res) => {

    try{

        const genre = await Genre.findByIdAndRemove(req.params.id);
    
        if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
        res.status(200).send(genre);

    }catch(err) {
        console.log(err.message)
        res.status(500).send(err)
    }
});

module.exports = route