const custonEpress = require('./config/constonEpress');
const conexao = require('./infraestrotura/database/conexao');
const tabelas = require('./infraestrotura/database/tabelas');
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

