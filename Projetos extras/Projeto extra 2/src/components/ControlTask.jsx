import { NoTask } from './NoTask';
import styles from '../components/ControlTask.module.scss';
import { Task } from './Task';
import { useState } from 'react';

export function ControlTask() {
  const [taskItem, setTaskItem] = useState([null]);

/*   const todoHandler = (todo) => {
    console.log(todo);
    setTaskItem([...taskItem, todo]);
  }; */

  if (taskItem[0] === null) {
    return <NoTask />;
  }
  return (
    <>
      <h3 className={styles.status}>
        Tarefas concluídas <span>3 de 6</span>
      </h3>

      <ul className={styles.taskList}>
        {/* <Task content="Teste2" />
        <Task content="Comprar 1" />
        <Task content="Alugar 2" />
        <Task content="Teste" /> */}
        {taskItem.map(() => (
          <Task content = "teste"/>
        ))}
      </ul>
    </>
  );
}
