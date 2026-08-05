package com.multiregion.taskmanager.dto;

import com.multiregion.taskmanager.enums.Priority;
import com.multiregion.taskmanager.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private TaskStatus status;

    private Priority priority;

    private LocalDate dueDate;
}