const { default: axios } = require("axios");
const moment = require("moment");
const conexao = require("../infraestrotura/database/conexao");
const repositorio = require("../repositorios/atendimentosRepositories");

class Atendimentos {
  constructor() {
    this.validacoes = [
      {
        nome: "data",
        valido: this.dataEhValida,
        menssagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: this.clienteEhValido,
        menssagem: "Cliente deve ter pelo menos cinco caracteres",
      },
      {
        nome: "atendimento",
        valido: this.clienteEhValido,
        menssagem: "Atendimento não encontrado",
      },
    ];
    this.dataEhValida = ({ data, dataCriacao }) =>
      moment(data).isSameOrAfter(dataCriacao);
    this.clienteEhValido = (tamanho) => tamanho >= 5;
    this.atendimentoEhValido = (tamanho) => tamanho === 0;

    this.valida = (parametros) =>
      this.validacoes.filter((campo) => {
        const { nome } = campo;
        const parametro = parametros[nome];

        return !campo.valido(parametro);
      });
  }

  adicionar(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );
    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length },
    };
    const erros = this.valida(parametros);
    const existemErros = erros.length;

    if (existemErros) {
      return new Promise((resolve, reject) => {
        reject(erros);
      });
    } else {
      const atendmentoDatado = { ...atendimento, dataCriacao, data };

      return repositorio.adiciona(atendmentoDatado).then((resultados) => {
        const id = resultados.insertId;
        return { ...Atendimentos, id };
      });
    }
  }

  lista() {
    return repositorio.lista();
  }

  buscaPorId(atendimento) {
    return repositorio.buscarPorId(atendimento).then((resultados) => resultados).catch((erros) => erros);
  }

  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }

    const sql = "UPDATE Atendimentos SET ? WHERE id = ?";
    conexao.query(sql, [valores, id], (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultado);
      }
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM Atendimentos where id = ?";
    conexao.query(sql, id, (erro, resultado) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimentos();
