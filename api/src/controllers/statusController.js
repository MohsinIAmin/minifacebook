const statusService = require('../services/statusService');

async function getStatus(req, res) {
    try {
        res.json(await statusService.getStatus(req.params.uid));
    } catch (err) {
        console.log(err);
        res.send({ status: 500, message: err });
    }
}

async function postStatus(req, res) {
    try {
        res.json(await statusService.postStatus(req.body));
    } catch (err) {
        console.log(err);
        res.send({ status: 500, message: err });
    }
}

module.exports = {
    getStatus,
    postStatus
};