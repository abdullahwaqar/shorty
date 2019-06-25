const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//* Init the main app
const app = express();

//* Middlewares init
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('i woel')
});


//* Port setup
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port: ${port}`));