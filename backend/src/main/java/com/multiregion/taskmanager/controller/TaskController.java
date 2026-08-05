package com.multiregion.taskmanager.controller;

import com.multiregion.taskmanager.dto.ApiResponse;
import com.multiregion.taskmanager.dto.TaskRequest;
import com.multiregion.taskmanager.dto.TaskResponse;
import com.multiregion.taskmanager.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@Tag(name = "Task API", description = "Operations for managing tasks")
public class TaskController {

    private final TaskService taskService;

    @Operation(summary = "Create a new task")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {

        return new ApiResponse<>(
                true,
                "Task created successfully",
                taskService.createTask(request)
        );
    }

    @Operation(summary = "Get all tasks")
    @GetMapping
    public ApiResponse<List<TaskResponse>> getAllTasks() {

        return new ApiResponse<>(
                true,
                "Tasks fetched successfully",
                taskService.getAllTasks()
        );
    }

    @Operation(summary = "Get task by ID")
    @GetMapping("/{id}")
    public ApiResponse<TaskResponse> getTaskById(@PathVariable Long id) {

        return new ApiResponse<>(
                true,
                "Task fetched successfully",
                taskService.getTaskById(id)
        );
    }

    @Operation(summary = "Update an existing task")
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

    @Operation(summary = "Delete a task")
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