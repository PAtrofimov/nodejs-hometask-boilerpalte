const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./routes/index');
routes(app);

app.use('/', express.static('./client/build'));

const port = 3050;
app.listen(port, () => {

});

exports.app = app;