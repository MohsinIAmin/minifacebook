const storyService = require('../services/storyService');
const axios = require('axios');
const authUrl = require('../config/peer.config').serverUrl.auth;

async function verifyToken(token) {
    let uid;
    await axios.post(authUrl, { token: token })
        .then(res => {
            if (res.data.status == 200) {
                uid = res.data.uid;
            }
        })
        .catch(error => {
            console.error(error);
        });
    return uid;
}


async function getStory(req, res) {
    try {
        uid = await verifyToken(req.headers.authorization);
        if (uid == null) {
            res.send({ status: 402, message: "not verified" });
        }
        res.json(await storyService.getStory(uid));
    } catch (err) {
        res.send({ status: 500, message: err });
    }
}

async function getFile(req, res) {
    try {
        uid = await verifyToken(req.headers.authorization);
        if (uid == null) {
            res.send({ status: 402, message: "not verified" });
        }
        await storyService.getFile(req.params.filename, res);
    } catch (err) {
        res.send({ status: 500, message: err });
    }
}

async function postStory(req, res) {
    try {
        uid = await verifyToken(req.headers.authorization);
        if (uid == null) {
            res.send({ status: 402, message: "not verified" });
        }
        res.json(await storyService.postStory(req));
    } catch (err) {
        console.log(err);
        res.send({ status: 500, message: err });
    }
}

module.exports = {
    getStory,
    postStory,
    getFile
};