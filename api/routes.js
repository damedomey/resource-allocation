const {Router} = require('express');

const router = Router();

const resourceController = require('./controllers/resourceController');

router.post('/resources', resourceController.createResource);
router.get('/resources/form', resourceController.getForm);
router.get('/resources', resourceController.getAllResources);
router.delete('/resources/:id', resourceController.deleteResource);
module.exports = router;