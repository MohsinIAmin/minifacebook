const Minio = require('minio');
const config = require('../config/minio.config');

const minioClient = new Minio.Client({
    endPoint: config.objDB.endPoint,
    port: config.objDB.port,
    accessKey: config.objDB.accessKey,
    secretKey: config.objDB.secretKey,
    useSSL: false
});

module.exports = minioClient;