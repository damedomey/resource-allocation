const fs = require("fs");
const getAllAuthorizedUsers = async (req, res) => {
    fs.readFile('data/authorized-users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const users = JSON.parse(data);

        res.send(users);
    })
}

module.exports = {getAllAuthorizedUsers}