const {Router} = require('express');

const router = Router();

const equipmentController = require('./controllers/equipmentController');
const occupationTypeController = require('./controllers/occupationTypeController');
const authorizedUserController = require('./controllers/authorizedUserController');

router.get('/equipments', equipmentController.getAllEquipment);
router.get('/occupation-types', occupationTypeController.getAllTypes);
router.get('/authorized-users', authorizedUserController.getAllAuthorizedUsers);

module.exports = router;