const fs = require("fs");
const getAllEquipment = async (req, res) => {
    fs.readFile('data/equipments.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const equipment = JSON.parse(data);

        res.send(equipment);
    })
}

module.exports = {getAllEquipment}