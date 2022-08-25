const authService = require('../services/authService');

async function login(req, res) {
    try {
        res.json(await authService.login(req.body));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}

async function register(req, res) {
    try {
        res.json(await authService.register(req.body));
    } catch (err) {
        console.error(err);
        res.send({ status: 500, message: err });
    }
}

async function verifyToken(req, res) {
    try {
        res.json(await authService.verifyToken(req.body.token));
    } catch (err) {
        console.error(err);
        res.send({ status: 401, message: err });
    }
}

module.exports = {
    register,
    login,
    verifyToken
}