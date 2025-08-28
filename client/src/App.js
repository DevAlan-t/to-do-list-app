import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }  


    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTaskText) return;

        try {
            const response = await axios.post('http://localhost:3001/api/tasks', {
                text: newTaskText
            });

        setTasks([...tasks, response.data]);
        setNewTaskText('');
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    const removeTask = async (id) => {
        try{
            await axios.delete(`http://localhost:3001/api/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Erro ao remover tarefa:', error);
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
                <span>{task.text}</span>
                <button onClick={() => removeTask(task.id)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    export default App;