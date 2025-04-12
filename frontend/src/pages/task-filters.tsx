import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks';

const status_labels: Record<string, string> = {
  InProgress: 'В процессе',
  Done: 'Сделано',
  Backlog: 'To do',
};

interface TaskFiltersProps {
  onChange: (filters: { searchTerm: string; status: string; project: string }) => void;
  statuses: string[];
  projects: { id: string; name: string }[];
}

export function TaskFilters({ onChange, statuses, projects }: TaskFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [project, setProject] = useState('all');

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onChange({ searchTerm: debouncedSearch, status, project });
  }, [debouncedSearch, status, project, onChange]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Input
        placeholder="Поиск по названию или исполнителю..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1"
      />
      <div className="flex gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Фильтр по статусу" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {status_labels[s] || s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={project} onValueChange={setProject}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Фильтр по проекту" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все проекты</SelectItem>
            {projects.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
