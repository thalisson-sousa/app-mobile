const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post('/users', (req, res) => {
    const db = router.db;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'O nome é obrigatório' });
    }

    // Verifica se o nome já está em uso
    const existingUser = db.get('users').find({ name }).value();
    if (existingUser) {
        return res.status(400).json({ error: 'Nome de usuário já em uso' });
    }

    // Define o id como um número incrementado
    const currentId = db.get('users').size().value();
    const id = parseInt(currentId + 1, 10);  // Assegura que o ID é um número

    // Cria um novo usuário com score inicial de 0
    const user = { id, name, score: 0 };

    // Adiciona o novo usuário ao banco de dados
    db.get('users').push(user).write();
    console.log(`Usuário criado: ${JSON.stringify(user)}`); // Log para depuração
    res.json(user);
});


// Endpoint para atualizar um usuário
server.put('/users/:id', (req, res) => {
    const db = router.db;
    const { id } = req.params;
    const { name, score } = req.body;
    if (!name && score === undefined) {
        return res.status(400).json({ error: 'Name or score is required' });
    }
    const user = db.get('users').find({ id: parseInt(id) }).assign({ name, score }).write();
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Endpoint para obter o ranking dos usuários
server.get('/ranking', (req, res) => {
    const db = router.db;
    const ranking = db.get('users').sortBy('score').reverse().value();
    res.json(ranking);
});

// Endpoint para buscar um usuário pelo nome
server.get('/users/by-name/:name', (req, res) => {
    const db = router.db;
    const { name } = req.params;
    const user = db.get('users').find({ name }).value();
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});
