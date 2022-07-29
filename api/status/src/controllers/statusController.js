const statusService = require('../services/statusService');
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

async function getStatus(req, res) {
    try {
        uid = await verifyToken(req.headers.authorization);
        if (uid == null) {
            res.send({ status: 402, message: "not verified" });
        }
        res.json(await statusService.getStatus(uid));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}

async function postStatus(req, res) {
    try {
        uid = await verifyToken(req.headers.authorization);
        if (uid == null) {
            res.send({ status: 402, message: "not verified" });
        }
        res.json(await statusService.postStatus(uid, req.body.status));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}

module.exports = {
    getStatus,
    postStatus
};