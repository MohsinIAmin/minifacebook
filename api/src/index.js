const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const statusRouter = require('./routes/statusRoutes');
const storyRouter = require('./routes/storyRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => {
    res.send('<h2>hi</h2>');
});

app.use('/auth', authRouter);
app.use('/status', statusRouter);
app.use('/story', storyRouter);

app.listen(PORT, () => {
    console.log(`MiniFacebook backend is listening on port ${PORT}`);
});