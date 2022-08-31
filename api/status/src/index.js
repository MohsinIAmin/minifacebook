const express = require('express');
const cors = require('cors');
const statusRouter = require('./routes/statusRoutes');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/status', statusRouter);

app.listen(PORT, () => {
    console.log(`MiniFacebook status service is listening on port ${PORT}`);
});