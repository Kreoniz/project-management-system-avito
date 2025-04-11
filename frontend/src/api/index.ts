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

export async function getBoardTasks(boardId: string) {
  try {
    const response = await axiosInstance.get(`/boards/${boardId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о тикетах в проекте:', error);
    throw error;
  }
}
