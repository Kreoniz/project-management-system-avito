import { useState, useEffect } from 'react';
import { getBoardTasks } from '@/api';
import { ITask } from '@/types';
import { Task } from '@/components/tasks';
import { useLocation, useParams } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-lg font-bold" href="/boards">
              Проекты
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-lg font-bold">{state?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="overflow-x-scroll">
        <div className="flex gap-4 lg:grid lg:grid-cols-3">
          {Object.entries(columns).map(([status, tasks]) => (
            <div key={status} className="bg-background min-w-xs rounded-lg border p-4 shadow-sm">
              <h3 className="text-muted-foreground mb-3 text-lg font-semibold">
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
    </div>
  );
}
