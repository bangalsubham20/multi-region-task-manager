package com.multiregion.taskmanager.service;

import com.multiregion.taskmanager.dto.TaskRequest;
import com.multiregion.taskmanager.dto.TaskResponse;

import com.multiregion.taskmanager.enums.Priority;
import com.multiregion.taskmanager.enums.TaskStatus;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(TaskRequest request);

    List<TaskResponse> getAllTasks();

    TaskResponse getTaskById(Long id);

    TaskResponse updateTask(Long id, TaskRequest request);

    void deleteTask(Long id);

    Page<TaskResponse> getTasks(
            String title,
            TaskStatus status,
            Priority priority,
            int page,
            int size,
            String sortBy,
            String sortDir);

}