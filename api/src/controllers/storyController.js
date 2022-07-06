const storyService = require('../services/storyService');

async function getStory(req, res) {
    try {
        console.log(req.param);
        res.json(await storyService.getStory(req.params.uid));
    } catch (err) {
        console.log(err);
        res.send({ status: 500, message: err });
    }
}

async function postStory(req, res) {
    try {
        res.json(await storyService.postStory(req));
    } catch (err) {
        console.log(err);
        res.send({ status: 500, message: err });
    }
}

module.exports = {
    getStory,
    postStory
};