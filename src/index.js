const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config({ path: '.env' });
const pkg = require('../package.json');

const port = process.env.PORT || 3001;

const app = express();

app.set('pkg', pkg);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

const userRoutes = require('./routes/users.routes');


app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message
    })
});

app.use(userRoutes);

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
});

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log("Server on port " + port);
});