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
app.post('/users', (req, res) => {
    const { name } = req.body;
    const db = readDB();

    // Verifica se o usuário já existe pelo nome
    const existingUser = db.users.find(user => user.name === name);

    if (existingUser) {
        res.json({ message: 'Usuário já existe', userId: existingUser.id });
    } else {
        // Cria um novo usuário
        const newUser = {
            id: generateUniqueId(), // Função para gerar um ID único
            name,
            // Outros dados do usuário
        };
        db.users.push(newUser);
        writeDB(db); // Escreve as alterações no banco de dados

        res.json({ message: 'Usuário criado com sucesso', userId: newUser.id });
    }
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
        res.json({ error: 'Usuário não encontrado' });
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
