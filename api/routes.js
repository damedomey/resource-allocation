const {Router} = require('express');

const router = Router();

const equipmentController = require('./controllers/equipmentController');
const occupationTypeController = require('./controllers/occupationTypeController');

router.get('/equipments', equipmentController.getAllEquipment);
router.get('/occupation-types', occupationTypeController.getAllTypes);

module.exports = router;