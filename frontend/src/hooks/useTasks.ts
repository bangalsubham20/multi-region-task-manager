import { useState, useCallback, useEffect } from 'react';
import { taskService } from '../services/taskService';
import type { Task, TaskRequest, SearchTaskParams, PageResponse } from '../types';


export function useTasks(initialParams: SearchTaskParams = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pageInfo, setPageInfo] = useState<Omit<PageResponse<Task>, 'content'>>({
    totalPages: 0,
    totalElements: 0,
    size: 5,
    number: 0,
    first: true,
    last: true,
    empty: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<SearchTaskParams>(initialParams);

  const fetchTasks = useCallback(async (searchParams?: SearchTaskParams) => {
    const activeParams = searchParams || params;
    setLoading(true);
    setError(null);
    try {
      const res = await taskService.searchTasks(activeParams);
      if (res.success && res.data) {
        setTasks(res.data.content || []);
        setPageInfo({
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
          size: res.data.size,
          number: res.data.number,
          first: res.data.first,
          last: res.data.last,
          empty: res.data.empty,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (task: TaskRequest) => {
    setLoading(true);
    try {
      const res = await taskService.createTask(task);
      await fetchTasks();
      return res.data;
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number, task: TaskRequest) => {
    setLoading(true);
    try {
      const res = await taskService.updateTask(id, task);
      await fetchTasks();
      return res.data;
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    try {
      await taskService.deleteTask(id);
      await fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    pageInfo,
    loading,
    error,
    params,
    setParams,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
