import { TStatus } from '@/types';
import { axiosInstance } from './client';

export async function getBoards() {
  try {
    const response = await axiosInstance.get('/boards');
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о проектах:', error);
    throw error;
  }
}

export async function getTasks() {
  try {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о тикетах:', error);
    throw error;
  }
}

export async function getBoardTasks(boardId: number) {
  try {
    const response = await axiosInstance.get(`/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о тикетах в проекте:', error);
    throw error;
  }
}

export async function createTask(data: any) {
  try {
    const response = await axiosInstance.post('/tasks/create', { ...data });
    return response.data;
  } catch (error) {
    console.error('Не получилось создать тикет:', error);
    throw error;
  }
}

export async function updateTask(data: any, id: number) {
  try {
    const response = await axiosInstance.put(`/tasks/update/${id}`, { ...data });
    return response.data;
  } catch (error) {
    console.error('Не получилось изменить тикет:', error);
    throw error;
  }
}

export async function updateTaskStatus(id: number, status: TStatus) {
  try {
    const response = await axiosInstance.put(`/tasks/updateStatus/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Не получилось изменить статус тикета:', error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о пользователях:', error);
    throw error;
  }
}

export async function getTaskById(id: number) {
  try {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о задаче:', error);
    throw error;
  }
}
