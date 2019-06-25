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

app.get('/:name', async (req, res) => {
    const name = req.params.name;
    const shorty = await urls.find(name);
    if (shorty) {
        res.redirect(shorty.url);
    } else {
        res.redirect(`/404.html?name=${name}`);
    }
});

app.post('/api/shorty', async (req, res) => {
    try {
        const url = await urls.create(req.body);
        res.json(url);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
});

//* Port setup
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port: ${port}`));