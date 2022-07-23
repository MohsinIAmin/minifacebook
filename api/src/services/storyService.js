const { v4: uuidv4 } = require('uuid');
const query = require('./db');
const helper = require('./helper');
const minioClient = require('./minioClient');

async function getStory(uid) {
    const rows = await query(`SELECT id, uid, filename,timestamp FROM story WHERE uid!='${uid}' ORDER BY timestamp DESC LIMIT 10`);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
}

async function getFile(filename, res) {
    let data;
    minioClient.getObject('minifacebook', filename, function (err, objStream) {
        if (err) {
            res.send({ status: 404 });
            return;
        }
        // console.log(objStream);
        objStream.on('data', function (chunk) {
            data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);
        })
        objStream.on('end', function () {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.write(data);
            res.end();
        })
        objStream.on('error', function (err) {
            res.status(500);
            res.send(err);
        })
    });
}

async function postStory(image) {
    const uuid = uuidv4() + '.jpg';
    const imageFile = image.file;
    minioClient.fPutObject('minifacebook', uuid, imageFile.path, async function (error) {
        if (error) {
            return { status: 400 };
        }
    });
    const uid = image.body.uid;
    const timestamp = Date.now();
    const result = await query(`INSERT INTO story (uid, filename,timestamp) VALUES ('${uid}',"${uuid}","${timestamp}")`);
    if (result.affectedRows) {
        return { status: 201, message: "Story posted successfully" };
    }
    return { status: 500, message: "error in posting new story" };
}

module.exports = {
    getStory,
    postStory,
    getFile
};