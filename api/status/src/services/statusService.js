const query = require('./db');
const helper = require('./helper');

async function getStatus(uid) {
    // i want to change it
    const rows = await query(`SELECT id, uid, status, timestamp FROM status WHERE uid!='${uid}' ORDER BY timestamp DESC LIMIT 10`);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
}

async function postStatus(uid, newstatus) {
    const timestamp = Date.now();
    const result = await query(`INSERT INTO status (uid, status, timestamp) VALUES ('${uid}',"${newstatus}",${timestamp})`);
    if (result.affectedRows) {
        return { status: 201, message: "Status posted successfully" };
    }
    return { status: 500, message: "error in posting new status" };
}

module.exports = {
    getStatus,
    postStatus
};