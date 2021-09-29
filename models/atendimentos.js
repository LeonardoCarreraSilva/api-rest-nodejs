const moment = require("moment");
const conexao = require("../infraestrotura/conexao");

class Atendimentos {
  adicionar(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);

    const clienteEhValido = atendimento.cliente.length >= 5;
    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        menssagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        menssagem: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];
    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;
    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendmentoDatado = { ...atendimento, dataCriacao, data };
      const sql = "INSERT INTO Atendimentos set ?";

      conexao.query(sql, atendmentoDatado, (erro, resultado) => {
        if (erro) res.status(404).json(erro);
        else res.status(201).json(atendimento);
      });
    }
  }

  lista(res) {
    const sql = "select * from Atendimentos";

    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `select * from Atendimentos where id = ${id}`;

    conexao.query(sql, (erro, resultado) => {
      const atendimento = resultado[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }
  altera(id, valores, res){
    if(valores.data){
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }

    const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
    conexao.query(sql, [valores, id], (erro, resultado) =>{
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado);
      }
    })
  }


  delete(id, res){
    const sql = 'DELETE FROM Atendimentos where id = ?'
    conexao.query(sql, id, (erro, resultado) =>{
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({id});
      }
  })
}
}

module.exports = new Atendimentos();
