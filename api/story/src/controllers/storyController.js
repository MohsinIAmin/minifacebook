const storyService = require('../services/storyService');
const axios = require('axios');
const userUrl = require('../config/peer.config').serverUrl.user;

async function verifyToken(token) {
    let uid;
    await axios.post(userUrl, { token: token })
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
        console.error(err);
        res.send({ status: 500, message: err });
    }
}

async function postStory(req, res) {
    try {
        uid = await verifyToken(req.headers.authorization);
        if (uid == null) {
            res.send({ status: 402, message: "not verified" });
        }
        res.json(await storyService.postStory(uid, req));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}

module.exports = {
    getStory,
    postStory,
    getFile
};