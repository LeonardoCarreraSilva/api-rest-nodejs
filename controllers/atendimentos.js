const Atendimentos = require('../models/atendimentos');


module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimentos.lista(res);
  });

  app.post('/atendimentos', (req, res) =>{
    const atendimento = req.body;
    Atendimentos.adicionar(atendimento, res);
   
  });
}