const bodyParser = require('body-parser');
const express = require('express');

require('./models/CalculationSchema');
require('./dbConnect');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./routes/calculatorApi')(app);

app.listen(port, () => console.log(`app listening to port ${port}`));
