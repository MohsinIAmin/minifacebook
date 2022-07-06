const jwt = require('jsonwebtoken')
const jwt_secret = require('../config/jwt.congif').JWT_SECRET;

module.exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        res.send({ status: 401 });
    } else {
        jwt.verify(req.headers.authorization, jwt_secret, function (err, decoded) {
            if (decoded) {
                req.user = decoded.data;
                next();
            } else {
                res.send({ status: 401 });
            }
        })
    }
}