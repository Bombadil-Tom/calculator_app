const mongoose = require('mongoose');
const { isTokenValid, isTokenTypeCorrect } = require('../utils/validateToken');

const Calculation = mongoose.model('calculations');

module.exports = (app) => {

  app.get('/', (req, res) => res.send('hello World'));

  app.post('/calculations', async(req, res) => {
    const calculation = new Calculation();

    try{
      await calculation.save(); 
      const { id } = calculation;
      res.status(201).send({id});
    }catch(err){
      res.status(422).send(err);
    }
  });

  app.get('/calculations', async(req, res) => {
    const calculations = await Calculation.find();
    res.send(calculations);
  });

  app.get('/calculations/:calculationId', async (req, res) => {
    const { calculationId } = req.params;
    const calculation = await Calculation.findOne({_id:calculationId});
    
    if(!calculation) return res.status(404).send("No entry wit this id");
    
    res.send(calculation);
  });

  app.post('/calculations/:calculationId/tokens', async(req, res) => {
    const { calculationId } = req.params;
    const { type, value } = req.body;
    const token = { type, value };

    if (!isTokenValid(token)) return res.status(400).send('Type and value do not match');

    const calculation = await Calculation.findOne({_id:calculationId});
    
    if(calculation.length === 0) return res.status(404).send('not the right calculation');

    const { tokens } = calculation;

    if(!isTokenTypeCorrect(tokens,token)) return res.status(400).send('Token type incorrect');

    calculation.tokens.push(token);

    try{
      await calculation.save();
      res.status(201).send(token);
    }catch(e){ 
      res.status(422).send(err);
    }
  });

  app.get('/calculations/:calculationId/result', (req, res) => {
    res.send({result: 10});
  });
};
