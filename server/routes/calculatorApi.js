const uuidv1 = require('uuid/v1');

module.exports = (app) => {
  app.get('/', (req, res) => res.send('hello World'));


  app.post('/calculations', (req, res) => {
    const newUuid = uuidv1();
    res.status(201).send({id: newUuid});
  });

  app.get('/calculations', (req, res) => {
    res.send([]);
  });

  app.get('/calculations/:calculationId', (req, res) => {
    const data = { id: 'ed194837-26e1-49fd-95d5-7bb3ae79261f', tokens: [ { type: 'number', value: 5 } ] };
    res.send(data);
  });

  app.post('/calculations/:calculationsId/tokens', (req, res) => {
    res.status(201).send(req.body);
  });

  app.get('/calculations/:calculationsId/result', (req, res) => {
    res.send({result: 10});
  });
};
