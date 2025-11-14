const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
    host: 'pg-1c771a7e-germinare-bdeb.f.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_4YHA4njRfQO8M_pq0G-',
    database: 'formulario',
    port: 14244,
    ssl: { rejectUnauthorized: false }
});

// Rota GET da página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Rota POST para cadastro
app.post('/enviar', async (req, res) => {
    const { nome, email, tel, sexo, senha } = req.body;

    try {
        await pool.query(
            'INSERT INTO usuario (nome, email, telefone, sexo, senha) VALUES ($1, $2, $3, $4, $5)',
            [nome, email, tel, sexo, senha]
        );
        res.send('Dados salvos com sucesso!');
    } catch (erro) {
        console.error('Erro ao inserir dados:', erro);
        if (erro.code === '23505') {
            res.status(400).send('Email ou telefone já cadastrados.');
        } else {
            res.status(500).send(`Erro ao salvar no banco: ${erro.message}`);
        }
    }
});

// Rota POST para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const resultado = await pool.query(
            'SELECT nome FROM usuario WHERE email = $1 AND senha = $2',
            [email, senha]
        );

        if (resultado.rows.length > 0) {
            res.send(resultado.rows[0].nome);
        } else {
            res.status(401).send('Email ou senha incorretos.');
        }
    } catch (erro) {
        console.error('Erro ao verificar login:', erro);
        res.status(500).send('Erro interno ao verificar login.');
    }
});

const inputPesquisa = document.getElementById('pesquisa');
const resultadoDiv = document.createElement('div');
resultadoDiv.id = 'resultado';
resultadoDiv.style.marginTop = '10px';
document.body.appendChild(resultadoDiv);

inputPesquisa.addEventListener('input', async () => {
    const termo = inputPesquisa.value.trim();
    resultadoDiv.innerHTML = '';

    if (termo.length === 0) return;

    const resposta = await fetch(`/?q=${encodeURIComponent(termo)}`);
    const filmes = await resposta.json();

    if (filmes.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
    }

    filmes.forEach(filme => {
        const item = document.createElement('div');
        item.style.border = '1px solid #333';
        item.style.padding = '8px';
        item.style.marginBottom = '5px';
        item.style.borderRadius = '8px';
        item.innerHTML = `<strong>${filme.nome}</strong> — Nota: ${filme.nota}`;
        resultadoDiv.appendChild(item);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
