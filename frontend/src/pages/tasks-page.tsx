import { useEffect } from 'react';
import { useAppStore } from '@/stores';
import { Task } from '@/components/tasks';

export function TasksPage() {
  const { tasks, fetchTasks } = useAppStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </div>
  );
}
