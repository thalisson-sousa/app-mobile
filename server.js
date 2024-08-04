import express from 'express';
import { readFileSync, writeFileSync } from 'fs';

const app = express();
const port = 3000;

// Middleware para analisar o corpo das requisições
app.use(express.json());

// Mock de banco de dados
const dbFilePath = 'db.json';

// Função para ler o banco de dados
const readDB = () => {
    try {
        const data = readFileSync(dbFilePath);
        return JSON.parse(data);
    } catch (err) {
        return { users: [] }; // Retorna um banco de dados vazio se houver um erro
    }
};

// Função para salvar o banco de dados
const saveDB = (db) => {
    writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
};

// Endpoint para criar um usuário
app.post('/users', (req, res) => {
    const { name } = req.body;
    const db = readDB();

    if (!name) {
        return res.status(400).json({ error: 'O nome é obrigatório' });
    }

    // Verifica se o nome já está em uso
    const existingUser = db.users.find(user => user.name === name);
    if (existingUser) {
        return res.status(400).json({ error: 'Nome de usuário já em uso' });
    }

    // Define o id como um número incrementado
    const id = db.users.length ? db.users[db.users.length - 1].id + 1 : 1;

    // Cria um novo usuário com score inicial de 0
    const user = { id, name, score: 0 };

    // Adiciona o novo usuário ao banco de dados
    db.users.push(user);
    saveDB(db);

    console.log(`Usuário criado: ${JSON.stringify(user)}`);
    res.json(user);
});

// Endpoint para atualizar um usuário
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, score } = req.body;
    const db = readDB();

    const userIndex = db.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const updatedUser = { ...db.users[userIndex], ...req.body };
    db.users[userIndex] = updatedUser;
    saveDB(db);

    res.json(updatedUser);
});

// Endpoint para obter o ranking dos usuários
app.get('/ranking', (req, res) => {
    const db = readDB();
    const ranking = db.users.sort((a, b) => b.score - a.score);
    res.json(ranking);
});

// Endpoint para buscar um usuário pelo nome
app.get('/users/by-name/:name', (req, res) => {
    const { name } = req.params;
    const db = readDB();

    const user = db.users.find(user => user.name === name);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
    }
});

// Endpoint para obter todos os usuários
app.get('/users', (req, res) => {
    const db = readDB();
    res.json(db.users);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
