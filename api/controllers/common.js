const database = require("../config/database");
const findAvailableResources = async (criteria) => {
    const resources = await database.getData('/resources') || [];

    const startTime = new Date(criteria.startTime);
    const endTime = new Date(criteria.endTime);

    let reservationsData = [];
    try {
        reservationsData = await database.getData('/reservations');
    } catch (error) {
        await database.push('/reservations', []);
    }

    const conflictingReservations = reservationsData.filter((reservation) => {
        const reservationStartTime = new Date(reservation.startTime);
        const reservationEndTime = new Date(reservation.endTime);

        return (
            (startTime >= reservationStartTime && startTime < reservationEndTime) ||
            (endTime > reservationStartTime && endTime <= reservationEndTime)
        );
    });

    const conflictingReservationsIds = conflictingReservations.map((reservation) => reservation.resourceId);

    return resources.filter(async (resource) => {
        const startTimeHour = startTime.getHours() * 60 + startTime.getMinutes();
        const endTimeHour = endTime.getHours() * 60 + endTime.getMinutes();
        const resourceStartTimeHour = createDateFromTimeString(resource.startTime).getHours() * 60 + createDateFromTimeString(resource.startTime).getMinutes();
        const resourceEndTimeHour = createDateFromTimeString(resource.endTime).getHours() * 60 + createDateFromTimeString(resource.endTime).getMinutes();

        return (
            resource.resourceType === criteria.resourceType &&
            resource.maxCapacity >= criteria.minCapacity &&
            startTimeHour >= resourceStartTimeHour &&
            endTimeHour <= resourceEndTimeHour &&
            conflictingReservationsIds.indexOf(resource.id) === -1
        );
    });
};
function createDateFromTimeString(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number); // Split and convert to numbers
    return new Date(0, 0, 0, hours, minutes); // Create Date object with 0 for year, month, day
}
module.exports = {findAvailableResources};