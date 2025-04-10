import { useState, useEffect } from 'react';
import { getTasks } from '@/api';
import { ITask } from '@/types';
import { Task } from '@/components/tasks';

export function TasksPage() {
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    const fetchtasks = async () => {
      try {
        const data = await getTasks();
        settasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchtasks();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task: ITask) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
}
