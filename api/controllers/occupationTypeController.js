const fs = require("fs");
const getAllTypes = async (req, res) => {
    fs.readFile('data/occupation-type.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const types = JSON.parse(data);

        res.send(types);
    })
}

module.exports = {getAllTypes}