const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .then(err => {
            console.log(err);
            res.status(500).json({ message: 'Actions could not be fetched'});
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Actions.get(id)
    .then(comments => {
        if(comments){
            res.status(200).json(comments)
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})


router.post('/', (req, res) => {
    const action = req.body;

    Actions.insert(action)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'New action could not be stored'});
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedAction = req.body;

    Actions.update(id, updatedAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Action could not be updated'})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Action could not be deleted'})
        })
})

module.exports = router;