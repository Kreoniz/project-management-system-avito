import { create } from 'zustand';
import { getTasks, getBoards, getBoardTasks, getUsers, getTaskById } from '@/api';
import { ITask, IBoard, IUser } from '@/types';

interface TaskStore {
  tasks: ITask[];
  boardTasks: ITask[];
  boards: IBoard[];
  users: IUser[];
  fetchTasks: () => Promise<void>;
  fetchBoardTasks: (boardId: number) => Promise<void>;
  fetchBoards: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  addTask: (id: number, boardId: number) => void;
  editTask: (id: number, boardId: number) => void;
}

export const useAppStore = create<TaskStore>((set) => ({
  tasks: [],
  boardTasks: [],
  boards: [],
  users: [],

  fetchTasks: async () => {
    try {
      const data = await getTasks();
      set({ tasks: data });
    } catch (err) {
      console.error(err);
    }
  },

  fetchBoardTasks: async (boardId) => {
    try {
      const data = await getBoardTasks(boardId);
      set({ boardTasks: data });
    } catch (err) {
      console.error(err);
    }
  },
  fetchBoards: async () => {
    try {
      const data = await getBoards();
      set({ boards: data });
    } catch (err) {
      console.error(err);
    }
  },
  fetchUsers: async () => {
    try {
      const data = await getUsers();
      set({ users: data });
    } catch (err) {
      console.error(err);
    }
  },
  addTask: async (id, boardId) => {
    const task = await getTaskById(id);
    set((state) => ({
      tasks: [...state.tasks, { ...task, boardId }],
      boardTasks: [...state.boardTasks, { ...task, boardId }],
    }));
  },
  editTask: async (id, boardId) => {
    const task = await getTaskById(id);
    set((state) => ({
      tasks: [...state.tasks.filter((t) => t.id !== id), { ...task, boardId }],
      boardTasks: [...state.boardTasks.filter((t) => t.id !== id), { ...task, boardId }],
    }));
  },
}));
