const Atendimentos = require('../models/atendimentos');


module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimentos.lista().then(resultados => res.status(200).json(resultados)).catch(res.status(400).json(erros));
  });

  app.get('/atendimentos/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    Atendimentos.buscaPorId(id, res);
  }) 

  app.post('/atendimentos', (req, res) =>{
    const atendimento = req.body;
    Atendimentos.adicionar(atendimento).then(atendimentoCadastrado =>{
      res.status(201).json(atendimentoCadastrado)
    }).catch(erros => res.status(400).json(erros));
   
  });

  app.patch('/atendimentos/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const valores = req.body
    Atendimentos.altera(id, valores, res)
  });

  app.delete('/atendimentos/:id', (req, res) =>{
    const id = parseInt(req.params.id);

    Atendimentos.delete(id, res)

  });
}