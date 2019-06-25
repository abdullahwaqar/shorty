const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const urls = require('./db/urls');

//* Init the main app
const app = express();

//* Middlewares init
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.post('/api/shorty', async (req, res) => {
    console.log(req.body);
    try {
        const url = await urls.create(req.body);
        res.json(url);
    } catch (error) {
        res.json(error).status(500);
    }
});

//* Port setup
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port: ${port}`));