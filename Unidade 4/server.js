const express = require('express');
const app = express();
const port = 3000;

// ******************************************* Exercicio 1 ****************************************

// Rota com parâmetro de rota
app.get('/saudacao/:nome', (req, res) => {
  const nome = req.params.nome;
  res.send(`Olá, ${nome}!`);
});

// Rota com parâmetros de query
app.get('/soma', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ erro: "Parâmetros 'a' e 'b' devem ser números válidos." });
  }

  const soma = a + b;
  res.json({
    a: a,
    b: b,
    soma: soma
  });
});

// ******************************************* Exercicio 2 ****************************************

// Nova rota /produto com query parameter 'id'
app.get('/produto', (req, res) => {
  const id = req.query.id;

  if (id === '1') {
    res.json({ "nome": "Mouse", "preco": 100 });
  } else if (id === '2') {
    res.json({ "nome": "Teclado", "preco": 200 });
  } else {
    res.status(404).send("Produto não encontrado");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});