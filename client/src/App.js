import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Estado para armazenar a lista de tarefas
  const [tasks, setTasks] = useState([]);
  // Estado para armazenar o valor do input da nova tarefa
  const [newTaskText, setNewTaskText] = useState('');

  // useEffect é um hook que executa efeitos colaterais (como requisições)
  useEffect(() => {
    fetchTasks();
  }, []); // Array de dependências vazio: executa apenas uma vez, ao carregar a página

  // Função para buscar as tarefas do nosso servidor
  const fetchTasks = async () => {
    try {
      // Faz uma requisição GET para a API
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para adicionar uma nova tarefa
  const addTask = async (e) => {
    e.preventDefault(); // Impede que o formulário recarregue a página
    if (!newTaskText) return; // Se o input estiver vazio, não faz nada

    try {
      // Faz uma requisição POST para a API
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        text: newTaskText
      });
      // Adiciona a nova tarefa recebida do servidor à lista atual
      setTasks([...tasks, response.data]);
      setNewTaskText(''); // Limpa o input
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  // Função para remover uma tarefa
  const removeTask = async (id) => {
    try {
      // Faz uma requisição DELETE para a API
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`);
      // Filtra a lista para remover a tarefa do front-end
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };
  
  // Função para marcar/desmarcar uma tarefa como completa
  const toggleTaskCompletion = async (id) => {
    try {
      // Faz uma requisição PUT para a API
      await axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`);
      // Atualiza a lista de tarefas no front-end, encontrando e invertendo o status
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Minha Lista de Tarefas</h1>
      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <input 
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;