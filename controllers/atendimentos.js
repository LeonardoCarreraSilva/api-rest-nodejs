module.exports = app => {
  app.get('/atendimentos', (req, res) => res.send('Voce esta na rota de Atendendimentos'));

  app.post('/atendimentos', (req, res) =>{
    console.log(req.body);
    res.send('Voce esta na rota de Atendendimentos com post')});
}