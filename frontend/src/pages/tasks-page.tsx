import { useState, useEffect } from 'react';
import { getTasks } from '@/api';
import { ITask } from '@/types';
import { Task } from '@/components/tasks';

export function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task: ITask) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
}
