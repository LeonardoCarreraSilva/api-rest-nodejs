const query = require("../infraestrotura/database/queries");

class Atendimento {
  adiciona(atendimento) {
    const sql = "INSERT INTO Atendimentos set ?";
    return query(sql, atendimento);
  }

  lista() {
    const sql = "select * from Atendimentos";
    return query(sql);
  }
  buscarPorId(id) {
    const sql = `select * from Atendimentos where id = ?`;
    return query(sql, id);
  }
}

module.exports = new Atendimento();
