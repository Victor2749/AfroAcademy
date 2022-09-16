import { ClipboardText } from 'phosphor-react';
import styles from '../components/NoTask.module.scss';

export function NoTask() {
  return (
    <div className={styles.container}>
      <ClipboardText />

      <p>
        Você não tem nenhuma tarefa no momento. <br /> Adicione novas tarefas para que
        elas sejam mostradas.
      </p>
    </div>
  );
}
