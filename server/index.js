//Importa o módulo express
const e = require('express');
const express = require('express');
const cors = require('cors');

//Cria uma instância do aplicativo Express
const app = express();

//Define a porta em que o servidor irá rodar
const PORT = 3001;

//Middleware: Adiciona um interpretador de JSON
app.use(express.json());
app.use(cors());

//Define um array para simular um banco de dados
let tasks = [
    { id: 1, text: 'Aprender Express', completed: false},
    { id: 2, text: 'Fazer o deploy do projeto', completed: false},

];

//Rota GET para retornar todas as tarefas
app.get('/api/tasks', (req, res) => {
    console.log('Requisição GET para /api/tasks recebida.');
    res.json(tasks);
});

// Rota POST para adicionar uma nova tarefa
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.lenght + 1,
        text: req.body.text,
        completed: false
    };
    tasks.push(newTask);
    console.log('Nova tarefa adicionada:', newTask);
    res.status(201).json(newTask); // Retorna a nova tarefa com status 201 (Created)
});

// Rota DELETE para remover uma tarefa

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    console.log(`Tarefa com ID ${id} removida.`);
    res.status(204).send(); // Retorna status 204 (No Content)
});

// Inicia o servidor e o faz "escutar" a porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});