const {Router} = require('express');

const router = Router();

const equipmentController = require('./controllers/equipmentController');

router.get('/equipments', equipmentController.getAllEquipment);

module.exports = router;