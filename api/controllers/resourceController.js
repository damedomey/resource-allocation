const createResource = async (req, res) => {
    // Get request body
    const resource = req.body;
    console.log(resource);
}

module.exports = {createResource}