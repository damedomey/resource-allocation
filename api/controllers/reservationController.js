const common = require('./common');
const database = require('../config/database.js');


const getAvailableResources = async (req, res) => {
    const criteria = req.body;
    const resources = await common.findAvailableResources(criteria);
    res.send(resources);
}

const getAllReservations = async (req, res) => {
    let reservations = [];
    try {
        reservations = await database.getData('/reservations');
    } catch (error) {
        await database.push('/reservations', []);
    }

    let resources = {};
    try {
        (await database.getData('/resources')).forEach(resource => {
            resources[resource.id] = resource;
        });
    } catch (error) {
        await database.push('/resources', []);
    }
    reservations.map(reservation => {
        reservation.resource = resources[reservation.resourceId];
        return reservation;
    })
    res.send(reservations);
}

const makeReservation = async (req, res) => {
    const resourceId = parseInt(req.body.resourceId);
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const numberOfPeople = parseInt(req.body.numberOfPeople);

    // Vérification de la disponibilité de la ressource
    const criteria = {
        id: resourceId,
        startTime,
        endTime
    };

    const availableResources = await common.findAvailableResources(criteria);
    if (availableResources.length === 0) {
        return res.status(400).send('Ressource non disponible pour la plage horaire sélectionnée');
    }

    // Création de la réservation
    const reservation = await createReservation({
        resourceId,
        startTime,
        endTime,
        numberOfPeople
    });

    res.json(reservation);
}

const createReservation = async (reservation) => {
    try {
        // 1. Validate reservation data
        const { resourceId, startTime, endTime, numberOfPeople } = reservation;
        if (!resourceId || !startTime || !endTime || numberOfPeople <= 0) {
            throw new Error('Invalid reservation data');
        }

        const reservationsData = await  database.getData('/reservations') || [];
        const newReservationId = reservationsData.length ? Math.max(...reservationsData.map((r) => r.id)) + 1 : 1;
        const newReservation = {
            id: newReservationId,
            resourceId,
            startTime,
            endTime,
            numberOfPeople
        };
        reservationsData.push(newReservation);
        await database.push('/reservations', reservationsData);

        return newReservation;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = {getAvailableResources, getAllReservations, makeReservation}