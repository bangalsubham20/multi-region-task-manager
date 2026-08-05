package com.multiregion.taskmanager.controller;

import com.multiregion.taskmanager.dto.ApiResponse;
import com.multiregion.taskmanager.dto.TaskRequest;
import com.multiregion.taskmanager.dto.TaskResponse;
import com.multiregion.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {

        return new ApiResponse<>(
                true,
                "Task created successfully",
                taskService.createTask(request)
        );
    }

    @GetMapping
    public ApiResponse<List<TaskResponse>> getAllTasks() {

        return new ApiResponse<>(
                true,
                "Tasks fetched successfully",
                taskService.getAllTasks()
        );
    }

    @GetMapping("/{id}")
    public ApiResponse<TaskResponse> getTaskById(@PathVariable Long id) {

        return new ApiResponse<>(
                true,
                "Task fetched successfully",
                taskService.getTaskById(id)
        );
    }

    @PutMapping("/{id}")
    public ApiResponse<TaskResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {

        return new ApiResponse<>(
                true,
                "Task updated successfully",
                taskService.updateTask(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

        return new ApiResponse<>(
                true,
                "Task deleted successfully",
                null
        );
    }
}