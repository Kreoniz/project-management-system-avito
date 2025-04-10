import { axiosInstance } from './client';

export const getBoards = async () => {
  try {
    const response = await axiosInstance.get('/boards');
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о проектах:', error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Не получилось получить информацию о тикетах:', error);
    throw error;
  }
};
