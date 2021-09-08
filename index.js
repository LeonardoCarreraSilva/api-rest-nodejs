const custonEpress = require('./config/constonEpress');
const conexao = require('./infraestrotura/conexao');
const tabelas = require('./infraestrotura/tabelas');
conexao.connect(erro =>{
  if(erro){
    console.log(erro)
  }else {
    console.log("Conectado com sucesso")
    tabelas.init(conexao);
    const app = custonEpress();
    app.listen(3000, () => console.log("AKIOHHHHH 3000"));
  }
})

