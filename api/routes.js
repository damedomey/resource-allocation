const {Router} = require('express');

const router = Router();

const resourceController = require('./controllers/resourceController');
const reservationController = require('./controllers/reservationController');

router.post('/resources', resourceController.createResource);
router.get('/resources/form', resourceController.getForm);
router.get('/resources', resourceController.getAllResources);
router.get('/resources/:id', resourceController.getResourceById);
router.delete('/resources/:id', resourceController.deleteResource);

router.post('/reservations/check-availability', reservationController.getAvailableResources);
router.get('/reservations', reservationController.getAllReservations);
router.post('/reservations', reservationController.makeReservation);

module.exports = router;