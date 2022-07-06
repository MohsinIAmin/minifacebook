const query = require('./db');
const helper = require('./helper');
const minioClient = require('./minioClient');

async function getStory(uid) {
    // console.log(uid);
    const rows = await query(`SELECT id, uid, etag,imgUrl FROM story WHERE uid!='${uid}' ORDER BY id DESC LIMIT 10`);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
}

// expires in a day.
async function saveImages(fileName, uid) {
    minioClient.presignedGetObject('minifacebook', fileName, 24 * 60 * 60, async function (err, presignedUrl) {
        if (err) return console.log(err)
        console.log(presignedUrl);
        const result = await query(`INSERT INTO story (uid, etag,imgUrl) VALUES ('${uid}',"${fileName}","${presignedUrl}")`);
        return presignedUrl;
    });
}
async function postStory(image) {
    console.log(image.file);
    const uid = image.body.uid;
    const imageFile = image.file;
    minioClient.putObject('minifacebook', imageFile.filename, imageFile.path, async function (error, etag) {
        if (error) {
            console.log('400', error);
            return { status: 400 };
        }
        // console.log('200', etag.etag);
        saveImages(imageFile.filename, uid);
        // const result = await query(`INSERT INTO story (uid, etag,imgUrl) VALUES ('${uid}',"${imageFile.filename}","${imgUrl}")`);
        return { status: 200 };
    });
}

module.exports = {
    getStory,
    postStory
};