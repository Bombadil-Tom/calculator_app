const bodyParser = require('body-parser');
const express = require('express');

require('./models/CalculationSchema');
require('./dbConnect');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./routes/calculatorApi')(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`app listening to port ${PORT}`));
