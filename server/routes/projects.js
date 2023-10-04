const express = require('express');
const router = express.Router();
// const db = require('../configs/db.config');
const projectQueries = require('../db/queries/projects');

router.get('/', async (req, res) => {
  console.log('Tasks route hit');
  try {
    const selectedProject = await projectQueries.getProject(req); //req should be id
    res.status(200).json(selectedProject.rows);
  } catch (error) {
    console.error('Error during fetching projects-server side:', error);
    res.status(500).send('Server Error');
  }
});
router.post('/:id', async (req, res) => {
  console.log("adding project", req.params);
  try {
    const newProject = await projectQueries.addProject(req); //do i need to destructure req
    res.status(200).json(newProject.rows);
  } catch (error) {
    console.error('Error during adding project-server side:', error);
    res.status(500).send('Server Error');
  }
});


module.exports = router;