const query = require('./db');
const helper = require('./helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../config/jwt.congif').JWT_SECRET;

async function login(user) {
    const { email, password } = user;
    if (!(email && password)) {
        return { status: 400, message: "all input required" };
    }
    const rows = await query(`SELECT id, email, password FROM users WHERE email='${email}'`);
    if (rows.length == 0) {
        return { status: 409, message: "user dont have an account" };
    }
    const data = helper.emptyOrRows(rows);
    const compare = await bcrypt.compare(password, data[0].password);
    if (!compare) {
        return { status: 400, message: "invalid credentials" };
    }
    const token = jwt.sign(data[0], jwt_secret, { expiresIn: "2h" });
    data[0].token = token;
    data[0].password = '';
    const userdata = data[0];
    return { status: 200, userdata };
}

async function register(user) {
    const { email, password } = user;
    if (!(email && password)) {
        return { status: 400, message: "all input required" };
    }
    const rows = await query(`SELECT id, email, password FROM users WHERE email='${email}'`);
    const result1 = helper.emptyOrRows(rows);
    if (result1.length) {
        return { status: 409, message: "user already exist" };
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const result = await query(`INSERT INTO users (email, password) VALUES ("${email}","${encryptedPassword}")`);

    if (result.affectedRows) {
        return { status: 201, message: "user created successfully" };
    }
    return { status: 500, message: "error in creating new user" };
}

async function verifyToken(token) {
    let email = '';
    let st = 401;
    jwt.verify(token, jwt_secret, function (err, decoded) {
        if (decoded) {
            email = decoded.email;
            st = 200;
        }
    });
    return { status: st, uid: email };
}

module.exports = {
    login,
    register,
    verifyToken
}