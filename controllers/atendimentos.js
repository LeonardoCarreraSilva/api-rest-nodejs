const Atendimentos = require('../models/atendimentos');


module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('Voce esta na rota de Atendendimentos'));

  app.post('/atendimentos', (req, res) =>{
    const atendimento = req.body;
    Atendimentos.adicionar(atendimento, res);
   
  });
}