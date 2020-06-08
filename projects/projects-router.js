const express = require('express');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    const { id } = req.params;
    if(id){
        Projects.get(id)
            .then(project => {
                if (project) {
                res.status(200).json(project);
                } else {
                res.status(404).json({ message: 'Project not found' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'Error retrieving the project'});
            })
    } else{
        Projects.get(req.query)
            .then(projects => {
                res.status(200).json(projects);
            })
            .catch(err => {
                console.log(err);
                res.status({ message: 'Error retrieving the projects'});
            })
    }
    
})
router.post('/', (req, res) => {
    const project = req.body;
    Projects.insert(project)
})
router.put('/', (req, res) => {
    const { id } = req.params;
    Projects.update(id)
})
router.delete('/', (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
})
module.exports = router;