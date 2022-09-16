import styles from '../components/MainContainer.module.scss';

import { Plus } from 'phosphor-react';
import { useState } from 'react';
import { Task } from './Task';
import { NoTask } from './NoTask';

export function MainContainer() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem('@AfroToDo:tasks');

    return JSON.parse(localTasks) || [];
  });

  const doneCount = tasks.reduce((acc, task) => {
    return task.done ? (acc += 1) : acc;
  }, 0);

  function handleSubmit(event) {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      content: taskText,
      done: false,
    };

    const newTasks = [...tasks, newTask];

    localStorage.setItem('@AfroToDo:tasks', JSON.stringify(newTasks));
    /* 
    setTasks([...tasks, newTask]); */
    setTasks(newTasks);
    setTaskText('');
  }

  function handleChangeInput(event) {
    setTaskText(event.currentTarget.value);
  }

  function handleToggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      return task.id === id ? { ...task, done: !task.done } : task;
    });

    localStorage.setItem('@AfroToDo:tasks', JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id) {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    localStorage.setItem('@AfroToDo:tasks', JSON.stringify(filteredTasks));

    setTasks(filteredTasks);
  }
  return (
    <>
      <main className={styles.container}>
        <form className={styles.addTaskForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Insira uma nova atividade"
            onChange={handleChangeInput}
            value={taskText}
          />
          <button>
            <Plus />
          </button>
        </form>

        {tasks.length ? (
          <>
            <h3 className={styles.status}>
              Tarefas concluídas{' '}
              <span>
                {doneCount} de {tasks.length}
              </span>
            </h3>

            <ul className={styles.taskList}>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    content={task.content}
                    isDone={task.done}
                    onCheck={() => handleToggleTask(task.id)}
                    onRemove={() => handleRemoveTask(task.id)}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <NoTask />
          </>
        )}
      </main>
    </>
  );
}
