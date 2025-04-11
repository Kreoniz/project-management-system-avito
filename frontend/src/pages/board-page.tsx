import { useState, useEffect } from 'react';
import { getBoardTasks } from '@/api';
import { ITask } from '@/types';
import { Task } from '@/components/tasks';
import { useLocation, useParams } from 'react-router';

export function BoardPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { id } = useParams<{ id: string }>();
  const state = useLocation().state;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (id) {
          const data = await getBoardTasks(id);
          setTasks(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [id]);

  const columns = {
    Backlog: tasks.filter((task) => task.status === 'Backlog'),
    InProgress: tasks.filter((task) => task.status === 'InProgress'),
    Done: tasks.filter((task) => task.status === 'Done'),
  };

  const columnLabels = {
    Backlog: 'To do',
    InProgress: 'В процессе',
    Done: 'Сделано',
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">{state?.name ?? 'Board'}</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              {columnLabels[status as keyof typeof columnLabels]}
            </h3>
            <div className="flex flex-col gap-3">
              {tasks.length > 0 ? (
                tasks.map((task) => <Task key={task.id} {...task} variant="compact" />)
              ) : (
                <p className="text-sm text-gray-500 italic">Нет задач</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
