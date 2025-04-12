import { useEffect, useState } from 'react';
import { useAppStore } from '@/stores';
import { Task } from '@/components/tasks';
import { TaskSkeleton } from '@/components/skeletons';

export function TasksPage() {
  const { tasks, fetchTasks } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      await fetchTasks();
      setIsLoading(false);
    }

    load();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col gap-3">
      {isLoading
        ? [...Array(10)].map((_, index) => <TaskSkeleton key={index} />)
        : tasks.map((task) => <Task key={task.id} {...task} />)}
    </div>
  );
}
