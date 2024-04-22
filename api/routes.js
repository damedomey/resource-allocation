const {Router} = require('express');

const router = Router();

const resourceController = require('./controllers/resourceController');

router.post('/resources', resourceController.createResource);
router.get('/resources/form', resourceController.getForm);

module.exports = router;