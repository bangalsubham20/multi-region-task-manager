package com.multiregion.taskmanager.service;

import com.multiregion.taskmanager.dto.TaskRequest;
import com.multiregion.taskmanager.dto.TaskResponse;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(TaskRequest request);

    List<TaskResponse> getAllTasks();

    TaskResponse getTaskById(Long id);

    TaskResponse updateTask(Long id, TaskRequest request);

    void deleteTask(Long id);

}